-- Atomic fulfillment: claim purchase + grant access + credit top-up in one transaction.
-- Prevents the webhook + return-page double-credit race condition.
CREATE OR REPLACE FUNCTION public.claim_and_fulfill_purchase(
  _session_id text,
  _user_id uuid,
  _bundle int,
  _slug text,
  _payment_intent text
) RETURNS TABLE(claimed boolean, already_complete boolean)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_current_status text;
  v_purchase_id uuid;
BEGIN
  IF _user_id IS NULL OR _bundle NOT IN (1,2,3) OR _slug IS NULL OR _session_id IS NULL THEN
    RETURN QUERY SELECT false, false;
    RETURN;
  END IF;

  -- Lock the matching purchase row (created at checkout-session creation time)
  SELECT id, status INTO v_purchase_id, v_current_status
  FROM public.purchases
  WHERE stripe_session_id = _session_id
  FOR UPDATE;

  IF v_current_status = 'complete' THEN
    RETURN QUERY SELECT false, true;
    RETURN;
  END IF;

  -- Atomic claim: mark complete first so a concurrent caller sees 'complete' on its lock release
  IF v_purchase_id IS NOT NULL THEN
    UPDATE public.purchases
    SET status = 'complete',
        stripe_payment_intent = COALESCE(_payment_intent, stripe_payment_intent),
        updated_at = now()
    WHERE id = v_purchase_id;
  ELSE
    -- Defensive: create a record if missing (e.g. webhook arrives before insert)
    INSERT INTO public.purchases (user_id, bundle_size, amount_cents, currency,
      initial_guide_slug, stripe_session_id, stripe_payment_intent, status)
    VALUES (_user_id, _bundle, 0, 'eur', _slug, _session_id, _payment_intent, 'complete');
  END IF;

  -- Grant access to the chosen initial guide
  INSERT INTO public.guide_access (user_id, guide_slug, source)
  VALUES (_user_id, _slug, 'purchase')
  ON CONFLICT (user_id, guide_slug) DO NOTHING;

  -- Atomic credit increment for remaining bundle credits
  IF _bundle > 1 THEN
    UPDATE public.profiles
    SET credits_remaining = credits_remaining + (_bundle - 1),
        updated_at = now()
    WHERE id = _user_id;
  END IF;

  RETURN QUERY SELECT true, false;
END $$;

REVOKE EXECUTE ON FUNCTION public.claim_and_fulfill_purchase(text, uuid, int, text, text) FROM PUBLIC, anon, authenticated;
-- Only service_role (used by webhook + confirm via admin client) may call it.
GRANT EXECUTE ON FUNCTION public.claim_and_fulfill_purchase(text, uuid, int, text, text) TO service_role;