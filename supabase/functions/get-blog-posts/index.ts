import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';
import { corsHeaders, sanitizeError } from '../_shared/auth.ts';

interface GetBlogPostsRequest {
  date_from?: string;
  date_to?: string;
  category_id?: string;
  limit?: number;
  offset?: number;
  include_content?: boolean;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get API key from header
    const apiKey = req.headers.get('x-api-key');
    
    if (!apiKey) {
      console.error('No API key provided');
      return new Response(
        JSON.stringify({ error: 'API key is required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Hash the API key for comparison
    const encoder = new TextEncoder();
    const data = encoder.encode(apiKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Verify API key and check scopes
    const { data: apiKeyData, error: keyError } = await supabase
      .from('api_keys')
      .select('id, scopes, is_active')
      .eq('key_hash', keyHash)
      .single();

    if (keyError || !apiKeyData) {
      console.error('Invalid API key attempt');
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!apiKeyData.is_active) {
      console.error('API key is inactive');
      return new Response(
        JSON.stringify({ error: 'API key is inactive' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if key has blog:read scope
    if (!apiKeyData.scopes.includes('blog:read')) {
      console.error('API key does not have blog:read scope');
      return new Response(
        JSON.stringify({ error: 'Insufficient permissions' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update last_used_at
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', apiKeyData.id);

    // Parse request body
    const requestData: GetBlogPostsRequest = await req.json().catch(() => ({}));
    
    // Validate and set defaults with limits
    const limit = Math.min(Math.max(requestData.limit || 50, 1), 200);
    const offset = Math.max(requestData.offset || 0, 0);
    const includeContent = requestData.include_content || false;

    // Build query
    let query = supabase
      .from('blog_posts')
      .select(`
        id,
        title,
        slug,
        excerpt,
        published_at,
        content,
        featured_image_url,
        category_id,
        blog_categories (
          id,
          name,
          slug
        )
      `, { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    // Apply filters with validation
    if (requestData.date_from) {
      const dateFrom = new Date(requestData.date_from);
      if (!isNaN(dateFrom.getTime())) {
        query = query.gte('published_at', dateFrom.toISOString());
      }
    }
    if (requestData.date_to) {
      const dateTo = new Date(requestData.date_to);
      if (!isNaN(dateTo.getTime())) {
        query = query.lte('published_at', dateTo.toISOString());
      }
    }
    if (requestData.category_id) {
      // Basic UUID validation
      if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestData.category_id)) {
        query = query.eq('category_id', requestData.category_id);
      }
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: posts, error: postsError, count } = await query;

    if (postsError) {
      console.error('Error fetching blog posts:', postsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch blog posts' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Format response
    const formattedPosts = posts?.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      published_at: post.published_at,
      featured_image_url: post.featured_image_url,
      category: Array.isArray(post.blog_categories) ? post.blog_categories[0] : post.blog_categories,
      ...(includeContent && { content: post.content })
    })) || [];

    console.log(`Successfully fetched ${formattedPosts.length} blog posts`);

    return new Response(
      JSON.stringify({
        success: true,
        posts: formattedPosts,
        total: count || 0,
        limit,
        offset
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    const sanitized = sanitizeError(error, 'get-blog-posts');
    return new Response(
      JSON.stringify(sanitized),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
