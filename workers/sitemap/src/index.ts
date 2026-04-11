const BASE_URL = 'https://fisique.fitness';

const STATIC_PAGES: { path: string; priority: number; changefreq: string }[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/kokapet-gym', priority: 0.9, changefreq: 'weekly' },
  { path: '/personal-training-kokapet', priority: 0.9, changefreq: 'weekly' },
  { path: '/gym-membership-kokapet', priority: 0.9, changefreq: 'weekly' },
  { path: '/blog', priority: 0.9, changefreq: 'daily' },
  { path: '/gym-narsingi', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-financial-district', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-gachibowli', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-gandipet', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-manikonda', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-puppalaguda', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-tellapur', priority: 0.8, changefreq: 'weekly' },
  { path: '/fisique-challenge', priority: 0.8, changefreq: 'weekly' },
  { path: '/freelance-trainer-kokapet', priority: 0.7, changefreq: 'monthly' },
  { path: '/freelance-trainer-narsingi', priority: 0.7, changefreq: 'monthly' },
  { path: '/freelance-trainer-financial-district', priority: 0.7, changefreq: 'monthly' },
  { path: '/offers', priority: 0.7, changefreq: 'weekly' },
  { path: '/offers/iphone', priority: 0.7, changefreq: 'weekly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/legal', priority: 0.3, changefreq: 'yearly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/refund', priority: 0.3, changefreq: 'yearly' },
  { path: '/shipping', priority: 0.3, changefreq: 'yearly' },
];

interface Env {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}

interface SeoMetaRow {
  page_path: string;
  priority: number | null;
  changefreq: string | null;
}

interface BlogPostRow {
  slug: string;
  published_at: string | null;
  updated_at: string | null;
}

function urlEntry(loc: string, lastmod: string, changefreq: string, priority: number): string {
  return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}

async function supabaseGet<T>(
  supabaseUrl: string,
  anonKey: string,
  path: string
): Promise<T[]> {
  const res = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      Accept: 'application/json',
    },
  });
  if (!res.ok) throw new Error(`Supabase error: ${res.status} ${await res.text()}`);
  return res.json() as Promise<T[]>;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204 });
    }

    const now = new Date().toISOString().split('T')[0];
    const urls: string[] = [];

    // Static pages
    for (const page of STATIC_PAGES) {
      urls.push(urlEntry(`${BASE_URL}${page.path}`, now, page.changefreq, page.priority));
    }

    const staticPaths = new Set(STATIC_PAGES.map((p) => p.path));

    try {
      // seo_meta rows marked for sitemap inclusion
      const seoPages = await supabaseGet<SeoMetaRow>(
        env.SUPABASE_URL,
        env.SUPABASE_ANON_KEY,
        'seo_meta?select=page_path,priority,changefreq&include_in_sitemap=eq.true'
      );
      for (const page of seoPages) {
        if (!staticPaths.has(page.page_path)) {
          urls.push(urlEntry(
            `${BASE_URL}${page.page_path}`,
            now,
            page.changefreq ?? 'weekly',
            page.priority ?? 0.5
          ));
        }
      }
    } catch (err) {
      console.error('seo_meta fetch failed:', err);
    }

    try {
      // Published blog posts
      const blogPosts = await supabaseGet<BlogPostRow>(
        env.SUPABASE_URL,
        env.SUPABASE_ANON_KEY,
        'blog_posts?select=slug,published_at,updated_at&status=eq.published&order=published_at.desc'
      );
      for (const post of blogPosts) {
        const lastmod = (post.updated_at ?? post.published_at ?? now).split('T')[0];
        urls.push(urlEntry(`${BASE_URL}/blog/${post.slug}`, lastmod, 'monthly', 0.7));
      }
    } catch (err) {
      console.error('blog_posts fetch failed:', err);
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        'X-Robots-Tag': 'noindex',
      },
    });
  },
};
