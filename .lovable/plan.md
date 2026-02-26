

## Plan: Update Vote Success Screen + Limit 1 Discount per Voter

### 1. Edge Function (`challenge-vote/index.ts`)
- After OTP verification, check if `voter_phone` already has **any** vote in `challenge_votes` (not just for this participant)
- If they already voted before: still record the vote (they can vote for multiple candidates), but **don't generate a new discount code** — return the existing one from their first vote
- This enforces: 1 discount code per phone number, unlimited votes per phone (1 per candidate)

### 2. VoteModal Success Screen (`VoteModal.tsx`)
- Replace "Copy Code" + "Share" buttons with a single **"Claim Now"** button
- "Claim Now" opens WhatsApp to `+919515847444` with message: `"I would like to claim my vote discount - {discountCode}"`
- Add disclaimer text: *"One discount code per phone number. Vote for multiple candidates but only one ₹1,000 discount per voter."*
- Remove `Copy` and `Share2` icon imports, add `MessageCircle` or use existing WhatsApp pattern

### 3. Files Modified
| File | Change |
|------|--------|
| `supabase/functions/challenge-vote/index.ts` | Check for existing discount code before generating new one |
| `src/components/challenge/VoteModal.tsx` | Replace Copy/Share with "Claim Now" WhatsApp CTA + disclaimer |

