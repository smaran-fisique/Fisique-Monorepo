

# Move Offers from Subdomain to Subdirectory

## Overview

This plan migrates the offers landing page system from `offers.fisique.fitness` subdomain to `fisique.fitness/offers` subdirectory for better SEO consolidation. This follows Google's recommendation that subdirectories pass more SEO authority than subdomains.

---

## Current State

**Subdomain Site (offers.fisique.fitness/drawfis repo):**
- Single offer page at `/iphone` → displays iPhone draw promotion
- Uses animated iPhone mockup with scroll-triggered sections
- Features countdown timer (Feb 28, 2026 deadline)
- Sticky CTA button linking to WhatsApp
- Has analytics tracking for section views and CTA clicks

**Main Site (this project):**
- Already has `offers` table in database
- Has admin panel to manage offers at `/admin/offers`
- Has `OfferBanner` component (top-of-page promotional banner)
- Missing: dedicated offer landing pages at `/offers/*`

---

## What We're Building

| Route | Purpose |
|-------|---------|
| `/offers` | Offers listing page (future-proofed for multiple offers) |
| `/offers/iphone` | iPhone draw landing page (replicated from subdomain) |

---

## Implementation Steps

### Phase 1: Dependencies & Configuration

1. **Install framer-motion** (required for AnimatedSection component)
2. **Add Fisique brand colors to Tailwind config**
   - `fisique-dark`: Used for dark backgrounds in offer pages

### Phase 2: Create Offer Components

Create 5 new components in `src/components/offers/`:

| Component | Description |
|-----------|-------------|
| `AnimatedIPhone.tsx` | 3D iPhone mockup with scroll-based transforms |
| `AnimatedSection.tsx` | Fade-in section wrapper using framer-motion |
| `CountdownTimer.tsx` | Live countdown to Feb 28, 2026 |
| `StickyCTA.tsx` | Mobile sticky bottom CTA button |
| `OfferAnalytics.ts` | GA4 event tracking for offers |

### Phase 3: Create Offer Pages

1. **`src/pages/offers/OffersIndex.tsx`**
   - Lists all active offers with cards
   - Links to individual offer pages
   - SEO-optimized with proper meta tags

2. **`src/pages/offers/IPhoneOffer.tsx`**
   - Full replication of offers.fisique.fitness/iphone
   - 5-section scroll experience:
     - Hero: "3 Months with Fisique" headline
     - How It Works: 3-step process
     - The Reframe: "Not about the iPhone" messaging
     - Scarcity: Countdown timer
     - Loss Aversion: "What happens if you leave"
   - WhatsApp CTA: `https://bit.ly/wa-offer-fisique`
   - Responsive: iPhone mockup visible on desktop, content scrolls inside phone on mobile

### Phase 4: Routing & SEO

1. **Update `src/App.tsx`**
   - Add route `/offers` → OffersIndex
   - Add route `/offers/iphone` → IPhoneOffer
   - Add route `/offers/:slug` (dynamic, future-proofed)

2. **Update `public/sitemap.xml`**
   - Add `/offers` and `/offers/iphone` URLs

3. **Update navigation**
   - Change "Offers" link in Header from `offers.fisique.fitness` to `/offers`
   - Update Footer if it links to offers subdomain

4. **Add JSON-LD Schema**
   - `OfferSchema` component for structured data
   - Links offer to main organization

### Phase 5: Redirects (Post-deployment)

Configure 301 redirects at DNS/CDN level:
- `offers.fisique.fitness/iphone` → `fisique.fitness/offers/iphone`
- `offers.fisique.fitness/*` → `fisique.fitness/offers`

---

## Files to Create

```text
src/
├── components/
│   └── offers/
│       ├── AnimatedIPhone.tsx
│       ├── AnimatedSection.tsx
│       ├── CountdownTimer.tsx
│       ├── StickyCTA.tsx
│       └── OfferAnalytics.ts
├── pages/
│   └── offers/
│       ├── OffersIndex.tsx
│       └── IPhoneOffer.tsx
```

## Files to Modify

| File | Changes |
|------|---------|
| `package.json` | Add framer-motion dependency |
| `tailwind.config.ts` | Add fisique-dark color |
| `src/index.css` | Add fisique CSS variables and glow animation |
| `src/App.tsx` | Add /offers routes |
| `public/sitemap.xml` | Add new URLs |
| `src/components/Header.tsx` | Update Offers nav link |

---

## Technical Considerations

### CSS Additions Needed

Add to index.css:
```css
--fisique-dark: 220 14% 6%;  /* Very dark background for offers */

@keyframes glow-pulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

@keyframes scroll-indicator {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(6px); }
}
```

### Animations

The offer page uses these animation patterns:
- Scroll-snap sections for mobile
- CSS 3D transforms for iPhone mockup (desktop)
- Framer Motion for section fade-ins

### Analytics Integration

Reuse existing Google Analytics setup. Events tracked:
- `section_view`: When user scrolls to new section
- `cta_click`: When user clicks any CTA button
- `scroll_milestone`: At 25%, 50%, 75%, 100% scroll depth

---

## SEO Benefits

1. **Domain Authority Consolidation**
   - All link equity flows to fisique.fitness
   - No split signals between subdomain and main site

2. **Internal Linking**
   - Offers pages can link to gym/PT pages
   - Main site can naturally link to offers

3. **Crawl Efficiency**
   - Single robots.txt for all content
   - Unified sitemap

4. **Schema Markup**
   - Offers linked to main LocalBusiness entity
   - Better rich snippet eligibility

---

## After Implementation

1. Submit updated sitemap to Google Search Console
2. Request indexing for new /offers pages
3. Monitor 301 redirects from subdomain
4. Decommission subdomain after 3-6 months of stable redirects

