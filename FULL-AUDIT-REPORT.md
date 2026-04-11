# Fisique Fitness — Full SEO Audit Report

**Scope:** full-site  
**Audited URL:** https://fisique.fitness  
**Date:** 2026-04-11  
**Auditor:** Claude Code + Agentic-SEO-Skill  

> **Context:** The current live site is the Lovable-hosted Vite + React SPA. The Next.js 14 App Router migration is complete locally but **not yet deployed**. Most Critical findings below are resolved by the migration — this audit establishes the baseline and surfaces what still needs fixing post-deploy.

---

## A) Audit Summary

### Overall SEO Health Score: **42/100** (Current Live Site)
**Score confidence: Medium** — scripts confirmed technical signals; content signals partially estimated due to client-side rendering.

### Top 3 Issues

1. **Client-side rendering** — crawlers receive a 69-word HTML shell; zero body content, zero schema, zero images visible to Google
2. **No canonical tags** — no `<link rel="canonical">` on any page, risking duplicate content penalties across 16+ nearly identical SPA pages
3. **OG image on Lovable's storage** — `og:image` hosted at `storage.googleapis.com/gpt-engineer-file-uploads/...` — will break when Lovable hosting is discontinued

### Top 3 Opportunities

1. **Next.js SSR deploy** — fixes client-side rendering, schema, canonicals, and sitemap in one step
2. **Security headers** — 3 missing headers (CSP, X-Frame-Options, Permissions-Policy) fixable in `next.config.mjs` in minutes
3. **llms.txt links** — the updated local llms.txt has 21 annotated links but the live file scores 70/100 because no links exist in the deployed version — deploy resolves this

---

## B) Findings Table

### Technical SEO

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| Rendering | **Critical** | Confirmed | Entire site is client-side rendered — crawlers get a 69-word HTML shell | `parse_html.py`: `word_count: 85`, `schema: []`, `images: []` | Deploy Next.js SSR (in progress) |
| Canonical | **Critical** | Confirmed | No canonical tag on homepage or any page | `parse_html.py`: `canonical: null` | Add `canonical` in `generateMetadata` per page |
| Sitemap | **Critical** | Confirmed | Sitemap points to Lovable's Supabase edge function | `robots_checker.py`: `cwzeymrokgsvwytkrhim.supabase.co/functions/v1/sitemap` | Deploy `app/sitemap.ts` → serves at `/sitemap.xml` |
| Schema | **Critical** | Confirmed | Zero JSON-LD in crawlable HTML | `parse_html.py`: `schema: []` | Deploy Next.js — RSC schema components render server-side |
| Redirects | **Pass** | Confirmed | Clean single hop, 742ms TTFB | `redirect_checker.py`: 0 hops, HTTP 200 | — |
| HTTPS | **Pass** | Confirmed | HSTS enabled with `includeSubDomains`, 1-year max-age | `security_headers.py`: ✅ HSTS | — |

### Security Headers

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| CSP | **Warning** | Confirmed | Content-Security-Policy header missing | `security_headers.py`: ❌ CSP absent | Add to `next.config.mjs` `headers()` |
| X-Frame-Options | **Warning** | Confirmed | Missing clickjacking protection | `security_headers.py`: ❌ X-Frame-Options absent | Add `X-Frame-Options: SAMEORIGIN` in `headers()` |
| Permissions-Policy | **Warning** | Confirmed | No browser feature restrictions declared | `security_headers.py`: ❌ Permissions-Policy absent | Add `Permissions-Policy: camera=(), microphone=(), geolocation=()` |
| Security score | — | Confirmed | 65/100 — 3 of 6 baseline headers missing | Script output | See fixes above |

### On-Page Metadata

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| Title | **Pass** | Confirmed | Title present, keyword-rich | `"Fisique Fitness - Best Gym in Kokapet \| Personal Training Hyderabad"` | — |
| Meta description | **Pass** | Confirmed | 157 chars, within range, compelling | `parse_html.py` meta_description confirmed | — |
| H1 | **Pass** | Confirmed | One H1, matches title intent | `"Fisique Fitness - Premium Personal Training Gym in Kokapet, Hyderabad"` | — |
| H2 structure | **Warning** | Confirmed | Only 3 generic H2s (`Our Services`, `Locations We Serve`, `More`) — thin for a 16-page site | `parse_html.py` h2 array | Post-SSR: add descriptive H2s in location/service page content |
| og:url | **Warning** | Confirmed | Required OG tag missing | `social_meta.py`: `🔴 og:url: missing` | Add in `generateMetadata` for each page |
| og:title length | **Warning** | Confirmed | 67 chars — exceeds Facebook's 60-char truncation threshold | `social_meta.py`: `⚠️ og:title is too long` | Shorten to ≤60 chars in metadata |
| OG image source | **Critical** | Confirmed | `og:image` hosted at Lovable's `storage.googleapis.com/gpt-engineer-file-uploads/` — will return 404 post-migration | `parse_html.py` og:image URL | Move social image to Supabase storage or `/public/` and update `generateMetadata` |

### Content & E-E-A-T

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| Word count | **Critical** | Confirmed | 69 words in crawlable HTML — classified as thin content | `readability.py`: `word_count: 69` | Deploy Next.js — RSC renders full content server-side |
| Readability | **Warning** | Confirmed | Flesch score 0, Grade 19.5 — but this reflects the SPA shell, not actual page content | `readability.py` output (SPA shell only) | Re-run post-SSR deployment for accurate score |
| Internal linking | **Warning** | Confirmed | All 17 pages share identical 16-link navigation — zero contextual cross-links | `internal_links.py`: `avg=16.0`, all anchor texts identical × 17 | Add contextual in-body links between related pages (e.g., `/kokapet-gym` → `/personal-training-kokapet`) |
| E-E-A-T signals | **Hypothesis** | Likely | Team credentials, certifications, and review schema not crawlable | Schema empty, content not in static HTML | Deploy SSR; add `Person` schema for trainers |

### AI Search Readiness

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| llms.txt | **Warning** | Confirmed | Live `llms.txt` scores 70/100 — present but has zero links | `llms_txt_checker.py`: `Links: 0`, `Quality Score: 70/100` | Deploy updated `llms.txt` (links added locally, push needed) |
| llms-full.txt | **Pass** | Confirmed | Present, HTTP 200 | `llms_txt_checker.py`: ✅ Found | — |
| AI crawlers | **Warning** | Confirmed | 11 AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) inherit `*` rule — not explicitly managed | `robots_checker.py`: all ⚠️ | Add explicit `Allow: /` per crawler in `robots.txt` (you want them crawling) |

### Performance

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| Core Web Vitals | **Unknown** | — | PageSpeed API rate-limited during audit — no CWV data collected | Rate limit error | Run `seo technical https://fisique.fitness` in a new session, or add a free PageSpeed API key |
| TTFB | **Info** | Confirmed | 742ms initial response — acceptable for SPA shell | `redirect_checker.py` timing | Post-SSR: target <200ms TTFB on static location pages (ISR) |

---

## C) Prioritized Action Plan

### Immediate (Before / During Deploy)

1. **[CRITICAL] Deploy Next.js to production** — resolves client-side rendering, missing schema, thin content, and sitemap in one step. All other fixes depend on this.

2. **[CRITICAL] Replace OG social image URL** — move the social image from Lovable's Google Cloud Storage to either:
   - `/public/social-og.jpg` (served from your own CDN)
   - Supabase Storage (`storage.v1.object.public/...`)
   
   Then update `buildMetadata()` in `lib/seo.ts` to use the new URL.

3. **[CRITICAL] Deploy updated `llms.txt` and `robots.txt`** — both files are fixed locally but not pushed. A `git push` deploys them.

### Quick Wins (Post-Deploy, Same Week)

4. **[WARNING] Add security headers in `next.config.mjs`:**
   ```js
   async headers() {
     return [{
       source: '/(.*)',
       headers: [
         { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
         { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
         { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms; img-src 'self' data: https:; connect-src 'self' https://*.supabase.co;" },
       ],
     }];
   }
   ```

5. **[WARNING] Add `og:url` to `buildMetadata()` in `lib/seo.ts`:**
   ```ts
   openGraph: {
     url: `https://fisique.fitness${fallback.path}`,
     ...
   }
   ```

6. **[WARNING] Shorten homepage `og:title`** — from 67 to ≤60 chars. Current: `"Fisique Fitness - Best Gym in Kokapet | Personal Training Hyderabad"`. Suggested: `"Best Gym in Kokapet | Fisique Fitness"` (38 chars).

7. **[WARNING] Explicit AI crawler rules in `robots.txt`** — add after existing `Allow` blocks:
   ```
   User-agent: GPTBot
   Allow: /
   
   User-agent: ClaudeBot
   Allow: /
   
   User-agent: PerplexityBot
   Allow: /
   
   User-agent: Google-Extended
   Allow: /
   ```

### Strategic (Within 1 Month)

8. **[WARNING] Add contextual in-body links** — every location page should link to 2–3 related pages (e.g., `/gym-narsingi` → `/personal-training-kokapet`, `/gym-narsingi` → `/kokapet-gym`). This distributes PageRank and signals topical depth.

9. **[WARNING] Add `Person` schema for trainers** — E-E-A-T requires demonstrable expertise. Add `Person` JSON-LD on the about/team section with credentials.

10. **Run CWV audit post-deploy** — once SSR is live, run `seo technical https://fisique.fitness` to get real Core Web Vitals. Target LCP <2.5s, CLS <0.1, INP <200ms on location pages.

---

## D) Unknowns and Follow-ups

| Unknown | How to resolve |
|---------|---------------|
| Core Web Vitals (LCP, INP, CLS) | Run `seo technical` after PageSpeed rate limit clears (wait 15 min or add free API key) |
| Real readability score | Re-run `readability.py` against SSR-rendered HTML post-deploy |
| Backlink profile | Run `seo links https://fisique.fitness` for external backlink analysis |
| Blog page SEO | Run `seo content https://fisique.fitness/blog` post-deploy |
| Location page schema validation | Run `seo schema https://fisique.fitness/kokapet-gym` post-deploy to verify LocalBusiness JSON-LD renders server-side |

---

## Projected Post-Deploy Score: ~74/100

| Category | Current | Post-Deploy (estimated) |
|----------|---------|------------------------|
| Technical SEO | ~25/100 | ~80/100 |
| Content Quality | ~10/100 | ~70/100 |
| On-Page SEO | ~60/100 | ~75/100 |
| Schema | 0/100 | ~85/100 |
| Performance | Unknown | TBD (run post-deploy) |
| AI Search Readiness | ~65/100 | ~90/100 |
| **Overall** | **~42/100** | **~74/100** |
