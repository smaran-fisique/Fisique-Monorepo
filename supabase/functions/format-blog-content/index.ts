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
        JSON.stringify({ error: 'GEMINI_API_KEY is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Formatting content with Gemini API...');
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a professional HTML formatter. Take the following HTML content and improve its formatting:

1. Add proper semantic HTML5 tags (article, section, header, etc.)
2. Ensure proper heading hierarchy (h1, h2, h3)
3. Format paragraphs with proper spacing
4. Add proper list formatting (ul, ol)
5. Add blockquotes where appropriate
6. Ensure proper emphasis (strong, em)
7. Keep the original meaning and text intact
8. Return ONLY the formatted HTML without any explanation or markdown code blocks

Content to format:
${content}

Return only the formatted HTML.`
            }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 8000,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      
      let errorMessage = 'Gemini API error';
      if (response.status === 429) {
        errorMessage = 'Gemini API rate limit exceeded. Please wait a moment and try again.';
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const formattedContent = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!formattedContent) {
      return new Response(
        JSON.stringify({ error: 'No content generated' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ formattedContent: formattedContent.trim() }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in format-blog-content function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
