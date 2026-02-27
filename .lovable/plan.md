

## Plan: Move "How It Works" above the Leaderboard

### Current order
Hero (prizes → countdown → leaderboard → CTAs) → How It Works → Trust → Points

### New order
Hero (prizes → countdown) → **How It Works** (own section) → Leaderboard + CTAs → Trust → Points

### Changes in `src/pages/FisiqueChallenge.tsx`

1. **End the hero section** after the countdown timer (line 146), before the leaderboard
2. **Move the "How It Works" section** (lines 182-199) to sit between the hero closing tag and a new section containing the leaderboard
3. **Wrap the leaderboard + CTAs** (lines 148-178) in their own `<section>` with matching styling

No new files. Single file edit.

