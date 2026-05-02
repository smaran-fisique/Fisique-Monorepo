import type { MetadataRoute } from 'next';

export const runtime = 'edge';
export const revalidate = 3600;

const BASE_URL = 'https://fisique.fitness';

type StaticEntry = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const STATIC_PAGES: StaticEntry[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/kokapet-gym', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/personal-training-kokapet', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/gym-membership-kokapet', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/best-gym-kokapet', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
  { path: '/gym-narsingi', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gym-financial-district', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gym-gachibowli', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gym-gandipet', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gym-manikonda', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gym-puppalaguda', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/gym-tellapur', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/freelance-trainer-kokapet', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/freelance-trainer-narsingi', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/freelance-trainer-financial-district', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/offers', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/offers/iphone', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/legal', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/refund', priority: 0.3, changeFrequency: 'yearly' },
  { path: '/shipping', priority: 0.3, changeFrequency: 'yearly' },
];

type BlogPostRow = {
  slug: string;
  published_at: string | null;
  updated_at: string | null;
};

async function fetchBlogPosts(): Promise<BlogPostRow[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];

  try {
    const res = await fetch(
      `${url}/rest/v1/blog_posts?select=slug,published_at,updated_at&status=eq.published&order=published_at.desc`,
      {
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          'Accept-Profile': 'fisique_web',
          Accept: 'application/json',
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    return (await res.json()) as BlogPostRow[];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PAGES.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));

  const posts = await fetchBlogPosts();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post.updated_at ?? post.published_at ?? now.toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
