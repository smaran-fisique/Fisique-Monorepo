import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { verifyAuth, corsHeaders, sanitizeError } from '../_shared/auth.ts';

async function enhanceWithGemini(content: string, apiKey: string, prompt: string, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${prompt}

Raw content to enhance:
${content}

Return only the JSON object, no other text.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 8000,
            }
          }),
        }
      );

      if (response.status === 503 && i < retries) {
        console.log(`Gemini overloaded, retrying (${i + 1}/${retries})...`);
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
        continue;
      }

      return response;
    } catch (error) {
      if (i === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
    }
  }
  
  throw new Error('Max retries exceeded');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify admin authentication
    const auth = await verifyAuth(req, true);
    if (auth.error) return auth.error;

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
        JSON.stringify({ error: 'AI service is not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the custom prompt from settings using service role for server-side access
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

    const { data: settingsData, error: settingsError } = await supabaseAdmin
      .from('site_settings')
      .select('value')
      .eq('key', 'ai_enhance_prompt')
      .single();

    if (settingsError) {
      console.error('Error fetching prompt setting:', settingsError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch AI prompt settings' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const prompt = settingsData?.value || '';

    console.log('Enhancing content with Gemini API...');
    const response = await enhanceWithGemini(content, geminiApiKey, prompt);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      
      let errorMessage = 'AI service error';
      
      if (response.status === 429) {
        errorMessage = 'AI service rate limit exceeded. Please wait a moment and try again.';
      } else if (response.status === 503) {
        errorMessage = 'AI service is temporarily overloaded. Please try again in a moment.';
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Gemini response received successfully');

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error('No text in Gemini response:', JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: 'No content generated' }),
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
    const sanitized = sanitizeError(error, 'enhance-blog-content');
    return new Response(
      JSON.stringify(sanitized),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
