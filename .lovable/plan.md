

# Hero Redesign: Grand Prize Showcase

## Problem
The current layout treats all 3 prizes equally in a flat 3-column grid. The 1st place Garmin watch image is tiny (80x80px), and the page lacks visual drama and hierarchy. It feels like a list, not a competition page.

## Solution

Completely restructure the hero prize layout into a **"podium" design** where the 1st place dominates the visual hierarchy.

### New Prize Layout

**1st Place -- Hero Card (full width, centered, large)**
- Takes full width on mobile, spans center on desktop
- Garmin watch image enlarged to 160x160px with a subtle teal glow ring behind it
- Gold/accent gradient border
- "Grand Prize" eyebrow label with a crown/trophy accent
- Larger text sizing for the prize name
- Subtle radial glow behind the card for depth

**2nd and 3rd Place -- Smaller cards below**
- Displayed side-by-side in a 2-column row beneath the grand prize
- Standard `premium-card` styling, smaller padding
- Visually subordinate to the 1st place card

### Additional Visual Enhancements

1. **Hero background**: Add the existing hero gym background image (faded at ~15% opacity) behind the hero section for atmosphere, matching the homepage pattern
2. **Gradient overlay**: Add the gradient-to-background overlay on top for readability
3. **Garmin glow effect**: A pulsing teal glow circle behind the watch image to make it feel premium and alive
4. **Bolder headline**: Increase headline font clamp and add font-black weight (matching homepage hero)
5. **CTA buttons**: Add the accent glow shadow to the primary button (matching homepage "Start Your Journey" button style)

---

## Technical Details

### File Changes
Only `src/pages/FisiqueChallenge.tsx` is modified.

### Hero Section Changes

**Prize layout restructure:**
- Remove the single `grid-cols-3` loop
- Render 1st place as a standalone large card with:
  - `max-w-sm mx-auto` centering
  - Image at `w-36 h-36` (144px)
  - Teal glow ring: `shadow-[0_0_60px_hsl(186_68%_45%/0.3)]` on the card
  - Accent border: `border-accent/50`
  - "Grand Prize" badge above the image
- Render 2nd and 3rd as a `grid-cols-2 max-w-lg mx-auto` row below

**Background image:**
- Import `heroGym` from existing `@/assets/hero-gym-optimized.webp`
- Absolute positioned behind hero content at low opacity (~15-20%)
- Gradient overlay from background to transparent

**CTA button styling:**
- Primary button gets `shadow-glow hover:shadow-glow-hover` classes (matching homepage)

**Headline:**
- Change to `text-[clamp(40px,8vw,80px)] font-black` for more impact
- Keep the gradient "Champions" word

