
# Unified Legal Page with Payment Gateway Anchor Links

## Overview
Create a consolidated `/legal` page containing all policy sections with anchor links required by the payment gateway. This preserves the existing WordPress structure at `https://fisique.fitness/legal/` while supporting the mandatory anchor links.

---

## Payment Gateway Requirements

The following URLs must work for payment gateway compliance:

| URL | Anchor ID Required |
|-----|-------------------|
| `/legal#terms` | `id="terms"` |
| `/legal#privacy` | `id="privacy"` |
| `/legal#refund` | `id="refund"` |
| `/legal#shipping` | `id="shipping"` |
| `/legal#emi` | `id="emi"` |

---

## Content to Preserve

Based on the original WordPress page at `fisique.fitness/legal/`, these sections must be included:

### 1. Terms & Conditions
- Membership Access (unlimited gym + sauna)
- Training Plans (Transform, Transform+, Premier)
- Minimum Commitment (3-month term)
- EMI Authorization (RBI compliance)
- Fair Use policy

### 2. Privacy Policy
- What We Collect (personal, fitness, billing, device data)
- How We Use It
- Data Protection
- Your Rights
- Messaging Consent
- Data Retention

### 3. Cancellation & Refund Policy
- Strict No Refund policy
- Early Exit terms
- Non-payment consequences

### 4. Shipping & Exchange Policy
- Service-based (no physical goods shipped)
- Non-transferable memberships
- Add-ons are member-bound

### 5. No-Cost EMI (NEW SECTION)
- Available tenures: 3 & 6 months
- Zero interest/hidden charges
- Auto-debit setup required
- Bank eligibility disclaimer

---

## Technical Implementation

### 1. Create Unified Legal Page
**File:** `src/pages/legal/Legal.tsx`

Structure:
```text
+------------------------------------------+
| Header                                   |
+------------------------------------------+
| Hero: "Legal & Compliance"               |
| Quick Navigation Links (internal anchors)|
+------------------------------------------+
| Section: Terms & Conditions (id="terms") |
+------------------------------------------+
| Section: Privacy Policy (id="privacy")   |
+------------------------------------------+
| Section: Refund Policy (id="refund")     |
+------------------------------------------+
| Section: Shipping Policy (id="shipping") |
+------------------------------------------+
| Section: EMI Terms (id="emi")            |
+------------------------------------------+
| Contact Information                      |
+------------------------------------------+
| Footer                                   |
+------------------------------------------+
```

Each section will have:
- Proper `id` attribute for anchor linking
- `scroll-margin-top` CSS for header offset
- Complete policy content matching the WordPress original

### 2. Add Route in App.tsx
```tsx
import Legal from "./pages/legal/Legal";

// Add routes for both with and without trailing slash
<Route path="/legal" element={<Legal />} />
<Route path="/legal/" element={<Legal />} />
```

### 3. Update Footer Links
Change footer to link to unified page with anchors:
```tsx
<Link to="/legal#terms">Terms</Link>
<Link to="/legal#privacy">Privacy</Link>
<Link to="/legal#refund">Refund Policy</Link>
<Link to="/legal#shipping">Shipping</Link>
```

### 4. Add Scroll-to-Hash Behavior
Create a hook or use `useEffect` to scroll to hash on page load:
```tsx
useEffect(() => {
  if (window.location.hash) {
    const element = document.getElementById(window.location.hash.slice(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}, []);
```

---

## Content Differences: WordPress vs Current Site

| Section | WordPress (Original) | Current New Site | Action |
|---------|---------------------|------------------|--------|
| Terms | Concise, membership-focused | Detailed 9-section version | Use WordPress content |
| Privacy | 6 detailed subsections | 8-section expanded version | Merge best of both |
| Refund | Strict no-refund policy | Detailed with exceptions | Use WordPress content (stricter) |
| Shipping | Service-only, no physical goods | Detailed with physical products | Use WordPress content (accurate) |
| EMI | Included | Missing | Add from WordPress |

---

## Files to Create/Modify

### New Files:
1. `src/pages/legal/Legal.tsx` - Unified legal page with all 5 sections

### Files to Modify:
1. `src/App.tsx` - Add `/legal` and `/legal/` routes
2. `src/components/Footer.tsx` - Update links to use anchor format
3. `public/sitemap.xml` - Add `/legal` URL

### Files to Keep (for backward compatibility):
- `src/pages/legal/Terms.tsx`
- `src/pages/legal/Privacy.tsx`
- `src/pages/legal/Refund.tsx`
- `src/pages/legal/Shipping.tsx`

These individual pages can remain as redirects or be kept for SEO value.

---

## SEO Considerations

1. **Canonical URL**: Set `/legal` as the canonical for all policy content
2. **Meta Description**: "Fisique Fitness legal policies including Terms & Conditions, Privacy Policy, Refund Policy, Shipping Policy, and EMI terms."
3. **Internal Linking**: Footer, checkout flows, and payment pages will all link to `/legal#section`

---

## Implementation Order

1. Create `Legal.tsx` with all 5 sections and proper anchor IDs
2. Add route in `App.tsx`
3. Update `Footer.tsx` links
4. Add smooth scroll behavior for hash navigation
5. Update sitemap
6. Test all anchor links work correctly

---

## Content for EMI Section (New)

```text
## No-Cost EMI Available

We make fitness accessible with zero-cost EMIs on major credit cards.

- Available tenures: 3 & 6 months
- No interest or hidden charges — we absorb the cost
- Auto-debit setup required for recurring payments

**Disclaimer:** EMI approval is subject to your bank's eligibility criteria. 
If you cancel early, any remaining dues must be cleared immediately as per RBI norms.
```

---

## Verification Checklist

After implementation, verify these URLs work correctly:
- [ ] `https://fisique.fitness/legal` - Full page loads
- [ ] `https://fisique.fitness/legal#terms` - Scrolls to Terms section
- [ ] `https://fisique.fitness/legal#privacy` - Scrolls to Privacy section
- [ ] `https://fisique.fitness/legal#refund` - Scrolls to Refund section
- [ ] `https://fisique.fitness/legal#shipping` - Scrolls to Shipping section
- [ ] `https://fisique.fitness/legal#emi` - Scrolls to EMI section
