

# Full Implementation Plan: Voting System on Fisique Challenge Page

## Overview
Add WhatsApp OTP-verified voting and a live leaderboard directly into `/fisique-challenge`. No separate pages. One phone number = one vote per candidate.

---

## 1. Database Migration (3 tables)

### `challenge_participants`
| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| name | text | required |
| phone | text (unique) | required |
| points | integer | 50 |
| referral_count | integer | 0 |
| vote_count | integer | 0 |
| created_at | timestamptz | now() |

RLS: Public SELECT. Admin ALL.

### `challenge_votes`
| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| participant_id | uuid FK | required |
| voter_phone | text | required |
| discount_code | text | generated |
| discount_expires_at | timestamptz | +72h |
| created_at | timestamptz | now() |
| **UNIQUE(voter_phone, participant_id)** | | |

RLS: Public INSERT (unique constraint dedup). Admin ALL.

### `challenge_otps`
| Column | Type | Default |
|--------|------|---------|
| id | uuid | gen_random_uuid() |
| phone | text | required |
| otp | text | required |
| created_at | timestamptz | now() |

RLS: No public access (service role only from edge function).

Enable realtime on `challenge_participants` for live leaderboard.

---

## 2. Edge Function: `challenge-vote`

**File:** `supabase/functions/challenge-vote/index.ts`

Two actions via POST:

### `action: "send-otp"`
- Input: `{ action: "send-otp", phone: "91XXXXXXXXXX" }`
- Generate random 6-digit OTP
- Delete any existing OTPs for this phone (cleanup)
- Insert OTP into `challenge_otps`
- Call WhatsApp API:
  ```
  POST https://adminapis.backendprod.com/lms_campaign/api/whatsapp/template/krsw4x895e/process
  Body: { "receiver": "91XXXXXXXXXX", "values": { "1": "123456" } }
  ```
- No auth headers (as confirmed)
- Return `{ success: true }`

### `action: "verify-vote"`
- Input: `{ action: "verify-vote", participant_id, voter_phone, otp }`
- Look up OTP in `challenge_otps` where phone matches and created_at < 5 minutes ago
- If no match or expired, return error
- Check unique constraint — if voter already voted for this candidate, return "already voted"
- Insert into `challenge_votes` with generated 8-char discount code, expiry = now + 72h
- Increment participant's `vote_count` (+1) and `points` (+10) via direct update
- Delete used OTP
- Return `{ discount_code, expires_at }`

Config: `verify_jwt = false` (public endpoint, no auth required)

---

## 3. UI Changes to `FisiqueChallenge.tsx`

### Replace hardcoded mini leaderboard with live full leaderboard
- Fetch `challenge_participants` ordered by `points DESC` on mount
- Subscribe to realtime changes on `challenge_participants` for live updates
- Show ranked list: position, name, points, vote count
- Top 3 get accent styling
- Each row has a **Vote** button (Heart icon)

### Replace hardcoded social proof stats with live counts
- Total participants count, sum of all vote_count, sum of all referral_count
- Derived from the fetched participants data

### Inline Vote Modal (Dialog component)
Triggered by clicking "Vote" on any participant row:
1. **Step 1**: Show participant name, enter 10-digit phone → "Send OTP via WhatsApp" button
2. **Step 2**: Enter 6-digit OTP using existing `InputOTP` component → "Confirm Vote" button
3. **Step 3**: Success — show discount code, 72h expiry, copy button, WhatsApp share link
4. **Error states**: "Already voted for this person", "Invalid OTP", "OTP expired"

### Update CTAs
- "View Leaderboard" → anchor scroll (`#leaderboard`) to leaderboard section
- "Vote in 30 Seconds" → anchor scroll to leaderboard section
- "See full leaderboard →" → anchor scroll instead of Link
- Remove `/fisique-challenge/vote` and `/fisique-challenge/leaderboard` Link references

### Remove hardcoded `miniLeaderboard` array
- Delete the static data at top of file
- The leaderboard section replaces both the mini leaderboard and the "Vote & Unlock" section

---

## 4. Section Order (Final)

1. **Hero** — Headline, subheadline, "how to win", prize podium, countdown, social proof stats (live), CTAs (scroll anchors + share + join), leaderboard with vote buttons
2. **How It Works** — 4 steps (unchanged)
3. **Trust Block** — "Performance-based, not a lucky draw" (unchanged)
4. **Fisique Points** — Unchanged
5. **Footer section** — Unchanged

The "Vote & Unlock" section (lines 296-312) is removed since voting is now inline in the leaderboard.

---

## Files to Create/Modify

| File | Action |
|------|--------|
| SQL migration | Create 3 tables + RLS + realtime |
| `supabase/functions/challenge-vote/index.ts` | New edge function |
| `supabase/config.toml` | Auto-updated with `verify_jwt = false` |
| `src/pages/FisiqueChallenge.tsx` | Live leaderboard, vote modal, live stats, remove dead links |

No new pages or routes needed.

