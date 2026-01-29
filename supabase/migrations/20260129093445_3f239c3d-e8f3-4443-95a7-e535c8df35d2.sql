-- Phase 1: Advanced SEO Admin Panel Database Changes

-- 1. Add new columns to seo_meta table for page-level SEO controls
ALTER TABLE public.seo_meta 
ADD COLUMN IF NOT EXISTS robots_directive text DEFAULT 'index, follow',
ADD COLUMN IF NOT EXISTS schema_type text DEFAULT NULL,
ADD COLUMN IF NOT EXISTS priority numeric(2,1) DEFAULT 0.5,
ADD COLUMN IF NOT EXISTS changefreq text DEFAULT 'weekly',
ADD COLUMN IF NOT EXISTS include_in_sitemap boolean DEFAULT true;

-- 2. Create site_files table for storing generated/editable SEO files
CREATE TABLE IF NOT EXISTS public.site_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_key text UNIQUE NOT NULL,
  content text NOT NULL DEFAULT '',
  auto_generate boolean DEFAULT true,
  last_generated timestamp with time zone DEFAULT NULL,
  updated_at timestamp with time zone DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Enable RLS on site_files
ALTER TABLE public.site_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for site_files
CREATE POLICY "Anyone can view site files"
ON public.site_files
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site files"
ON public.site_files
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 3. Add site_settings entries for review stats (if not exists)
INSERT INTO public.site_settings (key, value, description)
VALUES 
  ('review_count', '91', 'Total number of Google reviews'),
  ('avg_rating', '4.9', 'Average Google review rating')
ON CONFLICT (key) DO NOTHING;

-- 4. Insert default site_files entries
INSERT INTO public.site_files (file_key, content, auto_generate)
VALUES 
  ('robots_txt', 'User-agent: *
Allow: /

# Sitemap
Sitemap: https://fisique.fitness/api/sitemap.xml

# AI Crawlers
User-agent: GPTBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /

# Disallow admin and private paths
Disallow: /admin/
Disallow: /api/
Disallow: /*.json$', false),
  ('llms_txt', '', true),
  ('llms_full_txt', '', true),
  ('sitemap_xml', '', true)
ON CONFLICT (file_key) DO NOTHING;

-- 5. Create trigger for updated_at on site_files
CREATE TRIGGER update_site_files_updated_at
BEFORE UPDATE ON public.site_files
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();