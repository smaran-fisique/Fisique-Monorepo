import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const googleApiKey = Deno.env.get('GOOGLE_PLACES_API_KEY')!;
    const placeId = Deno.env.get('GOOGLE_PLACE_ID')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check cache freshness (24 hours = 86400000 ms)
    const { data: cachedReviews, error: cacheError } = await supabase
      .from('google_reviews')
      .select('*')
      .order('fetched_at', { ascending: false })
      .limit(5);

    if (cacheError) {
      console.error('Error checking cache:', cacheError);
    }

    // If cache exists and is less than 24 hours old, return cached data
    if (cachedReviews && cachedReviews.length > 0) {
      const lastFetch = new Date(cachedReviews[0].fetched_at);
      const hoursSinceLastFetch = (Date.now() - lastFetch.getTime()) / (1000 * 60 * 60);
      
      if (hoursSinceLastFetch < 24) {
        console.log('Returning cached reviews');
        return new Response(
          JSON.stringify({ reviews: cachedReviews, cached: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Fetch fresh reviews from Google Places API (New)
    console.log('Fetching fresh reviews from Google Places API');
    
    // Ensure Place ID has correct format (should NOT start with "places/")
    const cleanPlaceId = placeId.startsWith('places/') ? placeId.substring(7) : placeId;
    const googleUrl = `https://places.googleapis.com/v1/places/${cleanPlaceId}`;
    
    console.log('Request URL:', googleUrl);
    console.log('API Key present:', !!googleApiKey);
    console.log('Place ID:', cleanPlaceId);
    
    const googleResponse = await fetch(googleUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': googleApiKey,
        'X-Goog-FieldMask': 'reviews,displayName,rating'
      }
    });

    const googleData = await googleResponse.json();
    console.log('Google API Response Status:', googleResponse.status);
    console.log('Google API Response:', JSON.stringify(googleData).substring(0, 200));

    if (googleResponse.status !== 200) {
      console.error('Google API error - Full response:', googleData);
      console.error('Response status:', googleResponse.status);
      console.error('Response headers:', Object.fromEntries(googleResponse.headers.entries()));
      
      // Return cached data if available, even if stale
      if (cachedReviews && cachedReviews.length > 0) {
        console.log('Returning stale cached reviews due to API error');
        return new Response(
          JSON.stringify({ reviews: cachedReviews, cached: true, stale: true }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`Google Places API error: ${googleResponse.status} - ${JSON.stringify(googleData)}`);
    }

    const reviews = googleData.reviews || [];
    
    if (reviews.length === 0) {
      console.log('No reviews found');
      return new Response(
        JSON.stringify({ reviews: [], cached: false }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Delete old cached reviews
    await supabase.from('google_reviews').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Store fresh reviews in cache (up to 5 most recent)
    const reviewsToCache = reviews.slice(0, 5).map((review: any) => ({
      author_name: review.authorAttribution?.displayName || 'Anonymous',
      rating: review.rating || 5,
      text: review.text?.text || review.originalText?.text || '',
      time: new Date(review.publishTime || Date.now()).toISOString(),
      profile_photo_url: review.authorAttribution?.photoUri || null,
      relative_time_description: review.relativePublishTimeDescription || 'Recently',
      fetched_at: new Date().toISOString(),
    }));

    const { data: newReviews, error: insertError } = await supabase
      .from('google_reviews')
      .insert(reviewsToCache)
      .select();

    if (insertError) {
      console.error('Error caching reviews:', insertError);
      throw insertError;
    }

    console.log('Successfully cached fresh reviews');
    return new Response(
      JSON.stringify({ reviews: newReviews, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in fetch-google-reviews:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
