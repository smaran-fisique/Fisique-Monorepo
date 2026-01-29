import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get review stats from google_reviews table
    const { data: reviews, error: reviewsError } = await supabase
      .from('google_reviews')
      .select('rating');

    if (reviewsError) {
      throw reviewsError;
    }

    const reviewCount = reviews?.length || 0;
    const avgRating = reviewCount > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
      : '0';

    console.log(`Syncing review stats: ${reviewCount} reviews, ${avgRating} avg rating`);

    // Update site_settings
    const updates = [
      { key: 'review_count', value: reviewCount.toString() },
      { key: 'avg_rating', value: avgRating },
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: update.key,
          value: update.value,
          description: update.key === 'review_count' 
            ? 'Total number of Google reviews'
            : 'Average Google review rating',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'key' });

      if (error) {
        console.error(`Error updating ${update.key}:`, error);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        review_count: reviewCount,
        avg_rating: avgRating,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error syncing review stats:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
