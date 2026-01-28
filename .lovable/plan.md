

## Fix AI Crawler Access Issues

### Problem Summary
Three issues are preventing AI crawlers (Perplexity, ChatGPT, Gemini) from properly indexing the site:

1. **Static files being intercepted** - `llms.txt` and `llms-full.txt` are returning Sedo parking pages instead of actual content
2. **Wrong domain in robots.txt** - Sitemap URL points to `fisique.fitness` instead of `fisiquefitness.com`
3. **Wrong domain in sitemap.xml** - All 22 URLs reference `fisique.fitness` instead of the live domain

---

### Step 1: Update robots.txt with correct domain

**File:** `public/robots.txt`

Change the sitemap reference from:
```
Sitemap: https://fisique.fitness/sitemap.xml
```
to:
```
Sitemap: https://fisiquefitness.com/sitemap.xml
```

---

### Step 2: Update sitemap.xml with correct domain

**File:** `public/sitemap.xml`

Replace all 22 instances of `https://fisique.fitness/` with `https://fisiquefitness.com/`

This includes:
- Homepage
- Kokapet Gym page
- Personal Training page
- Gym Membership page
- Blog listing and all 15 blog posts
- Contact page
- Legal page

---

### Step 3: Update llms.txt with correct domain

**File:** `public/llms.txt`

Update all URL references from `fisique.fitness` to `fisiquefitness.com`:
- Homepage link
- Kokapet Gym link
- Personal Training link
- Gym Membership link
- Blog link
- Contact link

---

### Step 4: Update llms-full.txt with correct domain

**File:** `public/llms-full.txt`

Update all URL references from `fisique.fitness` to `fisiquefitness.com` in:
- Website Structure section (6 main page URLs)
- Related Subdomains section (if applicable)

---

### Step 5: Republish and verify

After publishing:
1. Wait 5-10 minutes for CDN propagation
2. Test `https://fisiquefitness.com/llms.txt` directly in browser
3. Test with Perplexity by asking it to describe the site
4. If still showing Sedo, there may be DNS-level caching that needs 24-48 hours to clear

---

### Why This Should Fix It

The Sedo parking page appearing for `llms.txt` suggests the old domain (`fisique.fitness`) may still have some DNS routing issues. By ensuring all references use `fisiquefitness.com` consistently, AI crawlers will:
- Find the correct sitemap location
- Follow valid URLs that resolve to Lovable
- Access the AI-specific context files properly

