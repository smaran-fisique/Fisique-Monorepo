import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';
import { verifyAuth, corsHeaders, sanitizeError } from '../_shared/auth.ts';

interface ReviewData {
  reviewId: string;
  name: string;
  stars: number;
  text: string | null;
  publishedAtDate: string;
  publishAt: string;
  reviewerPhotoUrl: string | null;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin authentication
    const auth = await verifyAuth(req, true);
    if (auth.error) return auth.error;

    console.log('Starting bulk review import');

    // Create Supabase client with service role for database operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { reviews } = await req.json() as { reviews: ReviewData[] };

    if (!reviews || !Array.isArray(reviews)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request: reviews array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${reviews.length} reviews for import`);

    // Transform reviews to database format
    const reviewsToInsert = reviews.map(review => ({
      google_review_id: review.reviewId,
      author_name: review.name,
      rating: review.stars,
      text: review.text || '',
      time: review.publishedAtDate,
      relative_time_description: review.publishAt,
      profile_photo_url: review.reviewerPhotoUrl,
      fetched_at: new Date().toISOString()
    }));

    // Use UPSERT to insert or update reviews based on google_review_id
    const { data, error } = await supabase
      .from('google_reviews')
      .upsert(reviewsToInsert, {
        onConflict: 'google_review_id',
        ignoreDuplicates: false
      })
      .select();

    if (error) {
      console.error('Error inserting reviews:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to import reviews' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Successfully imported ${data?.length || reviewsToInsert.length} reviews`);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Successfully imported ${data?.length || reviewsToInsert.length} reviews`,
        count: data?.length || reviewsToInsert.length
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    const sanitized = sanitizeError(error, 'import-reviews-bulk');
    return new Response(
      JSON.stringify(sanitized),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
