
-- =========================================================
-- PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  display_name TEXT,
  credits_remaining INTEGER NOT NULL DEFAULT 0 CHECK (credits_remaining >= 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles: users read own"
  ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Profiles: users update own basic fields"
  ON public.profiles FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- =========================================================
-- GUIDE ACCESS
-- =========================================================
CREATE TABLE public.guide_access (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  guide_slug TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'purchase',
  granted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, guide_slug)
);
CREATE INDEX guide_access_user_idx ON public.guide_access(user_id);
GRANT SELECT ON public.guide_access TO authenticated;
GRANT ALL ON public.guide_access TO service_role;
ALTER TABLE public.guide_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Guide access: users read own"
  ON public.guide_access FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- =========================================================
-- PURCHASES (audit trail)
-- =========================================================
CREATE TABLE public.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  bundle_size INTEGER NOT NULL CHECK (bundle_size BETWEEN 1 AND 3),
  amount_cents INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'eur',
  stripe_session_id TEXT UNIQUE,
  stripe_payment_intent TEXT,
  initial_guide_slug TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX purchases_user_idx ON public.purchases(user_id);
GRANT SELECT ON public.purchases TO authenticated;
GRANT ALL ON public.purchases TO service_role;
ALTER TABLE public.purchases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Purchases: users read own"
  ON public.purchases FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- =========================================================
-- TRIGGERS
-- =========================================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER purchases_set_updated_at
  BEFORE UPDATE ON public.purchases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      NEW.raw_user_meta_data->>'name',
      split_part(COALESCE(NEW.email, ''), '@', 1)
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- USER-FACING RPC: redeem a credit to unlock a guide
-- =========================================================
CREATE OR REPLACE FUNCTION public.redeem_credit_for_guide(_slug TEXT)
RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid UUID := auth.uid();
  credits INTEGER;
BEGIN
  IF uid IS NULL THEN RETURN FALSE; END IF;
  IF _slug IS NULL OR length(_slug) = 0 THEN RETURN FALSE; END IF;

  IF EXISTS (SELECT 1 FROM public.guide_access WHERE user_id = uid AND guide_slug = _slug) THEN
    RETURN TRUE;
  END IF;

  SELECT credits_remaining INTO credits
  FROM public.profiles WHERE id = uid FOR UPDATE;

  IF credits IS NULL OR credits < 1 THEN RETURN FALSE; END IF;

  UPDATE public.profiles
  SET credits_remaining = credits_remaining - 1
  WHERE id = uid;

  INSERT INTO public.guide_access (user_id, guide_slug, source)
  VALUES (uid, _slug, 'credit')
  ON CONFLICT (user_id, guide_slug) DO NOTHING;

  RETURN TRUE;
END $$;

REVOKE ALL ON FUNCTION public.redeem_credit_for_guide(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.redeem_credit_for_guide(TEXT) TO authenticated;
