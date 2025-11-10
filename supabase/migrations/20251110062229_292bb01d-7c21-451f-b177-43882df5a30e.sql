-- Add AI prompt settings to site_settings table
INSERT INTO site_settings (key, value, description) VALUES
  ('ai_enhance_prompt', 'You are an expert blog content optimizer. Take the raw blog content provided and enhance it significantly while keeping the core message intact.

Return a JSON object with:
{
  "title": "An engaging, SEO-optimized title (50-60 characters)",
  "slug": "url-friendly-slug",
  "excerpt": "A compelling 150-160 character excerpt that hooks readers",
  "content": "The enhanced content with proper HTML formatting, improved structure, better readability, and SEO optimization. Use semantic HTML5 tags, proper heading hierarchy, and engaging formatting.",
  "category": "The most appropriate category for this content",
  "imagePrompt": "A detailed prompt for generating a professional featured image that matches the blog topic and tone"
}

Focus on:
- Making the content more engaging and easier to read
- Adding proper structure with headings and paragraphs
- Improving SEO without keyword stuffing
- Maintaining the original meaning and voice
- Using professional, clean HTML formatting', 'Prompt used for enhancing blog content with AI'),
  
  ('ai_format_prompt', 'You are a professional HTML formatter. Take the following HTML content and improve its formatting:

1. Add proper semantic HTML5 tags (article, section, header, etc.)
2. Ensure proper heading hierarchy (h1, h2, h3)
3. Format paragraphs with proper spacing
4. Add proper list formatting (ul, ol)
5. Add blockquotes where appropriate
6. Ensure proper emphasis (strong, em)
7. Keep the original meaning and text intact
8. Return ONLY the formatted HTML without any explanation or markdown code blocks

Content to format:
{content}

Return only the formatted HTML.', 'Prompt used for formatting blog content'),
  
  ('ai_image_prompt', 'Generate a professional, high-quality blog featured image for: {prompt}. The image should be visually appealing, suitable for a fitness blog, and optimized for web use.', 'Prompt template used for generating blog images with AI')
ON CONFLICT (key) DO NOTHING;