# Domain References - Fisique Fitness

> **Primary Domain**: `https://fisique.fitness`  
> **Redirect Domain**: `https://fisiquefitness.com` (redirects to primary)

This document lists **every location** where the domain is referenced for future audits.

---

## ✅ Migration Complete

All domain references have been updated from `fisiquefitness.com` to `fisique.fitness` on **January 28, 2026**.

---

## 📁 Static Files (Public Directory)

### `public/robots.txt`
- Line 18: `Sitemap: https://fisique.fitness/sitemap.xml`

### `public/sitemap.xml`
All 22 URLs use `https://fisique.fitness/...`

### `public/llms.txt`
Lines 37-42: All links use `https://fisique.fitness/...`

### `public/llms-full.txt`
Lines 119-124: All links use `https://fisique.fitness/...`

---

## 🧩 Schema Components

### `src/components/LocalBusinessSchema.tsx`
- `"@id": "https://fisique.fitness/#localbusiness"`
- `"url": "https://fisique.fitness"`
- `"image": "https://fisique.fitness/fisique-logo.webp"`

### `src/components/OrganizationSchema.tsx`
- `"@id": "https://fisique.fitness/#organization"`
- `"url": "https://fisique.fitness"`
- `"url": "https://fisique.fitness/fisique-logo.webp"`

### `src/components/WebSiteSchema.tsx`
- `"@id": "https://fisique.fitness/#website"`
- `"url": "https://fisique.fitness"`
- `"@id": "https://fisique.fitness/#organization"`

### `src/components/BlogPostSchema.tsx`
- `"@id": "https://fisique.fitness/blog/${slug}"`
- `"image": "https://fisique.fitness/fisique-logo.webp"`
- `"@id": "https://fisique.fitness/#organization"`
- `"url": "https://fisique.fitness/fisique-logo.webp"`
- `"@id": "https://fisique.fitness/#website"`

### `src/components/BlogListSchema.tsx`
- `"@id": "https://fisique.fitness/blog-posts/#webpage"`
- `"url": "https://fisique.fitness/blog-posts/"`
- `"@id": "https://fisique.fitness/#website"`
- `"@id": "https://fisique.fitness/blog/${post.slug}"`
- `"url": "https://fisique.fitness/blog/${post.slug}"`
- `"image": "https://fisique.fitness/fisique-logo.webp"`
- `"@id": "https://fisique.fitness/#organization"`

---

## 📄 Page Components

### `src/pages/Index.tsx`
- `<link rel="canonical" href="https://fisique.fitness/" />`
- `<meta property="og:url" content="https://fisique.fitness/" />`

### `src/pages/KokapetGym.tsx`
- `{ name: 'Home', url: 'https://fisique.fitness/' }`
- `<link rel="canonical" href="https://fisique.fitness/kokapet-gym" />`
- `<meta property="og:url" content="https://fisique.fitness/kokapet-gym" />`

### `src/pages/PersonalTrainingKokapet.tsx`
- `{ name: 'Home', url: 'https://fisique.fitness/' }`
- `<link rel="canonical" href="https://fisique.fitness/personal-training-kokapet" />`
- `<meta property="og:url" content="https://fisique.fitness/personal-training-kokapet" />`

### `src/pages/GymMembershipKokapet.tsx`
- `{ name: 'Home', url: 'https://fisique.fitness/' }`
- `<link rel="canonical" href="https://fisique.fitness/gym-membership-kokapet" />`
- `<meta property="og:url" content="https://fisique.fitness/gym-membership-kokapet" />`

### `src/pages/Contact.tsx`
- `{ name: 'Home', url: 'https://fisique.fitness/' }`
- `<link rel="canonical" href="https://fisique.fitness/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/" />`
- `<meta property="og:url" content="https://fisique.fitness/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/" />`

### `src/pages/Blog.tsx`
- `{ name: 'Home', url: 'https://fisique.fitness/' }`
- `<link rel="canonical" href="https://fisique.fitness/blog-posts/" />`
- `<meta property="og:url" content="https://fisique.fitness/blog-posts/" />`

### `src/pages/BlogPost.tsx`
- `{ name: 'Home', url: 'https://fisique.fitness/' }`
- `{ name: 'Blog', url: 'https://fisique.fitness/blog-posts/' }`
- `<link rel="canonical" href="https://fisique.fitness/blog/${slug}" />`
- `<meta property="og:url" content="https://fisique.fitness/blog/${slug}" />`

---

## 📊 Summary

| Category | File Count | Reference Count |
|----------|------------|-----------------|
| Static Files (public/) | 4 | ~30 |
| Schema Components | 5 | ~20 |
| Page Components | 7 | ~20 |
| **Total** | **16** | **~70** |

---

## ⚠️ Notes

1. **Email addresses** (`hello@fisique.fitness`, `smaran@fisique.fitness`) already use the `fisique.fitness` domain.
2. **Subdomain references** (`offers.fisique.fitness`, `member.fisique.fitness`) already use the correct domain.
3. **Google Maps links** don't contain the domain—no change needed.
4. **WhatsApp links** don't contain the domain—no change needed.

---

*Last updated: January 28, 2026*
