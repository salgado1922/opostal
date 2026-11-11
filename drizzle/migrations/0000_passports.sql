CREATE TABLE public.passports (
  user_id uuid PRIMARY KEY,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.passports TO authenticated;
GRANT ALL ON public.passports TO service_role;
ALTER TABLE public.passports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Passports: own read" ON public.passports FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Passports: own insert" ON public.passports FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Passports: own update" ON public.passports FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);