

# Updated Plan: Routing Approach for SSR/Prerender

## The Constraint

Lovable hosting serves the **same `index.html`** for every route. There's no server-side routing layer where we can intercept bot requests and serve different HTML. We can't add nginx rules, Cloudflare Workers, or a reverse proxy.

## What Actually Works on Lovable

**Google already renders your JS.** The real issues are:
1. **Slow discovery** -- Google's JS renderer queues pages, so new/poorly-linked pages take weeks to get indexed (why Narsingi isn't showing up)
2. **Missing content in initial HTML** -- all routes serve the same `index.html` with homepage meta tags, so crawlers that don't render JS (Bing, social previews, AI crawlers) see wrong metadata

## The Approach: Maximize What We Control

### A. Rich `index.html` with Noscript Fallback
Add a `<noscript>` block to `index.html` containing a **full site navigation with all links** and core business info. This ensures even non-JS crawlers discover all pages and follow internal links.

```text
<noscript>
  <h1>Fisique Fitness - Premium Gym in Kokapet, Hyderabad</h1>
  <nav>
    <a href="/kokapet-gym">Kokapet Gym</a>
    <a href="/gym-narsingi">Gym Near Narsingi</a>
    <a href="/gym-gachibowli">Gym Near Gachibowli</a>
    ... all location + service pages ...
  </nav>
  <p>Address, phone, description...</p>
</noscript>
```

### B. React Helmet for Per-Page Meta
Already in place -- `react-helmet-async` updates `<title>`, `<meta>`, OG tags, and canonicals per route. Google's renderer picks these up. No change needed here.

### C. Aggressive Internal Linking (the real fix)
The **hub-and-spoke `NearbyLocationsSection`** and **footer locations column** are the most impactful moves. Google discovers pages through links. If every page links to every other page, crawl coverage goes from partial to complete within 1-2 crawl cycles.

### D. Sitemap as Discovery Backbone
Your sitemap edge function already works. Adding the 5 new pages to it tells Google these URLs exist. Combined with internal links, this gets them crawled and indexed fast.

### E. `llms.txt` for AI Crawlers
Already in place. Update it to include all new location pages so AI crawlers (ChatGPT, Perplexity, etc.) discover them.

## What This Means for the Plan

**No prerender edge function needed.** It would require a routing layer we don't control. Instead, the plan focuses on:

1. **5 new location pages** (Gachibowli, Gandipet, Manikonda, Puppalaguda, Tellapur)
2. **`NearbyLocationsSection` component** on all 13+ pages (hub-and-spoke cross-links)
3. **Footer "Locations We Serve" column** (sitewide internal links)
4. **Enriched `index.html` noscript block** (full navigation for non-JS crawlers)
5. **Schema expansion** (`areaServed` in LocalBusinessSchema)
6. **SEO meta + sitemap updates** (5 new `seo_meta` rows, update `generate-sitemap` and `sitemap` functions)
7. **Updated `llms.txt`** with all new pages
8. **Routes in `App.tsx`** (5 new lazy-loaded routes)

### Files Created (6)
- `src/pages/GymGachibowli.tsx`
- `src/pages/GymGandipet.tsx`
- `src/pages/GymManikonda.tsx`
- `src/pages/GymPuppalaguda.tsx`
- `src/pages/GymTellapur.tsx`
- `src/components/NearbyLocationsSection.tsx`

### Files Modified (17+)
- `index.html` -- noscript navigation block
- `src/App.tsx` -- 5 new routes
- `src/components/Footer.tsx` -- 4th column with locations
- `src/components/LocalBusinessSchema.tsx` -- expanded `areaServed`
- `supabase/functions/sitemap/index.ts` -- 5 new static pages
- `supabase/functions/generate-sitemap/index.ts` -- 5 new static pages
- `public/llms.txt` and `public/llms-full.txt` -- new pages listed
- All 10+ existing location/service pages -- add `NearbyLocationsSection`

### Database
- 1 migration: insert 5 `seo_meta` rows

