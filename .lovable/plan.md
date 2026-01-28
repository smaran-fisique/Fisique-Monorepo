
# Phases 1-3 Implementation + Blog Migration

## Executive Summary
This plan implements the three-phase SEO strategy from our marketing analysis and migrates all 7 blogs from the current fisique.fitness site to the new platform.

---

## Phase 1: Local SEO Dominance

### 1.1 Create `/kokapet-gym` Landing Page
**File:** `src/pages/KokapetGym.tsx`

**SEO-Optimized Structure:**
- Title: "Premium Personal Gym Kokapet | Fisique Fitness Hyderabad"
- H1: "Premium Personal Gym Kokapet"
- Content sections:
  - Hero with location context and 4.9-star rating badge
  - About the Kokapet location (800+ words with natural keyword density)
  - Services overview (links to main offerings)
  - Google Reviews carousel (reuse existing component)
  - FAQ section with schema markup
  - Google Maps embed
  - Free Trial CTA

**Route Addition:** `/kokapet-gym` in `App.tsx`

### 1.2 Google Reviews Integration on Homepage
**File:** `src/pages/Index.tsx` (Update)

Add `ReviewsSection` component to homepage after `WhoIsForSection`:
- Displays 4.9-star rating with live Google reviews
- Trust signal: "91+ 5-Star Reviews | Kokapet Local"
- Already built - just needs to be added to Index.tsx

### 1.3 FAQ Schema Implementation
**File:** `src/components/FAQSchema.tsx` (New)

Create reusable FAQ component with JSON-LD schema:
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What makes Fisique different from other gyms in Kokapet?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "..."
      }
    }
  ]
}
```

**File:** `src/components/FAQSection.tsx` (New)
- Visual FAQ accordion for homepage/landing pages
- Questions covering PT, membership, sauna, location

---

## Phase 2: Personal Training Landing Page

### 2.1 Create `/personal-training-kokapet` Page
**File:** `src/pages/PersonalTrainingKokapet.tsx`

**SEO Structure:**
- Title: "Personal Training Kokapet | 90-Day Transformation Plans | Fisique"
- H1: "Personal Training Kokapet"

**Content Sections:**
1. Hero with transformation messaging
2. "What's Included" - PT packages breakdown
3. "Our Approach" - Science-backed methodology
4. Before/After Carousel (placeholder for future client photos)
5. Pricing inquiry CTA (WhatsApp)
6. FAQ schema specific to PT
7. Testimonials from reviews

**Route Addition:** `/personal-training-kokapet` in `App.tsx`

### 2.2 Blog Rollout Strategy
Instead of auto-generating 5 blogs, we'll migrate the existing 7 from fisique.fitness (see Phase 3).

---

## Phase 3: Membership Landing Page + Blog Migration

### 3.1 Create `/gym-membership-kokapet` Page
**File:** `src/pages/GymMembershipKokapet.tsx`

**SEO Structure:**
- Title: "Gym Membership Kokapet | Flexible Plans | Fisique Fitness"
- H1: "Gym Membership Kokapet"

**Content Sections:**
1. Hero emphasizing flexibility and premium equipment
2. Membership tiers (1, 3, 6, 12 months)
3. "What's Included" feature grid
4. Comparison with typical gyms (premium positioning)
5. FAQ schema specific to membership
6. CTA: "Request Pricing on WhatsApp"

**Route Addition:** `/gym-membership-kokapet` in `App.tsx`

### 3.2 Blog Migration from fisique.fitness

**Blogs to Migrate (7 total):**

| # | Current URL | New Slug | Status |
|---|------------|----------|--------|
| 1 | `/gym-near-me-kokapet-benefits/` | `gym-near-me-kokapet-benefits` | Migrate |
| 2 | `/kokapet-premium-lifestyle-fitness-fisique/` | `kokapet-premium-lifestyle-fitness-fisique` | Migrate |
| 3 | `/personalized-diet-counseling-kokapet/` | `personalized-diet-counseling-kokapet` | Migrate |
| 4 | `/the-role-of-sauna-therapy-in-fitness-recovery/` | `the-role-of-sauna-therapy-in-fitness-recovery` | Migrate |
| 5 | `/first-personal-training-session-kokapet/` | `first-personal-training-session-kokapet` | Migrate |
| 6 | `/strength-training-beginners-kokape/` | `strength-training-beginners-kokapet` | Migrate (fix typo) |
| 7 | `/personal-training-kokapet-sauna-nutrition/` | `personal-training-kokapet-sauna-nutrition` | Migrate |

**Migration Approach:**
1. Create edge function `migrate-blog-posts` to scrape content from fisique.fitness
2. Parse markdown, extract title, content, featured image
3. Insert into `blog_posts` table with proper slugs
4. Ensure category assignment (create categories if needed)

**Note:** 8 blogs already exist in the database (different content) - these will be preserved.

---

## Homepage Enhancements

### Add Reviews Section
**File:** `src/pages/Index.tsx`

Update section order:
```
Hero
AboutSection
CoreOfferingsSection
StudioProvidesSection
MembershipPlansSection
TrainingOptionsSubSection
WhoIsForSection
ReviewsSection  <-- ADD HERE
FinalCTA
```

### Add "What Sets Fisique Apart" Section (Optional Enhancement)
**File:** `src/components/DifferentiatorsSection.tsx` (New)

Bullet-style section highlighting:
- Private sauna recovery
- Certified personal trainers
- Flexible scheduling
- Proven client results (link to reviews)

---

## Navigation Updates

### Header Navigation
**File:** `src/components/Header.tsx`

Add new landing pages to navigation dropdown or footer links:
- Kokapet Gym (`/kokapet-gym`)
- Personal Training (`/personal-training-kokapet`)
- Membership (`/gym-membership-kokapet`)

---

## Technical SEO Implementation

### Sitemap Updates
**File:** `public/sitemap.xml`

Add new URLs:
```xml
<url>
  <loc>https://fisique.fitness/kokapet-gym</loc>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://fisique.fitness/personal-training-kokapet</loc>
  <priority>0.8</priority>
</url>
<url>
  <loc>https://fisique.fitness/gym-membership-kokapet</loc>
  <priority>0.8</priority>
</url>
```

### Meta Tags for New Pages
Each new page will include:
- Title tag with location keywords
- Meta description (160 chars)
- Open Graph tags
- Canonical URL

---

## Files Summary

### New Files to Create:
1. `src/pages/KokapetGym.tsx` - Phase 1 landing page
2. `src/pages/PersonalTrainingKokapet.tsx` - Phase 2 landing page
3. `src/pages/GymMembershipKokapet.tsx` - Phase 3 landing page
4. `src/components/FAQSchema.tsx` - JSON-LD FAQ schema
5. `src/components/FAQSection.tsx` - Visual FAQ accordion
6. `supabase/functions/migrate-blog-posts/index.ts` - Blog migration utility

### Files to Modify:
1. `src/App.tsx` - Add 3 new routes
2. `src/pages/Index.tsx` - Add ReviewsSection
3. `src/components/Header.tsx` - Add navigation links (optional)
4. `public/sitemap.xml` - Add new URLs

---

## Implementation Order

1. **Phase 1 First:**
   - Create FAQSchema and FAQSection components
   - Create `/kokapet-gym` landing page
   - Add ReviewsSection to homepage

2. **Phase 2 Next:**
   - Create `/personal-training-kokapet` landing page
   - Add Before/After carousel component (placeholder)

3. **Phase 3 Last:**
   - Create `/gym-membership-kokapet` landing page
   - Run blog migration (scrape and import 7 posts)
   - Update sitemap

4. **Cleanup:**
   - Test all new pages for mobile responsiveness
   - Validate schema markup via Google Rich Results Test
   - Verify PageSpeed scores (target 90+)

---

## Blog Migration Technical Details

### Edge Function: `migrate-blog-posts`

Will fetch each blog URL from fisique.fitness, parse the HTML/markdown content, and insert into the database. This is a one-time migration utility.

**Process:**
1. Fetch page content using Firecrawl or direct fetch
2. Extract: title, content (HTML), featured image URL
3. Generate excerpt from first 160 characters
4. Assign to "Fitness" or "Nutrition" category
5. Insert with status "published"

---

## Expected Outcomes

- **Local SEO:** 3 location-specific landing pages targeting "Kokapet" and "Narsingi" keywords
- **Trust Signals:** Google reviews prominently displayed with 4.9-star rating
- **Content Authority:** 15 total blog posts (7 migrated + 8 existing)
- **Schema Markup:** LocalBusiness + FAQ schemas for rich snippets
- **Map Pack Visibility:** Improved with location-specific pages
