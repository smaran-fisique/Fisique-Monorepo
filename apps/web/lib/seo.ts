import { createSupabaseServerClient } from '@/integrations/supabase/server';
import type { Metadata } from 'next';

interface SeoMeta {
  title: string | null;
  description: string | null;
  keywords: string | null;
  og_image: string | null;
  canonical_url: string | null;
}

export async function getSeoMeta(pagePath: string): Promise<SeoMeta | null> {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('seo_meta')
    .select('title, description, keywords, og_image, canonical_url')
    .eq('page_path', pagePath)
    .maybeSingle();

  if (error || !data) return null;
  // Cast needed because Supabase generic inference returns `never` with strict TS
  return data as unknown as SeoMeta;
}

/** Build a Next.js Metadata object from seo_meta + fallback values. */
export function buildMetadata(
  seo: SeoMeta | null,
  fallback: { title: string; description: string; path: string }
): Metadata {
  const title = seo?.title ?? fallback.title;
  const description = seo?.description ?? fallback.description;
  const canonical = seo?.canonical_url ?? `https://fisique.fitness${fallback.path}`;

  return {
    title,
    description,
    keywords: seo?.keywords ? [seo.keywords] : undefined,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
      ...(seo?.og_image ? { images: [{ url: seo.og_image }] } : {}),
    },
  };
}
