# Fisique Fitness — SEO Action Plan

**Generated:** 2026-04-11 | **Current Score:** 42/100 | **Target:** 74/100+

---

## 🔴 Immediate (Before Next.js Deploys)

### 1. Replace the OG social image
**File:** `apps/web/lib/seo.ts` → `buildMetadata()` — update `openGraph.images` URL  
**Why:** Current `og:image` is on `storage.googleapis.com/gpt-engineer-file-uploads/` (Lovable's CDN). Will 404 after migration.  
**Do:** Copy the social image to `apps/web/public/social-og.jpg` and reference it as `https://fisique.fitness/social-og.jpg`

### 2. Push the updated llms.txt and robots.txt
**Why:** Fixed locally (correct URLs, proper links) but not deployed yet.  
**Do:** `git push` — they're already committed.

---

## 🟠 Quick Wins (Same Week as Deploy)

### 3. Add security headers
**File:** `apps/web/next.config.mjs`

```js
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=()',
        },
        {
          key: 'Content-Security-Policy',
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.clarity.ms",
            "img-src 'self' data: https:",
            "connect-src 'self' https://*.supabase.co",
            "style-src 'self' 'unsafe-inline'",
            "font-src 'self'",
          ].join('; '),
        },
      ],
    },
  ];
},
```

### 4. Add og:url to every page
**File:** `apps/web/lib/seo.ts` → `buildMetadata()`

```ts
openGraph: {
  url: `https://fisique.fitness${fallback.path}`,
  siteName: 'Fisique Fitness',
  ...
},
```

### 5. Shorten the homepage og:title
**File:** `apps/web/app/page.tsx` → `generateMetadata`  
Change: `'Fisique Fitness - Best Gym in Kokapet | Personal Training Hyderabad'` (67 chars)  
To: `'Best Gym in Kokapet | Fisique Fitness'` (38 chars)

### 6. Add explicit AI crawler rules to robots.txt
**File:** `apps/web/public/robots.txt` — append:

```
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: anthropic-ai
Allow: /
```

---

## 🟡 Strategic (Within 1 Month, Post-Deploy)

### 7. Add contextual in-body links on location pages
Every `gym-*` page should include 2–3 contextual links to related pages in its body content.  
Example — in `/gym-narsingi` page content: link to `/kokapet-gym` and `/personal-training-kokapet`.

### 8. Add Person schema for trainers
Add `Person` JSON-LD to the homepage and/or a team page to signal E-E-A-T.

### 9. Run full post-deploy audit
After SSR is live:
```
seo technical https://fisique.fitness        # Core Web Vitals
seo schema https://fisique.fitness/kokapet-gym  # Validate LocalBusiness JSON-LD
seo content https://fisique.fitness/blog     # E-E-A-T on blog
seo links https://fisique.fitness            # Backlink profile
seo geo https://fisique.fitness              # AI search readiness re-check
```

---

## Score Projection

| Action | Points gained |
|--------|--------------|
| Deploy Next.js (SSR, schema, sitemap, canonicals) | +25 |
| Fix OG image URL | +3 |
| Push llms.txt/robots.txt updates | +3 |
| Security headers | +4 |
| og:url + og:title fix | +2 |
| AI crawler explicit rules | +1 |
| **Total** | **+38 → ~80/100** |
