

# Fisique Fitness: Prioritized Hybrid Model + SEO Preservation

## Priority Framework

| Priority | Model | Where to Feature |
|----------|-------|------------------|
| **P0** | Personal Training | Hero, About, Core Offerings, Membership (primary) |
| **P1** | Gym Membership | Hero, Membership Plans, Studio Features |
| **P2** | Freelance/BYOT | Sub-section mention, Membership tier note |

---

## Phase 1: Homepage Structure

### 1.1 Hero Section
**File:** `src/components/Hero.tsx`

**Changes:**
- H1: "Elevate Your Fitness Journey in Kokapet" (SEO requirement)
- Subtitle: "Experience personalized training tailored to your goals. Expert coaches. Premium equipment. Results-driven programs."
- Eyebrow: "Kokapet, Hyderabad" (already done)
- NO mention of freelancing here
- CTAs: "Start Your Journey" (WhatsApp) + "Visit the Studio" (Maps)

### 1.2 About Us Section
**File:** `src/components/AboutSection.tsx` (New)

**Content:**
- H2: "About Us"
- Focus on PT-first positioning with SEO phrases:
  - "Located in Kokapet"
  - "personalized, results-driven training"
  - "one-on-one coaching"
  - "customized nutrition plans"
  - "on-site sauna recovery"

### 1.3 Core Offerings Section
**File:** `src/components/CoreOfferingsSection.tsx` (New)

**H2: "Our Core Offerings" with required H3 sub-headings:**
- H3: "Personalised Plans"
- H3: "Strength Training"
- H3: "Mobility and Flexibility"
- H3: "Nutrition Guidance"

### 1.4 Studio Features Section
**File:** `src/components/StudioProvidesSection.tsx` (Update)

Keep existing content about equipment, sauna, limited capacity - applies to all members.

### 1.5 Membership Plans Section
**File:** `src/components/MembershipPlansSection.tsx` (New)

**H2: "Membership Plans"**

| Tier | Priority | Description |
|------|----------|-------------|
| **Personal Training** | P0 | One-on-one coaching + nutrition + sauna |
| **Gym Membership** | P1 | Equipment access, 1/3/6/12 month options |
| **Freelance Trainer Access** | P2 | Small note: "Already have a trainer? They're welcome here." |

The freelance option appears as a note or smaller card, not equal prominence.

### 1.6 Training Options Sub-Section (P2 Mention)
**File:** `src/components/TrainingOptionsSubSection.tsx` (New)

A smaller, secondary section after Membership Plans:

**H3: "Already Have a Trainer?"**
- Brief copy: "Freelance trainers and physiotherapists are welcome to train clients at Fisique. Contact us for trainer access options."
- Single CTA: "Inquire on WhatsApp"

This keeps freelancing visible for SEO ("freelance trainer gym") without competing with PT messaging.

### 1.7 Who Is This For Section
**File:** `src/components/WhoIsForSection.tsx` (Update)

Update criteria focusing on PT and membership:
- You want expert guidance to accelerate results
- You value quality equipment over crowded gyms
- You care about recovery as much as workouts
- You want accountability and progress tracking

### 1.8 Final CTA
**File:** `src/components/FinalCTA.tsx` (Update)

Focus on PT trial:
- Headline: "Ready to Transform Your Fitness?"
- CTA: "Book a PT Trial"

---

## Phase 2: Homepage Section Order

**Updated `src/pages/Index.tsx`:**

```
1. Header
2. Hero (PT-focused)
3. AboutSection (H2: About Us)
4. CoreOfferingsSection (H2: Our Core Offerings)
5. StudioProvidesSection (H2: What the Studio Gives You)
6. MembershipPlansSection (H2: Membership Plans) - PT primary, Gym secondary, Freelance note
7. TrainingOptionsSubSection (H3: Already Have a Trainer?) - P2 mention
8. WhoIsForSection (H2: This Space Is For You If)
9. FinalCTA
10. Footer
```

**Sections to Remove:**
- `ProblemSection.tsx`
- `WhatWeDontDoSection.tsx`
- `WhatIsFisiqueSection.tsx`
- `TrainingOptionsSection.tsx`

---

## Phase 3: Multi-Page Routes (SEO Requirement)

### Route Changes
**File:** `src/App.tsx`

- `/blog` → `/blog-posts/`
- Add `/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/`

### Contact Page
**File:** `src/pages/Contact.tsx` (New)

- Title: "Contact - Fisique Fitness - Kokapets' Most Holistic Gym"
- H1: "Contact Us"
- NAP matching Google Business Profile

---

## Phase 4: Navigation & Footer

### Header Navigation
**File:** `src/components/Header.tsx`

- Home, About, Services, Membership, Posts, Contact

### Footer
**File:** `src/components/Footer.tsx`

Update NAP:
- Address: 4th Floor, Above Pulla reddy Sweets, Avant Cedar, Kokapet
- Phone: +91-9515847444 | +91-7671959610
- Email: hello@fisique.fitness

---

## Phase 5: SEO Technical

### Files to Create/Update:
- `index.html` - Update title tag
- `public/sitemap.xml` - Three indexed URLs
- `src/components/LocalBusinessSchema.tsx` - JSON-LD markup

---

## Files Summary

### New Files:
- `src/components/AboutSection.tsx`
- `src/components/CoreOfferingsSection.tsx`
- `src/components/MembershipPlansSection.tsx`
- `src/components/TrainingOptionsSubSection.tsx` (P2 freelance mention)
- `src/pages/Contact.tsx`
- `src/components/LocalBusinessSchema.tsx`
- `public/sitemap.xml`

### Modify:
- `src/components/Hero.tsx` - PT-focused messaging
- `src/components/Header.tsx` - Navigation
- `src/components/Footer.tsx` - NAP update
- `src/components/WhoIsForSection.tsx` - Updated criteria
- `src/components/FinalCTA.tsx` - PT trial focus
- `src/pages/Index.tsx` - New section order
- `src/App.tsx` - Route updates
- `index.html` - SEO title

### Remove:
- `src/components/ProblemSection.tsx`
- `src/components/WhatWeDontDoSection.tsx`
- `src/components/WhatIsFisiqueSection.tsx`
- `src/components/TrainingOptionsSection.tsx`

