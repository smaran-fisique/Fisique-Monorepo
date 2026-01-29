
# Advanced SEO Admin Panel with Automated Updates

## Summary
Upgrade the SEO admin system with full admin controls for structured data, robots.txt, llms.txt, AND automated cron jobs that periodically regenerate dynamic content (sitemap, review counts in JSON-LD, etc.) to keep everything fresh without manual updates.

## Current State

| Component | Status | Update Method |
|-----------|--------|---------------|
| sitemap.xml | Static file | Manual edits |
| robots.txt | Static file | Manual edits |
| llms.txt / llms-full.txt | Static files | Manual edits |
| JSON-LD schemas | React components | Hardcoded values |
| Review count/rating | Hardcoded (91 reviews, 4.9★) | Manual updates |

**Problem**: When you publish a new blog post, the sitemap doesn't update. When you get new Google reviews, the schema still shows old counts.

---

## Solution Architecture

```text
+------------------+     +-------------------+     +------------------+
|   Admin Panel    |     |   Supabase DB     |     |   Edge Functions |
|   (Manual Edit)  | --> |   (Source of      | <-- |   (Cron Jobs)    |
|                  |     |    Truth)         |     |                  |
+------------------+     +-------------------+     +------------------+
                                |
                                v
                         +----------------+
                         |  Public Files  |
                         |  (Generated)   |
                         +----------------+
```

### How It Works
1. **Admin edits** SEO data in the admin panel (stored in database)
2. **Cron job runs** every 6 hours (or on-demand)
3. **Edge function generates** fresh sitemap.xml, llms.txt from database
4. **Files are served** to search engines and AI crawlers with latest data

---

## Database Changes

### 1. Extend `seo_meta` Table
Add columns for page-level controls:

| Column | Type | Purpose |
|--------|------|---------|
| `robots_directive` | text | "index, follow" or "noindex, nofollow" |
| `schema_type` | text | Page type for auto-schema (Article, FAQPage, etc.) |
| `priority` | numeric(2,1) | Sitemap priority (0.0 - 1.0) |
| `changefreq` | text | Sitemap changefreq (daily, weekly, monthly) |
| `include_in_sitemap` | boolean | Toggle on/off from sitemap |

### 2. Create `site_files` Table
Store generated/editable global files:

| Column | Type | Purpose |
|--------|------|---------|
| `id` | uuid | Primary key |
| `file_key` | text | 'robots_txt', 'llms_txt', 'llms_full_txt', 'sitemap_xml' |
| `content` | text | File contents (can be edited in admin or auto-generated) |
| `auto_generate` | boolean | If true, cron job regenerates; if false, manual only |
| `last_generated` | timestamp | When last auto-generated |
| `updated_at` | timestamp | Last update time |
| `updated_by` | uuid | Who made last manual edit |

---

## Edge Functions for Automation

### 1. `generate-sitemap` (Cron: Every 6 hours)
Auto-generates sitemap.xml from:
- All pages in `seo_meta` table where `include_in_sitemap = true`
- All published blog posts from `blog_posts` table
- Static pages with their priorities and changefreq

```text
Output: Fresh sitemap.xml stored in site_files table
```

### 2. `generate-llms-txt` (Cron: Daily)
Auto-generates llms.txt and llms-full.txt from:
- Business info from `site_settings` table
- FAQ content from database
- Service descriptions
- Latest blog post titles

```text
Output: Updated llms.txt and llms-full.txt in site_files table
```

### 3. `sync-review-stats` (Cron: Daily)
Fetches latest Google review count/rating and updates:
- `site_settings` table with current stats
- These values are then used in JSON-LD schemas

```text
Output: Updated review_count and avg_rating in site_settings
```

### 4. `serve-seo-file` (Public endpoint)
Serves dynamic files based on request:
- GET `/api/sitemap.xml` - returns latest sitemap
- GET `/api/llms.txt` - returns latest llms.txt
- GET `/api/llms-full.txt` - returns latest llms-full.txt

This allows robots.txt to point to dynamic sitemap URL.

---

## Admin UI Changes

### Phase 1: Enhanced SEO Page
Add to existing SEO form:

**New Fields:**
- Robots Directive dropdown (index/noindex + follow/nofollow)
- Sitemap Priority slider (0.0 - 1.0)
- Change Frequency dropdown (always, hourly, daily, weekly, monthly, yearly, never)
- Include in Sitemap toggle

**New Tab: "Schema Preview"**
- Shows generated JSON-LD for the page
- Links to Google Rich Results Test

### Phase 2: Global SEO Page (New)
New admin page at `/admin/global-seo`:

**Sections:**

1. **Sitemap Manager**
   - View all URLs currently in sitemap
   - Toggle pages on/off
   - See last generation time
   - "Regenerate Now" button

2. **Robots.txt Editor**
   - Code editor with syntax highlighting
   - Toggle auto-generate on/off
   - Preview mode
   - "Save & Apply" button

3. **LLMs.txt Editor**
   - Markdown editor with preview
   - Toggle auto-generate on/off
   - Edit llms.txt and llms-full.txt tabs

4. **Schema Settings**
   - Edit global Organization schema values
   - Update review count/rating manually
   - "Sync from Google" button

---

## Dynamic JSON-LD Updates

### Current Problem
The LocalBusinessSchema has hardcoded values:
```javascript
"aggregateRating": {
  "ratingValue": "4.9",  // Hardcoded!
  "reviewCount": "91",    // Hardcoded!
}
```

### Solution
Create a hook that fetches live stats:

```text
useSiteStats() hook
- Fetches review_count, avg_rating from site_settings
- Updates automatically when cron syncs new values
- Used by LocalBusinessSchema component
```

**Updated Schema Flow:**
1. Cron job syncs Google review stats daily
2. Stats stored in `site_settings` table
3. `useSiteStats` hook fetches on page load
4. JSON-LD renders with live data

---

## Cron Schedule Summary

| Job | Frequency | What It Updates |
|-----|-----------|-----------------|
| `generate-sitemap` | Every 6 hours | sitemap.xml with new blog posts, pages |
| `generate-llms-txt` | Daily | llms.txt and llms-full.txt |
| `sync-review-stats` | Daily | Review count and rating in schemas |

---

## File Serving Strategy

### Option A: Edge Function Serving (Recommended)
- Create public edge function endpoints
- Update robots.txt to point to: `Sitemap: https://fisique.fitness/api/sitemap.xml`
- Edge function reads from `site_files` table and serves

**Pros:** Always fresh, no file deployment needed
**Cons:** Slight latency vs static file

### Option B: Static File with Webhook
- Keep files in `/public` folder
- Cron job generates content and triggers Lovable rebuild
- Files deployed as static assets

**Pros:** Fastest serving
**Cons:** Requires deployment trigger

**Recommendation:** Option A - Edge function serving is simpler and files update instantly.

---

## Implementation Order

### Phase 1: Database & Core (Day 1)
1. Add columns to `seo_meta` table
2. Create `site_files` table
3. Create `generate-sitemap` edge function
4. Create `serve-seo-file` edge function

### Phase 2: Admin UI (Day 1-2)
5. Add sitemap fields to SEO form
6. Create Global SEO admin page
7. Add sitemap viewer with toggle controls

### Phase 3: Cron Jobs (Day 2)
8. Set up pg_cron for sitemap generation
9. Create `sync-review-stats` function
10. Create `generate-llms-txt` function

### Phase 4: Dynamic Schemas (Day 2-3)
11. Create `useSiteStats` hook
12. Update LocalBusinessSchema to use live data
13. Add schema preview to admin

---

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `supabase/functions/generate-sitemap/index.ts` | Create | Auto-generate sitemap |
| `supabase/functions/generate-llms-txt/index.ts` | Create | Auto-generate llms files |
| `supabase/functions/sync-review-stats/index.ts` | Create | Sync Google review stats |
| `supabase/functions/serve-seo-file/index.ts` | Create | Serve dynamic files |
| `src/pages/admin/SEO.tsx` | Modify | Add sitemap controls |
| `src/pages/admin/GlobalSEO.tsx` | Create | New admin page |
| `src/hooks/useSiteStats.tsx` | Create | Fetch live stats |
| `src/components/LocalBusinessSchema.tsx` | Modify | Use dynamic stats |
| `src/layouts/AdminLayout.tsx` | Modify | Add nav item |
| Database migration | Create | Add tables and columns |

---

## Expected Outcomes

After implementation:

| Before | After |
|--------|-------|
| Manual sitemap updates | Auto-updates every 6 hours |
| Hardcoded review counts | Live sync from Google daily |
| Static llms.txt | Auto-regenerated with new content |
| No admin control for robots | Full robots.txt editor |
| No sitemap visibility | Full sitemap management UI |
| Manual schema updates | Dynamic JSON-LD from database |

---

## Technical Notes

### Cron Job Setup
Using Supabase pg_cron + pg_net:
- pg_cron schedules the job
- pg_net makes HTTP call to edge function
- Edge function generates content and stores in database

### File Serving
The `serve-seo-file` function will:
1. Check `file_key` parameter
2. Fetch content from `site_files` table
3. Return with appropriate Content-Type header
4. Cache for 1 hour (CDN-friendly)

### Fallback Strategy
If database is unavailable:
- Keep current static files as fallback
- Edge function returns static content if DB query fails

This gives you a fully automated, admin-controllable SEO system that keeps everything fresh without manual intervention.
