import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { content } = await req.json();
    
    if (!content) {
      return new Response(
        JSON.stringify({ error: 'Content is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: 'Gemini API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Calling Gemini API to enhance blog content...');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional blog content optimizer. Given the following raw blog content, enhance it and extract/generate the following information in JSON format:

1. title: A compelling, SEO-friendly title (max 60 characters)
2. slug: A URL-friendly version of the title
3. excerpt: A concise summary (max 160 characters)
4. content: The enhanced and professionally formatted blog content in HTML format with proper headings, paragraphs, lists, etc.
5. suggestedCategory: Suggest one of these categories: "Training Tips", "Nutrition & Diet", "Recovery & Wellness", "Success Stories", "Fitness Lifestyle"
6. featuredImagePrompt: A detailed description for generating a featured image (max 100 characters)

Raw content to enhance:
${content}

Return ONLY valid JSON with these exact keys: title, slug, excerpt, content, suggestedCategory, featuredImagePrompt`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 8000,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      
      let errorMessage = `Gemini API error: ${response.status}`;
      
      // Handle rate limit errors specifically
      if (response.status === 429) {
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.message) {
            errorMessage = 'Gemini API quota exceeded. Please check your API key billing and rate limits at https://ai.google.dev/gemini-api/docs/rate-limits';
          }
        } catch (e) {
          errorMessage = 'Gemini API rate limit exceeded. Please wait a moment and try again, or check your API quota.';
        }
      } else if (response.status === 401) {
        errorMessage = 'Invalid Gemini API key. Please check your API key configuration.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request to Gemini API. Please check your content format.';
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Gemini API response received');

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      console.error('No text in Gemini response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'No content generated from Gemini' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract JSON from the response (it might be wrapped in markdown code blocks)
    let jsonText = generatedText.trim();
    if (jsonText.startsWith('```json')) {
      jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonText.startsWith('```')) {
      jsonText = jsonText.replace(/```\n?/g, '');
    }

    const enhancedContent = JSON.parse(jsonText);

    return new Response(
      JSON.stringify(enhancedContent),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in enhance-blog-content function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});