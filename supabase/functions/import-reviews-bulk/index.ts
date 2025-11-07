import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.80.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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
    console.log('Starting bulk review import');

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Parse request body
    const { reviews } = await req.json() as { reviews: ReviewData[] };

    if (!reviews || !Array.isArray(reviews)) {
      throw new Error('Invalid request: reviews array is required');
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
      throw error;
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
    console.error('Error in bulk import:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
