

# Fisique Champions Challenge Landing Page

## Overview

Build a high-conversion, viral landing page at `/fisique-challenge` that drives challenge participation, referrals, votes, and social sharing. The page follows the existing dark premium design system (Inter font, teal accent `hsl(186 68% 45%)`, dark backgrounds, `premium-card` patterns).

No new database tables are needed -- the page links out to `/fisique-challenge/leaderboard` and `/fisique-challenge/vote` (to be built separately). Dynamic stats are optional and will gracefully fall back to hidden if no API exists.

---

## Files to Create/Modify

| Action | File |
|--------|------|
| Create | `src/pages/FisiqueChallenge.tsx` |
| Modify | `src/App.tsx` (add route) |

---

## Route Registration

Add to `src/App.tsx`:
- `/fisique-challenge` pointing to the new lazy-loaded `FisiqueChallenge` component
- Also add placeholder routes for `/fisique-challenge/leaderboard` and `/fisique-challenge/vote` (can be built later, for now they can show a "Coming Soon" or redirect)

---

## Page Component: `FisiqueChallenge.tsx`

Single-file component using existing `Header`, `Footer`, `Button`, and design utilities. No new dependencies. Six sections as specified:

### Section 1 -- Hero (Prize-first)

- Eyebrow badge: "Fisique Champions Challenge" with Trophy icon
- Headline: **"Fisique Champions Challenge"** using the existing `text-[clamp(48px,8vw,88px)]` scale
- Subheadline: "Compete. Climb the leaderboard. Win premium rewards."
- **3 Prize Cards** in a responsive grid (1 col mobile, 3 col desktop):

| Card | Prize | Style |
|------|-------|-------|
| 1st Place (featured) | Garmin Vivoactive 5 | `premium-card` with accent border glow |
| 2nd Place | Rs 10,000 Puma Voucher | `premium-card` standard |
| 3rd Place | Bull Rage Gym Kit worth Rs 5,000 | `premium-card` standard |

- Supporting text below prizes
- Primary CTA: "View Leaderboard" -> `/fisique-challenge/leaderboard` (fires `challenge_leaderboard_click` GA event)
- Secondary CTA: "Vote and Unlock Rs 1,000 Off" -> `/fisique-challenge/vote` (fires `challenge_vote_click` GA event)

### Section 2 -- How It Works

4 steps in a grid (2x2 mobile, 4-col desktop), each with a lucide icon, step number, title, and description:

1. Join the challenge -- Earn +50 points instantly (UserPlus icon)
2. Refer members -- Earn leaderboard points and Fisique Points (Users icon)
3. Receive votes and share -- Climb faster (Heart icon)
4. Top ranked win -- Premium rewards (Trophy icon)

### Section 3 -- Leaderboard Preview

- Headline: "Current Standings"
- Table showing top 5 (Rank, Name, Points columns) using existing table styling
- **Data source**: Attempts to fetch from a future API/table. Falls back to a "Leaderboard coming soon" state if unavailable
- CTA: "View Full Leaderboard" -> `/fisique-challenge/leaderboard`

### Section 4 -- Vote and Unlock Reward

- Headline: "Support your friends. Unlock your reward."
- Supporting text about Rs 1,000 off membership
- Primary CTA: "Vote Now" -> `/fisique-challenge/vote` (fires `challenge_vote_click`)
- Share buttons:
  - **WhatsApp**: `https://wa.me/?text={encoded_message}` with the specified prefilled message
  - **Copy Link**: Copies `https://fisique.fitness/fisique-challenge` to clipboard with toast feedback
- Both fire `challenge_share_click` GA event

### Section 5 -- Fisique Points Benefit

- Headline: "Refer. Earn. Train Longer."
- 3 stat cards showing: 1000 points per referral, 3500 points = 1 month membership, community growth theme
- Uses `premium-card` styling

### Section 6 -- Footer Positioning

- Premium text block with challenge description
- CTA: "Explore Fisique Fitness" -> `/` (homepage)
- Followed by standard `<Footer />` component

---

## SEO and Open Graph

```html
<title>Fisique Champions Challenge | Win a Garmin Vivoactive 5</title>
<meta name="description" content="Compete, refer, and climb the leaderboard to win premium rewards at Fisique Fitness Kokapet." />
<meta property="og:title" content="Win a Garmin Vivoactive 5 - Fisique Champions Challenge" />
<meta property="og:description" content="Compete, refer, and climb the leaderboard to win premium rewards." />
<meta property="og:image" content="/fisique-logo.webp" />
<meta property="og:url" content="https://fisique.fitness/fisique-challenge" />
<link rel="canonical" href="https://fisique.fitness/fisique-challenge" />
```

---

## Analytics Events

All CTA buttons use `window.gtag` (same pattern as `OfferAnalytics.ts`):

| Event Name | Trigger |
|------------|---------|
| `challenge_leaderboard_click` | View Leaderboard button |
| `challenge_vote_click` | Vote Now / Vote CTA buttons |
| `challenge_share_click` | WhatsApp share or Copy Link |

---

## Performance

- No new dependencies or heavy libraries
- Page is lazy-loaded via `React.lazy` in App.tsx
- Uses only CSS animations (existing `premium-card` hover, no framer-motion)
- All icons from lucide-react (already installed, tree-shaken)
- Mobile-first responsive layout throughout

---

## Technical Notes

- WhatsApp share URL: `https://wa.me/?text=I'm%20competing%20in%20the%20Fisique%20Champions%20Challenge...`
- Copy-to-clipboard uses `navigator.clipboard.writeText()` with sonner toast for feedback
- Leaderboard preview section will attempt a Supabase query but gracefully degrade if no table exists yet
- All internal links use React Router `Link` component

