-- Revoke EXECUTE on trigger-only SECURITY DEFINER function from API roles.
-- update_updated_at_column is used exclusively as a row trigger; it should
-- never be callable directly via the Data API.
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Ensure handle_new_user (auth trigger) is not callable from the API either.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;

-- redeem_credit_for_guide must remain callable by authenticated users:
-- it is the entry point used by signed-in users to spend a bundle credit.
-- It enforces its own checks via auth.uid() and FOR UPDATE locking, so it
-- stays callable by authenticated but never by anon.
REVOKE EXECUTE ON FUNCTION public.redeem_credit_for_guide(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.redeem_credit_for_guide(text) TO authenticated;