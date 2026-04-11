import type { MetadataRoute } from 'next';
import { createSupabaseServerClient } from '@/integrations/supabase/server';

const BASE_URL = 'https://fisique.fitness';

const staticRoutes: { url: string; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }[] = [
  { url: '/', changeFrequency: 'weekly', priority: 1.0 },
  { url: '/kokapet-gym', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/personal-training-kokapet', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/gym-membership-kokapet', changeFrequency: 'monthly', priority: 0.9 },
  { url: '/gym-narsingi', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/gym-gachibowli', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/gym-gandipet', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/gym-manikonda', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/gym-puppalaguda', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/gym-tellapur', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/gym-financial-district', changeFrequency: 'monthly', priority: 0.8 },
  { url: '/freelance-trainer-kokapet', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/freelance-trainer-narsingi', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/freelance-trainer-financial-district', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/fisique-challenge', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/blog', changeFrequency: 'daily', priority: 0.8 },
  { url: '/contact', changeFrequency: 'yearly', priority: 0.6 },
  { url: '/offers', changeFrequency: 'weekly', priority: 0.7 },
  { url: '/legal', changeFrequency: 'yearly', priority: 0.3 },
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createSupabaseServerClient();

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const blogEntries: MetadataRoute.Sitemap = (posts ?? []).map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route.url}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  return [...staticEntries, ...blogEntries];
}
