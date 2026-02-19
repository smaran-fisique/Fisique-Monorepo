

# Fisique Challenge Page -- 10 Upgrades

## Overview

A comprehensive upgrade to `src/pages/FisiqueChallenge.tsx` implementing all 10 improvements to maximize conversions, urgency, social proof, and virality. Only one file is modified.

---

## Changes (all in `src/pages/FisiqueChallenge.tsx`)

### 1. Countdown Timer + Urgency Strip

Add a compact urgency strip directly below the eyebrow pill, before the headline:

- Reuse the existing `CountdownTimer` component (from `src/components/offers/CountdownTimer.tsx`) targeting **Feb 28, 2026 23:59 IST**
- Below the timer, show two meta lines:
  - "Season: Feb 2026"
  - "Winners announced: Mar 1"
- Compact styling matching the dark premium design

### 2. Social Proof Stats in the Hero

Replace the small paragraph text (line 234-237: "Earn points by referring...") with 3 inline stat chips:

| Stat | Value |
|------|-------|
| Participants | 67 |
| Votes Cast | 1,842 |
| Referrals This Month | 38 |

Displayed as a horizontal row of pill-shaped badges with accent styling, placed directly under the prize cards.

### 3. Premium Prize Cards with Details

Upgrade prize card content:

**1st Place (Grand Prize card):**
- Add "Worth Rs 22,999" value line below the prize name
- Add micro-benefit: "AMOLED + GPS + Body Battery"
- Keep existing "Grand Prize" badge (already present)

**2nd Place:**
- Add "Worth up to Rs 10,000" line
- Add micro-benefit: "Valid in-store + online"

**3rd Place:**
- Add "Worth Rs 5,000" line
- Add micro-benefit: "Bag + accessories bundle"

### 4. Killer "How to Win" Line

Add one crisp line below the subheadline (after "Compete. Climb the leaderboard. Win premium rewards."):

> "Referrals + votes + verified shares = points. Highest points wins."

Styled as a slightly smaller, accent-tinted text for clarity.

### 5. Viral Vote CTA Upgrade

- Change vote button text from "Vote & Unlock Rs 1,000 Off" to **"Vote in 30 Seconds -- Get Rs 1,000 Off"**
- Add microcopy below the CTA buttons: "One per phone number. Valid 72 hours. Non-stackable."
- Move WhatsApp share + Copy Link buttons into the hero CTA area (alongside Vote)
- Add "Share to climb faster" microcopy near share buttons

### 6. Mini Leaderboard Under CTAs

Add a compact top-3 preview directly under the CTAs in the hero section:

| Rank | Name | Points |
|------|------|--------|
| 1 | Rahul | 620 pts |
| 2 | Neha | 580 pts |
| 3 | Smaran | 540 pts |

With a "See full leaderboard" link below. This replaces the separate "Current Standings" section (Section 3) which becomes redundant.

### 7. Join CTA

Add a tertiary CTA link below the main buttons:

**"Join Challenge -- Get +50 Points"**

Links to a WhatsApp click-to-chat: `https://wa.me/91XXXXXXXXXX?text=I want to join the Fisique Champions Challenge` (using a placeholder number that can be updated).

### 8. Trust/Proof Block (New Section)

Replace the old "Current Standings" section (Section 3, now redundant) with a new trust section:

**Title:** "This is performance-based -- not a lucky draw"

Four bullet items with check icons:
- Points are tracked on the leaderboard
- Votes are OTP verified
- Winners are announced publicly
- Prizes handed over on camera

Compact, clean layout matching the premium card style.

### 9. Share Hooks Near Vote CTA

Already handled in point 5 -- WhatsApp share and Copy Link buttons are moved into the hero CTA area with the "Share to climb faster" line.

### 10. Typography Hierarchy

- Reduce headline from `clamp(40px,8vw,80px)` to `clamp(36px,7vw,72px)`
- Increase subheadline from `text-lg md:text-xl` to `text-xl md:text-2xl`
- Increase prize card text weight and add more letter-spacing
- Add more spacing between headline and prize cards (`mb-14` instead of `mb-12`)

---

## Updated Section Order

1. **Hero** -- Eyebrow, countdown strip, headline, "how to win" line, subheadline, grand prize card, 2nd/3rd cards, social proof stats, CTAs (View Leaderboard + Vote + Join + Share), mini leaderboard top 3
2. **How It Works** -- 4 steps (unchanged)
3. **Trust Block** -- "Performance-based, not a lucky draw" (replaces old leaderboard preview)
4. **Vote and Unlock** -- Expanded with share hooks (kept but simplified since hero now has share buttons)
5. **Fisique Points** -- Unchanged
6. **Footer** -- Unchanged

---

## Technical Notes

- Import `CountdownTimer` from `@/components/offers/CountdownTimer`
- Import `Clock`, `CheckCircle`, `MessageCircle` from lucide-react (for timer strip and trust section)
- Target date: `new Date("2026-02-28T23:59:00+05:30")` (Feb 28 end of month, IST)
- Mini leaderboard data is hardcoded for now (static array)
- WhatsApp join link uses placeholder number to be configured
- No new files or dependencies needed

