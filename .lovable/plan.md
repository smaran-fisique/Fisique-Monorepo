

# SEO Competitive Game Plan for Fisique Fitness

## Current State Analysis

Based on the Google search results, here's where you stand vs competitors:

| Metric | Fisique | HOT Gym | Cult.fit | Gold's Gym |
|--------|---------|---------|----------|------------|
| Indexed Landing Pages | 3 | 8+ | 15+ | 5+ |
| Price Rich Snippets | No | No | No | Yes |
| Location Variations | 1 (Kokapet) | 3+ | 10+ | 3+ |
| Blog Posts | 15 | Unknown | Many | Few |
| FAQ Schema | Yes | Unknown | Yes | Unknown |

---

## The 4-Pillar Game Plan

### Pillar 1: Location Expansion Pages (High Impact)
**Create landing pages for adjacent neighborhoods where your potential clients live/work:**

1. `/gym-narsingi` - "Premium Gym Near Narsingi"
2. `/gym-financial-district` - "Gym in Financial District, Hyderabad"
3. `/gym-gachibowli` - "Best Gym Near Gachibowli"
4. `/gym-gandipet` - "Fitness Studio Near Gandipet"
5. `/personal-trainer-hyderabad` - Broader city-level keyword capture

Each page will:
- Target location-specific keywords
- Include unique content about commute times, nearby landmarks
- Have its own FAQ schema with location-specific questions
- Include Google Maps embed with directions from that area

---

### Pillar 2: Price Rich Snippets (Quick Win)
**Add Product/Offer schema to get price ranges showing in search results**

Create a new `ServiceSchema` component that includes:
```text
+----------------------------------+
| Service Schema Structure         |
+----------------------------------+
| - Personal Training              |
|   └─ AggregateOffer              |
|      ├─ lowPrice: "15000"        |
|      └─ highPrice: "50000"       |
+----------------------------------+
| - Gym Membership                 |
|   └─ AggregateOffer              |
|      ├─ lowPrice: "3000"         |
|      └─ highPrice: "30000"       |
+----------------------------------+
```

This will trigger Google's price range display like Gold's Gym shows.

---

### Pillar 3: Service-Specific Deep Pages
**Create dedicated pages for high-intent service keywords:**

1. `/sauna-gym-kokapet` - Unique differentiator, no competitor has this
2. `/90-day-transformation-program` - Your signature offering
3. `/nutrition-coaching-kokapet` - Capture diet/nutrition searches
4. `/strength-training-kokapet` - Specific modality page
5. `/weight-loss-gym-kokapet` - Goal-oriented landing page
6. `/women-fitness-kokapet` - Demographic targeting (Cult does this)

---

### Pillar 4: Enhanced Schema Implementation

**Current schemas you have:**
- LocalBusinessSchema
- FAQSchema
- BreadcrumbSchema
- OrganizationSchema
- WebSiteSchema
- BlogPostSchema

**Schemas to add:**

1. **Service Schema** with pricing
2. **GymMembership Product Schema** with AggregateOffer
3. **Course Schema** for 90-day transformation (as an educational program)
4. **Review snippets** with individual review schema
5. **Video Schema** (if you have any gym tour/testimonial videos)

---

## Implementation Priority

| Priority | Task | Impact | Effort |
|----------|------|--------|--------|
| P0 | Add Service/Product Schema with pricing | High | Low |
| P1 | Create Financial District landing page | High | Medium |
| P1 | Create Narsingi landing page | High | Medium |
| P2 | Create Sauna Gym page | Medium | Medium |
| P2 | Create 90-Day Transformation page | Medium | Medium |
| P3 | Create remaining location pages | Medium | High |
| P3 | Add Video Schema (if videos exist) | Low | Low |

---

## Technical Implementation Details

### New Files to Create:
```text
src/pages/
├── GymNarsingi.tsx
├── GymFinancialDistrict.tsx
├── GymGachibowli.tsx
├── GymGandipet.tsx
├── SaunaGymKokapet.tsx
├── TransformationProgram.tsx
├── NutritionCoachingKokapet.tsx
└── WeightLossGymKokapet.tsx

src/components/
├── ServiceSchema.tsx (NEW - with pricing)
├── ProductSchema.tsx (NEW - for memberships)
└── CourseSchema.tsx (NEW - for 90-day program)
```

### Sitemap Updates:
Add all new pages to `public/sitemap.xml`

### Route Updates:
Add routes to `src/App.tsx`

---

## Expected Outcomes

**Within 2-4 weeks:**
- Price ranges appearing in search results
- More indexed pages competing for location keywords

**Within 1-3 months:**
- Improved rankings for "gym near [location]" queries
- Capture traffic from Financial District IT professionals
- Dominate "sauna gym" searches (unique positioning)

**Within 3-6 months:**
- Compete with Cult.fit on page count
- Own premium/boutique gym positioning in Kokapet area

---

## Quick Wins You Can Do Today

1. Add price ranges to structured data
2. Update LocalBusinessSchema with more specific service offerings
3. Add individual Review schema entries (not just aggregate)

---

## Content Strategy for New Pages

Each location page should include:
- H1: "[Service] Near [Location]" pattern
- Driving distance and time from that location
- Why professionals from that area choose Fisique
- Google Maps directions from that specific area
- Location-specific testimonials if available
- Unique FAQ questions about that location

