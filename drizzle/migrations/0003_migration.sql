CREATE TABLE public.affiliate_links (
  id text PRIMARY KEY,
  url text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.affiliate_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.affiliate_links TO authenticated;
GRANT ALL ON public.affiliate_links TO service_role;
ALTER TABLE public.affiliate_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Affiliate links: anyone reads" ON public.affiliate_links FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Affiliate links: admins insert" ON public.affiliate_links FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Affiliate links: admins update" ON public.affiliate_links FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Affiliate links: admins delete" ON public.affiliate_links FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));