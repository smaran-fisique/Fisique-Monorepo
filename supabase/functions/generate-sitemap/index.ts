import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://fisique.fitness';

// Static pages with their priorities
const STATIC_PAGES = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/blog', priority: 0.9, changefreq: 'daily' },
  { path: '/kokapet-gym', priority: 0.9, changefreq: 'weekly' },
  { path: '/personal-training-kokapet', priority: 0.9, changefreq: 'weekly' },
  { path: '/gym-membership-kokapet', priority: 0.9, changefreq: 'weekly' },
  { path: '/gym-financial-district', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-narsingi', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-gachibowli', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-gandipet', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-manikonda', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-puppalaguda', priority: 0.8, changefreq: 'weekly' },
  { path: '/gym-tellapur', priority: 0.8, changefreq: 'weekly' },
  { path: '/offers', priority: 0.7, changefreq: 'weekly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/terms', priority: 0.3, changefreq: 'yearly' },
  { path: '/privacy', priority: 0.3, changefreq: 'yearly' },
  { path: '/refund', priority: 0.3, changefreq: 'yearly' },
  { path: '/shipping', priority: 0.3, changefreq: 'yearly' },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const now = new Date().toISOString().split('T')[0];
    const urls: string[] = [];

    // Add static pages
    for (const page of STATIC_PAGES) {
      urls.push(`
  <url>
    <loc>${BASE_URL}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`);
    }

    // Get SEO meta entries with include_in_sitemap = true
    const { data: seoPages, error: seoError } = await supabase
      .from('seo_meta')
      .select('page_path, priority, changefreq, include_in_sitemap')
      .eq('include_in_sitemap', true);

    if (seoError) {
      console.error('Error fetching seo_meta:', seoError);
    }

    // Add SEO pages that aren't already in static pages
    const staticPaths = new Set(STATIC_PAGES.map(p => p.path));
    if (seoPages) {
      for (const page of seoPages) {
        if (!staticPaths.has(page.page_path)) {
          urls.push(`
  <url>
    <loc>${BASE_URL}${page.page_path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq || 'weekly'}</changefreq>
    <priority>${(page.priority || 0.5).toFixed(1)}</priority>
  </url>`);
        }
      }
    }

    // Get published blog posts
    const { data: blogPosts, error: blogError } = await supabase
      .from('blog_posts')
      .select('slug, published_at, updated_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (blogError) {
      console.error('Error fetching blog posts:', blogError);
    }

    if (blogPosts) {
      for (const post of blogPosts) {
        const lastmod = post.updated_at || post.published_at || now;
        urls.push(`
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${lastmod.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
      }
    }

    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join('')}
</urlset>`;

    // Store in site_files table
    const { error: updateError } = await supabase
      .from('site_files')
      .update({
        content: sitemap,
        last_generated: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('file_key', 'sitemap_xml');

    if (updateError) {
      console.error('Error updating sitemap:', updateError);
      throw updateError;
    }

    console.log(`Sitemap generated with ${urls.length} URLs`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        urls_count: urls.length,
        message: 'Sitemap generated successfully'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error generating sitemap:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
