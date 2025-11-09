import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';
import { corsHeaders } from '../_shared/cors.ts';

interface BlogPostRequest {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  category_id?: string;
  status?: 'draft' | 'published';
  featured_image_url?: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = req.headers.get('x-api-key');
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Hash the API key (simple SHA-256)
    const encoder = new TextEncoder();
    const data = encoder.encode(apiKey);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const keyHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Verify API key
    const { data: apiKeyData, error: keyError } = await supabase
      .from('api_keys')
      .select('id, created_by, scopes, is_active')
      .eq('key_hash', keyHash)
      .eq('is_active', true)
      .single();

    if (keyError || !apiKeyData) {
      console.error('Invalid API key:', keyError);
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if key has blog:write scope
    if (!apiKeyData.scopes?.includes('blog:write')) {
      return new Response(
        JSON.stringify({ error: 'API key does not have blog:write permission' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update last used timestamp
    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', apiKeyData.id);

    // Parse request body
    const body: BlogPostRequest = await req.json();

    // Validate required fields
    if (!body.title || !body.slug || !body.content) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title, slug, content' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create blog post
    const postData = {
      title: body.title,
      slug: body.slug,
      content: body.content,
      excerpt: body.excerpt || '',
      category_id: body.category_id || null,
      status: body.status || 'draft',
      featured_image_url: body.featured_image_url || null,
      author_id: apiKeyData.created_by,
      published_at: body.status === 'published' ? new Date().toISOString() : null,
    };

    const { data: post, error: postError } = await supabase
      .from('blog_posts')
      .insert(postData)
      .select()
      .single();

    if (postError) {
      console.error('Error creating blog post:', postError);
      return new Response(
        JSON.stringify({ error: 'Failed to create blog post', details: postError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Blog post created successfully:', post.id);

    return new Response(
      JSON.stringify({ success: true, post }),
      { status: 201, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error in create-blog-post function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
