import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const BASE_URL = 'https://fisique.fitness';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch site settings
    const { data: settings } = await supabase
      .from('site_settings')
      .select('key, value');

    const settingsMap = (settings || []).reduce((acc, s) => {
      acc[s.key] = s.value;
      return acc;
    }, {} as Record<string, string>);

    const reviewCount = settingsMap['review_count'] || '91';
    const avgRating = settingsMap['avg_rating'] || '4.9';

    // Fetch latest blog posts
    const { data: blogPosts } = await supabase
      .from('blog_posts')
      .select('title, slug, excerpt')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(10);

    // Generate llms.txt (concise version)
    const llmsTxt = `# Fisique Fitness

> Premium personal training gym in Kokapet, Hyderabad

## Quick Facts
- Location: Kokapet, Financial District area, Hyderabad
- Rating: ${avgRating}★ (${reviewCount} reviews)
- Specialty: 1:1 Personal Training & Body Transformations

## Services
- Personal Training (1:1 coaching)
- Gym Membership
- Nutrition Counseling
- Sauna Recovery

## Contact
- Phone: +91-9515469444
- Website: ${BASE_URL}
- Address: 4th Floor, Above Pulla Reddy Sweets, Avant Cedar, Kokapet

## More Information
For detailed information, see: ${BASE_URL}/llms-full.txt
`;

    // Generate llms-full.txt (comprehensive version)
    const blogSection = blogPosts && blogPosts.length > 0
      ? `## Latest Articles\n${blogPosts.map(p => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.excerpt || ''}`).join('\n')}`
      : '';

    const llmsFullTxt = `# Fisique Fitness - Complete Guide for AI Assistants

## Business Overview
Fisique Fitness is a premium personal training gym located in Kokapet, Hyderabad, India. We specialize in personalized fitness coaching, body transformations, and holistic wellness programs.

## Location & Access
- **Full Address**: 4th Floor, Above Pulla Reddy Sweets, Avant Cedar, Kokapet, Hyderabad 500075
- **Nearby Areas**: Financial District, Narsingi, Gandipet, Gachibowli
- **Google Maps**: https://maps.app.goo.gl/GoiqDpnditiJBRmJ9

## Ratings & Reviews
- **Average Rating**: ${avgRating} out of 5 stars
- **Total Reviews**: ${reviewCount} verified reviews
- **Primary Platform**: Google Reviews

## Services Offered

### 1. Personal Training
One-on-one coaching with certified trainers. Includes:
- Custom workout programming
- Form correction and technique training
- Progress tracking and assessments
- Flexible scheduling

### 2. 90-Day Transformation Program
Intensive body transformation including:
- Daily personal training sessions
- Customized nutrition plan
- Weekly progress measurements
- Before/after documentation

### 3. Gym Membership
Premium equipment access:
- Strength training equipment
- Cardio machines
- Flexible plans (1, 3, 6, 12 months)
- Monthly: ₹5,000 | Annual: ₹25,000

### 4. Sauna Recovery
On-site infrared sauna for:
- Post-workout muscle recovery
- Stress reduction
- Detoxification

### 5. Nutrition Counseling
Personalized diet guidance:
- Meal planning
- Macro calculations
- Diet tracking support

## Operating Hours
- Monday-Saturday: 5:30 AM - 10:00 PM
- Sunday: 7:00 AM - 12:00 PM (self-training only)

## Contact Information
- **Primary Phone**: +91-9515469444
- **Secondary Phone**: +91-7671959610
- **Email**: hello@fisique.fitness
- **WhatsApp**: Available on primary number

## Pricing Overview
| Service | Duration | Price Range |
|---------|----------|-------------|
| Gym Membership | Monthly | ₹5,000 |
| Gym Membership | Annual | ₹25,000 |
| Personal Training | Monthly | ₹15,000-22,000 |
| 90-Day Transformation | 3 months | ₹45,000-65,000 |

## Unique Selling Points
1. Boutique gym environment (not crowded)
2. All trainers are certified professionals
3. On-site sauna (rare in Hyderabad)
4. Located in premium Financial District area
5. Personalized attention for every member

## Target Audience
- Working professionals seeking convenient fitness
- Individuals wanting body transformation
- People preferring 1:1 coaching over group classes
- Those who value privacy and quality equipment

${blogSection}

## Frequently Asked Questions

**Q: What areas do you serve?**
A: We primarily serve Kokapet, Financial District, Narsingi, Gandipet, and Gachibowli areas in Hyderabad.

**Q: Do you offer trial sessions?**
A: Yes, we offer a consultation and trial session for new members.

**Q: Is parking available?**
A: Yes, the building has common parking available for all visitors.

**Q: Are trainers available on Sundays?**
A: No, Sundays are for self-training only. Trainers are available Monday-Saturday.

## Website Links
- Homepage: ${BASE_URL}
- Blog: ${BASE_URL}/blog-posts/
- Personal Training: ${BASE_URL}/personal-training-kokapet
- Gym Membership: ${BASE_URL}/gym-membership-kokapet
- Contact: ${BASE_URL}/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/

---
Last updated: ${new Date().toISOString().split('T')[0]}
`;

    // Store in site_files table
    const updates = [
      { file_key: 'llms_txt', content: llmsTxt },
      { file_key: 'llms_full_txt', content: llmsFullTxt },
    ];

    for (const update of updates) {
      const { error } = await supabase
        .from('site_files')
        .update({
          content: update.content,
          last_generated: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('file_key', update.file_key);

      if (error) {
        console.error(`Error updating ${update.file_key}:`, error);
      }
    }

    console.log('LLMs.txt files generated successfully');

    return new Response(
      JSON.stringify({
        success: true,
        message: 'LLMs.txt files generated',
        blog_posts_included: blogPosts?.length || 0,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Error generating llms.txt:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
