import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function enhanceWithGemini(content: string, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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

  return response;
}

async function enhanceWithLovableAI(content: string, apiKey: string) {
  const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'google/gemini-2.5-flash',
      messages: [
        {
          role: 'system',
          content: 'You are a professional blog content optimizer. Return only valid JSON without any markdown formatting or code blocks.'
        },
        {
          role: 'user',
          content: `Enhance the following blog content and return JSON with these keys: title (max 60 chars), slug (URL-friendly), excerpt (max 160 chars), content (HTML formatted), suggestedCategory (one of: "Training Tips", "Nutrition & Diet", "Recovery & Wellness", "Success Stories", "Fitness Lifestyle"), featuredImagePrompt (max 100 chars).

Raw content:
${content}`
        }
      ],
      temperature: 0.7,
      max_tokens: 8000,
    }),
  });

  return response;
}

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
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    let response;
    let usedAPI = 'Gemini';

    // Try Gemini first if API key is configured
    if (geminiApiKey) {
      console.log('Attempting to enhance with Gemini API...');
      response = await enhanceWithGemini(content, geminiApiKey);
      
      // If Gemini hits quota limit, fallback to Lovable AI
      if (response.status === 429 && lovableApiKey) {
        console.log('Gemini quota exceeded, falling back to Lovable AI...');
        response = await enhanceWithLovableAI(content, lovableApiKey);
        usedAPI = 'Lovable AI';
      }
    } else if (lovableApiKey) {
      console.log('Using Lovable AI (Gemini key not configured)...');
      response = await enhanceWithLovableAI(content, lovableApiKey);
      usedAPI = 'Lovable AI';
    } else {
      return new Response(
        JSON.stringify({ error: 'No AI API key configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`${usedAPI} error:`, response.status, errorText);
      
      let errorMessage = `${usedAPI} error: ${response.status}`;
      
      if (response.status === 429) {
        errorMessage = `${usedAPI} rate limit exceeded. Please wait a moment and try again.`;
      } else if (response.status === 401) {
        errorMessage = `Invalid ${usedAPI} API key. Please check your API key configuration.`;
      } else if (response.status === 400) {
        errorMessage = `Invalid request to ${usedAPI}. Please check your content format.`;
      }
      
      return new Response(
        JSON.stringify({ error: errorMessage }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log(`${usedAPI} response received successfully`);

    let generatedText;
    if (usedAPI === 'Gemini') {
      generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    } else {
      generatedText = data.choices?.[0]?.message?.content;
    }

    if (!generatedText) {
      console.error(`No text in ${usedAPI} response:`, JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: `No content generated from ${usedAPI}` }),
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
    enhancedContent._aiProvider = usedAPI; // Add metadata about which AI was used

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