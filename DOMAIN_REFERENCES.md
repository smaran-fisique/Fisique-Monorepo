# Domain References - Fisique Fitness

> **Current Domain**: `https://fisiquefitness.com`  
> **Future Domain**: `https://fisique.fitness`

This document lists **every location** where the domain is referenced. When migrating to the production domain, replace all instances of `fisiquefitness.com` with `fisique.fitness`.

---

## 📁 Static Files (Public Directory)

### `public/robots.txt`
- Line 18: `Sitemap: https://fisiquefitness.com/sitemap.xml`

### `public/sitemap.xml`
All 22 URLs need updating:
- Line 5: `<loc>https://fisiquefitness.com/</loc>`
- Line 11: `<loc>https://fisiquefitness.com/kokapet-gym</loc>`
- Line 17: `<loc>https://fisiquefitness.com/personal-training-kokapet</loc>`
- Line 23: `<loc>https://fisiquefitness.com/gym-membership-kokapet</loc>`
- Line 29: `<loc>https://fisiquefitness.com/blog-posts/</loc>`
- Line 35: `<loc>https://fisiquefitness.com/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/</loc>`
- Line 43: `<loc>https://fisiquefitness.com/blog/treadmill-weight-loss-sculpt-body-boost-health</loc>`
- Line 49: `<loc>https://fisiquefitness.com/blog/obesity-long-term-impact-syndrome-x-fisique-fitness</loc>`
- Line 55: `<loc>https://fisiquefitness.com/blog/elite-personal-training-kokapet-narsingi</loc>`
- Line 61: `<loc>https://fisiquefitness.com/blog/fisique-fitness-kokapet-redefining-elite-personal-training</loc>`
- Line 67: `<loc>https://fisiquefitness.com/blog/why-weight-returns-after-stopping-workouts</loc>`
- Line 73: `<loc>https://fisiquefitness.com/blog/protein-shakes-essential-fuel-fitness-journey</loc>`
- Line 79: `<loc>https://fisiquefitness.com/blog/decoding-weight-loss-70-diet-30-exercise</loc>`
- Line 85: `<loc>https://fisiquefitness.com/blog/gym-proximity-location-fitness-success</loc>`
- Line 91: `<loc>https://fisiquefitness.com/blog/personal-training-kokapet-sauna-nutrition</loc>`
- Line 97: `<loc>https://fisiquefitness.com/blog/strength-training-beginners-kokapet</loc>`
- Line 103: `<loc>https://fisiquefitness.com/blog/first-personal-training-session-kokapet</loc>`
- Line 109: `<loc>https://fisiquefitness.com/blog/the-role-of-sauna-therapy-in-fitness-recovery</loc>`
- Line 115: `<loc>https://fisiquefitness.com/blog/personalized-diet-counseling-kokapet</loc>`
- Line 121: `<loc>https://fisiquefitness.com/blog/kokapet-premium-lifestyle-fitness-fisique</loc>`
- Line 127: `<loc>https://fisiquefitness.com/blog/gym-near-me-kokapet-benefits</loc>`
- Line 135: `<loc>https://fisiquefitness.com/legal</loc>`

### `public/llms.txt`
- Line 37: `https://fisiquefitness.com/`
- Line 38: `https://fisiquefitness.com/kokapet-gym`
- Line 39: `https://fisiquefitness.com/personal-training-kokapet`
- Line 40: `https://fisiquefitness.com/gym-membership-kokapet`
- Line 41: `https://fisiquefitness.com/blog-posts/`
- Line 42: `https://fisiquefitness.com/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/`

### `public/llms-full.txt`
- Line 119: `https://fisiquefitness.com/`
- Line 120: `https://fisiquefitness.com/kokapet-gym`
- Line 121: `https://fisiquefitness.com/personal-training-kokapet`
- Line 122: `https://fisiquefitness.com/gym-membership-kokapet`
- Line 123: `https://fisiquefitness.com/blog-posts/`
- Line 124: `https://fisiquefitness.com/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/`

---

## 🧩 Schema Components

### `src/components/LocalBusinessSchema.tsx`
- Line 7: `"@id": "https://fisiquefitness.com/#localbusiness"`
- Line 11: `"url": "https://fisiquefitness.com"`
- Line 27: `"image": "https://fisiquefitness.com/fisique-logo.webp"`

### `src/components/OrganizationSchema.tsx`
- Line 7: `"@id": "https://fisiquefitness.com/#organization"`
- Line 10: `"url": "https://fisiquefitness.com"`
- Line 13: `"url": "https://fisiquefitness.com/fisique-logo.webp"`

### `src/components/WebSiteSchema.tsx`
- Line 7: `"@id": "https://fisiquefitness.com/#website"`
- Line 9: `"url": "https://fisiquefitness.com"`
- Line 12: `"@id": "https://fisiquefitness.com/#organization"`

### `src/components/BlogPostSchema.tsx`
- Line 25: `"@id": "https://fisiquefitness.com/blog/${slug}"`
- Line 29: `"image": featuredImage || "https://fisiquefitness.com/fisique-logo.webp"`
- Line 35: `"@id": "https://fisiquefitness.com/#organization"`
- Line 42: `"url": "https://fisiquefitness.com/fisique-logo.webp"`
- Line 48: `"@id": "https://fisiquefitness.com/#website"`

### `src/components/BlogListSchema.tsx`
- Line 19: `"@id": "https://fisiquefitness.com/blog-posts/#webpage"`
- Line 20: `"url": "https://fisiquefitness.com/blog-posts/"`
- Line 25: `"@id": "https://fisiquefitness.com/#website"`
- Line 37: `"@id": "https://fisiquefitness.com/blog/${post.slug}"`
- Line 38: `"url": "https://fisiquefitness.com/blog/${post.slug}"`
- Line 41: `"image": post.featured_image_url || "https://fisiquefitness.com/fisique-logo.webp"`
- Line 46: `"@id": "https://fisiquefitness.com/#organization"`
- Line 52: `"url": "https://fisiquefitness.com/fisique-logo.webp"`

### `src/components/BreadcrumbSchema.tsx`
No hardcoded domain (uses props)—but check page components that pass `url` props.

---

## 📄 Page Components

### `src/pages/Index.tsx`
- Line 35: `<link rel="canonical" href="https://fisiquefitness.com/" />`
- Line 39: `<meta property="og:url" content="https://fisiquefitness.com/" />`

### `src/pages/KokapetGym.tsx`
- Line 15: `{ name: 'Home', url: 'https://fisiquefitness.com/' }`
- Line 31: `<link rel="canonical" href="https://fisiquefitness.com/kokapet-gym" />`
- Line 38: `<meta property="og:url" content="https://fisiquefitness.com/kokapet-gym" />`

### `src/pages/PersonalTrainingKokapet.tsx`
- Line 15: `{ name: 'Home', url: 'https://fisiquefitness.com/' }`
- Line 40: `<link rel="canonical" href="https://fisiquefitness.com/personal-training-kokapet" />`
- Line 47: `<meta property="og:url" content="https://fisiquefitness.com/personal-training-kokapet" />`

### `src/pages/GymMembershipKokapet.tsx`
- Line 15: `{ name: 'Home', url: 'https://fisiquefitness.com/' }`
- Line 85: `<link rel="canonical" href="https://fisiquefitness.com/gym-membership-kokapet" />`
- Line 92: `<meta property="og:url" content="https://fisiquefitness.com/gym-membership-kokapet" />`

### `src/pages/Contact.tsx`
- Line 17: `{ name: 'Home', url: 'https://fisiquefitness.com/' }`
- Line 36: `<link rel="canonical" href="https://fisiquefitness.com/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/" />`
- Line 40: `<meta property="og:url" content="https://fisiquefitness.com/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/" />`

### `src/pages/Blog.tsx`
- Line 54: `{ name: 'Home', url: 'https://fisiquefitness.com/' }`
- Line 63: `<link rel="canonical" href="https://fisiquefitness.com/blog-posts/" />`
- Line 67: `<meta property="og:url" content="https://fisiquefitness.com/blog-posts/" />`

### `src/pages/BlogPost.tsx`
- Line 78: `{ name: 'Home', url: 'https://fisiquefitness.com/' }`
- Line 79: `{ name: 'Blog', url: 'https://fisiquefitness.com/blog-posts/' }`
- Line 88: `<link rel="canonical" href="https://fisiquefitness.com/blog/${slug}" />`
- Line 92: `<meta property="og:url" content="https://fisiquefitness.com/blog/${slug}" />`

---

## 📊 Summary

| Category | File Count | Reference Count |
|----------|------------|-----------------|
| Static Files (public/) | 4 | ~30 |
| Schema Components | 5 | ~20 |
| Page Components | 7 | ~20 |
| **Total** | **16** | **~70** |

---

## 🔄 Migration Command

When ready to migrate, ask:

> "Replace all instances of `fisiquefitness.com` with `fisique.fitness` across all files listed in DOMAIN_REFERENCES.md"

This will update all 70+ references in a single operation.

---

## ⚠️ Notes

1. **Email addresses** (`hello@fisique.fitness`, `smaran@fisique.fitness`) already use the `fisique.fitness` domain—no change needed.
2. **Subdomain references** (`offers.fisique.fitness`, `member.fisique.fitness`) already use the correct domain.
3. **Google Maps links** don't contain the domain—no change needed.
4. **WhatsApp links** don't contain the domain—no change needed.

---

*Last updated: January 28, 2026*
