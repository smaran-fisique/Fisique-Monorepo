import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Content types for different file types
const CONTENT_TYPES: Record<string, string> = {
  'sitemap_xml': 'application/xml; charset=utf-8',
  'robots_txt': 'text/plain; charset=utf-8',
  'llms_txt': 'text/plain; charset=utf-8',
  'llms_full_txt': 'text/plain; charset=utf-8',
};

// Fallback content for critical files
const FALLBACK_CONTENT: Record<string, string> = {
  'robots_txt': `User-agent: *
Allow: /

Sitemap: https://fisique.fitness/sitemap.xml`,
  'sitemap_xml': `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://fisique.fitness/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`,
  'llms_txt': `# Fisique Fitness
Premium personal training gym in Kokapet, Hyderabad.
Visit: https://fisique.fitness`,
  'llms_full_txt': `# Fisique Fitness - Full Context
Premium personal training gym in Kokapet, Hyderabad offering 1:1 coaching, nutrition guidance, and sauna recovery.`,
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const fileKey = url.searchParams.get('file');

    if (!fileKey || !CONTENT_TYPES[fileKey]) {
      return new Response(
        JSON.stringify({ 
          error: 'Invalid file key',
          valid_keys: Object.keys(CONTENT_TYPES)
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!
    );

    const { data, error } = await supabase
      .from('site_files')
      .select('content, last_generated')
      .eq('file_key', fileKey)
      .maybeSingle();

    let content: string;
    
    if (error || !data || !data.content) {
      console.warn(`Using fallback for ${fileKey}:`, error?.message || 'No content');
      content = FALLBACK_CONTENT[fileKey] || '';
    } else {
      content = data.content;
    }

    // Set cache headers (1 hour for sitemap, 24 hours for others)
    const cacheMaxAge = fileKey === 'sitemap_xml' ? 3600 : 86400;

    return new Response(content, {
      headers: {
        ...corsHeaders,
        'Content-Type': CONTENT_TYPES[fileKey],
        'Cache-Control': `public, max-age=${cacheMaxAge}`,
        'X-Generated-At': data?.last_generated || 'fallback',
      },
    });
  } catch (error) {
    console.error('Error serving SEO file:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
