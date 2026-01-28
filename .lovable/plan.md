
# Implementation Plan: Contact Form, Navigation & Hero Updates

## Summary

| Change | File | Description |
|--------|------|-------------|
| Add contact form | `src/pages/Contact.tsx` | Name + Phone form with WhatsApp submission |
| Add second email | `src/pages/Contact.tsx` | Add smaran@fisique.fitness |
| Rename "Posts" to "Blog" | `src/components/Header.tsx` | Desktop and mobile navigation |
| Add "Contact" link | `src/components/Header.tsx` | Add to both desktop and mobile nav |
| Add "Blog" & "Contact" links | `src/components/Footer.tsx` | Add to footer navigation |
| Add click-to-call | `src/components/Hero.tsx` | Add phone link below CTAs |

---

## 1. Contact Page Enhancements

### Add Second Email
In the email section, display both email addresses:
- `hello@fisique.fitness`
- `smaran@fisique.fitness`

### Add Contact Form
Add a simple lead capture form in the right-side CTA card:

```
+---------------------------+
|    Quick Inquiry Form     |
+---------------------------+
| Your Name                 |
| [____________________]    |
|                           |
| Phone Number              |
| [____________________]    |
|                           |
| [ Submit Inquiry ]        |
+---------------------------+
```

**Form behavior:**
- Uses React state for controlled inputs
- Basic validation (both fields required)
- On submit: Opens WhatsApp with pre-filled message containing user's name and phone
- Message format: "Hi! I'm [Name], phone: [Phone]. I'd like to know more about Fisique Fitness."

---

## 2. Header Navigation Updates

### Desktop Navigation
- Change "Posts" to "Blog"
- Add "Contact" link pointing to `/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/`

### Mobile Navigation
- Same changes: "Posts" becomes "Blog", add "Contact" link

---

## 3. Footer Updates

Add two new links to the footer navigation:
- "Blog" linking to `/blog-posts/`
- "Contact" linking to `/embrace-your-strength-at-fisique-fitness-contact-us-to-start-your-journey/`

---

## 4. Hero Click-to-Call

Add a subtle click-to-call line below the existing CTA buttons:

```
[ Start Your Journey ] [ Visit the Studio ]

        or call +91-9515469444
              (clickable tel: link)
```

Styled as muted text with hover effect, making the phone number easily tappable on mobile.

---

## Files to Modify

1. **`src/pages/Contact.tsx`**
   - Add `smaran@fisique.fitness` email
   - Add contact form with Name + Phone fields
   - Form submits via WhatsApp link

2. **`src/components/Header.tsx`**
   - Rename "Posts" to "Blog" (lines 98-102, 173-179)
   - Add "Contact" link to desktop nav (after Blog)
   - Add "Contact" link to mobile nav (after Blog)

3. **`src/components/Footer.tsx`**
   - Add "Blog" link to `/blog-posts/`
   - Add "Contact" link to the long-form URL

4. **`src/components/Hero.tsx`**
   - Add click-to-call link below CTA buttons

