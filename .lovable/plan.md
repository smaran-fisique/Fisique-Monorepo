
# Phone Number Update + SEO Configuration

## Summary
Update the primary phone number from **+91-9515847444** to **+91-9515469444** across all 12 files where it appears, fix the SEO default location, and update robots.txt for the offers subdomain.

---

## Changes Required

### 1. Phone Number Updates (12 Files)

All instances of `9515847444` will be replaced with `9515469444`:

| File | Type of Reference |
|------|-------------------|
| `src/components/Footer.tsx` | Display + tel: link |
| `src/components/Header.tsx` | tel: links (desktop + mobile) |
| `src/components/Hero.tsx` | WhatsApp link |
| `src/components/FinalCTA.tsx` | WhatsApp link |
| `src/components/MembershipPlansSection.tsx` | WhatsApp links (2x) |
| `src/components/TrainingOptionsSubSection.tsx` | WhatsApp link |
| `src/components/FAQSchema.tsx` | Text in FAQ answers (2x) |
| `src/components/LocalBusinessSchema.tsx` | Telephone array in JSON-LD |
| `src/pages/KokapetGym.tsx` | WhatsApp + tel: links (3x) |
| `src/pages/PersonalTrainingKokapet.tsx` | WhatsApp + tel: links (4x) |
| `src/pages/GymMembershipKokapet.tsx` | WhatsApp links (4x) |
| `src/pages/Contact.tsx` | Display + tel: + WhatsApp links |

**Note:** The `useSiteSettings.tsx` hook already has the correct default (`919515469444`) for the floating WhatsApp button.

---

### 2. Fix SEO Default Location

**File:** `src/hooks/useSEO.tsx`

Change default description from:
> "Premium fitness center in **Bangalore** offering..."

To:
> "Premium personal training gym in **Kokapet, Hyderabad** offering one-on-one coaching, nutrition guidance, and sauna recovery. Start your transformation journey today."

Also update default keywords from:
> "fitness, gym, personal training, bangalore, workout, health, wellness"

To:
> "fitness, gym, personal training, kokapet, hyderabad, workout, health, wellness, sauna"

---

### 3. Update robots.txt for Offers Subdomain

**File:** `public/robots.txt`

Add explicit allow rules for new landing pages and AI discoverability files:

```
User-agent: *
Allow: /

# Landing Pages
Allow: /kokapet-gym
Allow: /personal-training-kokapet
Allow: /gym-membership-kokapet

# Blog
Allow: /blog-posts/

# Contact
Allow: /embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/

# For offers.fisique.fitness subdomain
# Note: This robots.txt only applies to fisique.fitness
# The offers subdomain should have its own robots.txt allowing indexing

Sitemap: https://fisique.fitness/sitemap.xml
```

**Important:** For `offers.fisique.fitness` to be indexed, that subdomain needs its own `robots.txt` file allowing crawlers. Since this is a separate subdomain, I'll create a note in this file and you can configure the offers subdomain separately.

---

## Implementation Order

1. Update all 12 files with the correct phone number (bulk find/replace)
2. Fix `useSEO.tsx` default description and keywords
3. Update `robots.txt` with new landing page paths

---

## Technical Note

The secondary number `+91-7671959610` remains unchanged in:
- Footer
- Contact page
- LocalBusinessSchema

This number will stay as the secondary contact option.
