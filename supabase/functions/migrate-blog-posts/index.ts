import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BLOG_URLS = [
  { url: 'https://fisique.fitness/gym-near-me-kokapet-benefits/', slug: 'gym-near-me-kokapet-benefits' },
  { url: 'https://fisique.fitness/kokapet-premium-lifestyle-fitness-fisique/', slug: 'kokapet-premium-lifestyle-fitness-fisique' },
  { url: 'https://fisique.fitness/personalized-diet-counseling-kokapet/', slug: 'personalized-diet-counseling-kokapet' },
  { url: 'https://fisique.fitness/the-role-of-sauna-therapy-in-fitness-recovery/', slug: 'the-role-of-sauna-therapy-in-fitness-recovery' },
  { url: 'https://fisique.fitness/first-personal-training-session-kokapet/', slug: 'first-personal-training-session-kokapet' },
  { url: 'https://fisique.fitness/strength-training-beginners-kokape/', slug: 'strength-training-beginners-kokapet' },
  { url: 'https://fisique.fitness/personal-training-kokapet-sauna-nutrition/', slug: 'personal-training-kokapet-sauna-nutrition' },
];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const results: { slug: string; status: string; error?: string }[] = [];

    // Get or create a default category
    let categoryId: string | null = null;
    const { data: existingCategory } = await supabase
      .from('blog_categories')
      .select('id')
      .eq('slug', 'fitness')
      .single();

    if (existingCategory) {
      categoryId = existingCategory.id;
    } else {
      const { data: newCategory, error: catError } = await supabase
        .from('blog_categories')
        .insert({
          name: 'Fitness',
          slug: 'fitness',
          description: 'Fitness tips, training guides, and wellness articles',
        })
        .select('id')
        .single();

      if (newCategory) {
        categoryId = newCategory.id;
      }
      if (catError) {
        console.error('Category creation error:', catError);
      }
    }

    // Get a default author (first admin)
    const { data: adminRole } = await supabase
      .from('user_roles')
      .select('user_id')
      .eq('role', 'admin')
      .limit(1)
      .single();

    const authorId = adminRole?.user_id;

    if (!authorId) {
      return new Response(
        JSON.stringify({ error: 'No admin user found to assign as author' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    for (const blogInfo of BLOG_URLS) {
      try {
        // Check if post already exists
        const { data: existing } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', blogInfo.slug)
          .single();

        if (existing) {
          results.push({ slug: blogInfo.slug, status: 'skipped', error: 'Already exists' });
          continue;
        }

        // Fetch the page content
        console.log(`Fetching: ${blogInfo.url}`);
        const response = await fetch(blogInfo.url);
        
        if (!response.ok) {
          results.push({ slug: blogInfo.slug, status: 'error', error: `HTTP ${response.status}` });
          continue;
        }

        const html = await response.text();

        // Extract title from HTML
        const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
        let title = titleMatch ? titleMatch[1].replace(' - Fisique Fitness', '').trim() : blogInfo.slug.replace(/-/g, ' ');

        // Extract content from article or main content area
        // This is a simple extraction - may need adjustment based on actual site structure
        let content = '';
        
        // Try to find article content
        const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
        if (articleMatch) {
          content = articleMatch[1];
        } else {
          // Fallback: try to find main content div
          const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
          if (mainMatch) {
            content = mainMatch[1];
          }
        }

        // Clean up HTML - remove scripts, styles, and some formatting
        content = content
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
          .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
          .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '')
          .trim();

        if (!content) {
          // If no content extracted, create placeholder
          content = `<p>This article was migrated from fisique.fitness. Please visit the original URL for full content.</p>`;
        }

        // Extract featured image if available
        let featuredImageUrl: string | null = null;
        const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/i);
        if (ogImageMatch) {
          featuredImageUrl = ogImageMatch[1];
        }

        // Generate excerpt
        const textContent = content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        const excerpt = textContent.substring(0, 160) + (textContent.length > 160 ? '...' : '');

        // Insert the blog post
        const { error: insertError } = await supabase
          .from('blog_posts')
          .insert({
            title,
            slug: blogInfo.slug,
            content,
            excerpt,
            featured_image_url: featuredImageUrl,
            category_id: categoryId,
            author_id: authorId,
            status: 'published',
            published_at: new Date().toISOString(),
          });

        if (insertError) {
          results.push({ slug: blogInfo.slug, status: 'error', error: insertError.message });
        } else {
          results.push({ slug: blogInfo.slug, status: 'success' });
        }

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        results.push({ slug: blogInfo.slug, status: 'error', error: errorMessage });
      }
    }

    return new Response(
      JSON.stringify({ 
        message: 'Blog migration completed',
        results,
        summary: {
          total: results.length,
          success: results.filter(r => r.status === 'success').length,
          skipped: results.filter(r => r.status === 'skipped').length,
          errors: results.filter(r => r.status === 'error').length,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Migration error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
