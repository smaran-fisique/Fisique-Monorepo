

## Dynamic Sitemap Edge Function

Create a new edge function that generates the sitemap XML in real-time when `/sitemap.xml` is requested, ensuring Google always gets the most up-to-date content.

---

### Current Problem

| Issue | Impact |
|-------|--------|
| Static `public/sitemap.xml` is outdated | Missing newest blog post and some pages |
| Two-step process (generate → store → serve) | Adds latency and stale data risk |
| Static file takes priority over edge function | Google crawls the old static file |

---

### Solution Architecture

Create a single edge function `sitemap` that:
1. Generates the complete sitemap XML on-the-fly
2. Returns valid XML with proper headers
3. Includes all static pages, SEO meta pages, and blog posts
4. Has built-in caching headers for performance

```text
Request: /sitemap.xml
         ↓
    Edge Function (sitemap)
         ↓
    ┌────────────────────────────────────┐
    │ 1. Define static pages             │
    │ 2. Query seo_meta table            │
    │ 3. Query published blog_posts      │
    │ 4. Build XML dynamically           │
    │ 5. Return with XML headers         │
    └────────────────────────────────────┘
         ↓
    XML Response (with 1-hour cache)
```

---

### Implementation Details

#### 1. New Edge Function: `supabase/functions/sitemap/index.ts`

A single function that generates and returns the sitemap XML directly:

```typescript
// Key features:
- Returns XML directly (not JSON)
- Content-Type: application/xml
- Cache-Control: public, max-age=3600 (1 hour)
- Includes all routes from App.tsx
- Queries blog_posts for dynamic content
- Queries seo_meta for custom pages
```

**Static Pages to Include:**
- `/` (priority 1.0)
- `/blog` (priority 0.9)
- `/kokapet-gym` (priority 0.9)
- `/personal-training-kokapet` (priority 0.9)
- `/gym-membership-kokapet` (priority 0.9)
- `/gym-financial-district` (priority 0.8)
- `/gym-narsingi` (priority 0.8)
- `/freelance-trainer-kokapet` (priority 0.7)
- `/freelance-trainer-narsingi` (priority 0.7)
- `/freelance-trainer-financial-district` (priority 0.7)
- `/offers` (priority 0.7)
- `/offers/iphone` (priority 0.7)
- `/contact` and `/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey` (priority 0.6)
- `/legal`, `/terms`, `/privacy`, `/refund`, `/shipping` (priority 0.3)

**Dynamic Content:**
- All published blog posts from `blog_posts` table
- Custom pages from `seo_meta` where `include_in_sitemap = true`

#### 2. Delete Static File

Remove `public/sitemap.xml` so the edge function takes over.

#### 3. Update robots.txt

Point to the edge function URL:
```text
Sitemap: https://cwzeymrokgsvwytkrhim.supabase.co/functions/v1/sitemap
```

#### 4. Configuration

Add to `supabase/config.toml`:
```toml
[functions.sitemap]
verify_jwt = false
```

---

### Edge Function Response Headers

The function will return proper headers for Google compatibility:

```typescript
return new Response(sitemapXml, {
  headers: {
    'Content-Type': 'application/xml; charset=utf-8',
    'Cache-Control': 'public, max-age=3600', // 1 hour
    'X-Robots-Tag': 'noindex', // Sitemap itself shouldn't be indexed
  },
});
```

---

### Files to Create/Modify

| File | Action |
|------|--------|
| `supabase/functions/sitemap/index.ts` | **Create** - New edge function |
| `supabase/config.toml` | **Modify** - Add sitemap function config |
| `public/sitemap.xml` | **Delete** - Remove static file |
| `public/robots.txt` | **Modify** - Update sitemap URL |

---

### Technical Notes

**Why this approach works:**
- Edge functions are industry-standard for dynamic sitemaps
- Google fully supports dynamically generated sitemaps
- 1-hour cache reduces database load while keeping content fresh
- Single function is simpler than generate + store + serve pattern

**Performance:**
- Cold start: ~50-100ms
- Warm response: ~20-50ms
- Database queries: 2 simple SELECT statements
- Total response time: Under 200ms typical

**Reliability:**
- Fallback content if database fails
- Proper error handling with 500 status
- CORS headers for debugging

