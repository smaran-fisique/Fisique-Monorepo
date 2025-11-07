-- Create storage bucket for media
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-media', 'public-media', true);

-- RLS policies for media bucket
CREATE POLICY "Anyone can view media files"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'public-media');

CREATE POLICY "Admins can upload media files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'public-media' AND
  (SELECT public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Admins can update media files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'public-media' AND
  (SELECT public.has_role(auth.uid(), 'admin'))
);

CREATE POLICY "Admins can delete media files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'public-media' AND
  (SELECT public.has_role(auth.uid(), 'admin'))
);
