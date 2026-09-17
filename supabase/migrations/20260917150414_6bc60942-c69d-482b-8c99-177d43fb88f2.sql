CREATE POLICY "Guide images: admins read"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'guide-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Guide images: admins upload"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'guide-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Guide images: admins update"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'guide-images' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'guide-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Guide images: admins delete"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'guide-images' AND public.has_role(auth.uid(), 'admin'));