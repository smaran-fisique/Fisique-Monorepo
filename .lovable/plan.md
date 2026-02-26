

## Plan: Admin Challenge Management Page (`/admin/challenge`)

### 1. New File: `src/pages/admin/ChallengeManager.tsx`
A single admin page with three tabs:

**Participants Tab**
- Table listing all `challenge_participants` (name, phone, points, referral_count, vote_count)
- "Add Participant" button → dialog with name + phone fields
- Inline actions per row: Edit (name/phone), Delete, Award Points (+10/+25/custom referral points)
- Award Points button increments both `points` and `referral_count` columns

**Votes Tab**
- Table listing all `challenge_votes` (voter_phone, participant name via join, discount_code, discount_expires_at, created_at)
- Read-only view for monitoring

**Stats Summary**
- Top cards showing total participants, total votes, total unique voters

### 2. Route Registration (`src/App.tsx`)
- Lazy import `ChallengeManager`
- Add route `/admin/challenge` inside the protected admin routes

### 3. Sidebar Navigation (`src/layouts/AdminLayout.tsx`)
- Add "Challenge" nav item with `Trophy` icon, href `/admin/challenge`

### 4. Data Access
- All reads/writes use the existing Supabase client with authenticated admin session
- RLS already configured: admins have ALL access on both `challenge_participants` and `challenge_votes`
- No database migrations needed

### Files Modified
| File | Change |
|------|--------|
| `src/pages/admin/ChallengeManager.tsx` | New file — full CRUD page |
| `src/App.tsx` | Add lazy import + route |
| `src/layouts/AdminLayout.tsx` | Add nav entry |

