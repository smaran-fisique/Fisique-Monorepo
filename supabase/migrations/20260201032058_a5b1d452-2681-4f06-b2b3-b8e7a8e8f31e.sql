-- Add slug column to offers table
ALTER TABLE public.offers 
ADD COLUMN slug text;

-- Create unique index on slug
CREATE UNIQUE INDEX idx_offers_slug ON public.offers(slug) WHERE slug IS NOT NULL;

-- Update existing iPhone offer with a slug
UPDATE public.offers 
SET slug = 'iphone' 
WHERE title ILIKE '%iphone%';