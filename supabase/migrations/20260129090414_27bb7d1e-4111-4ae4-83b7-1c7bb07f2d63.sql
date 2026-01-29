-- Add image_url column to offers table for card display
ALTER TABLE public.offers
ADD COLUMN image_url text;