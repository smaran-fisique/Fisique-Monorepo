-- Fix site_settings: Restrict public access to non-sensitive settings only
DROP POLICY IF EXISTS "Anyone can view site settings" ON public.site_settings;

-- Public can only view non-sensitive settings (exclude AI prompts)
CREATE POLICY "Public can view non-sensitive settings"
  ON public.site_settings
  FOR SELECT
  TO public
  USING (key NOT IN ('ai_enhance_prompt', 'ai_format_prompt', 'ai_image_prompt'));

-- Admins can view ALL settings including sensitive ones
CREATE POLICY "Admins can view all settings"
  ON public.site_settings
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Fix api_keys: Add explicit SELECT policy for defense-in-depth
-- The existing "FOR ALL" policy should cover this, but adding explicit SELECT for clarity
CREATE POLICY "Admins can view api keys"
  ON public.api_keys
  FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

-- Fix the update_updated_at_column function to have immutable search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;