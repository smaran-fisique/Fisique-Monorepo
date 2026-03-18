

## Plan: API-Based Member Sync

### Overview
Build an edge function `sync-members` that pulls active members from your membership hub API and upserts them into `challenge_participants`. Set up a cron job to run it every 12 hours. Add a manual "Sync Now" button in the admin UI.

### Step 1 — Store the API key as a secret
We need to add `MEMBERSHIP_HUB_API_KEY` with value `fisique_active` to the project secrets.

### Step 2 — Create edge function `sync-members`
`supabase/functions/sync-members/index.ts`

- Calls `GET https://vuuqslqhjuzjllribugt.supabase.co/functions/v1/active-members` with `Authorization: Bearer <MEMBERSHIP_HUB_API_KEY>`
- Parses response `{ members: [{ name, phone }] }`
- Deduplicates by phone, applies Title Case to names
- Upserts into `challenge_participants` on conflict `phone` — only updates `name`, preserves `points`, `referral_count`, `vote_count`
- Returns count of synced members
- Supports both cron (no auth) and admin manual trigger

### Step 3 — Enable pg_cron + pg_net and schedule job
Run SQL via insert tool to create a cron job that calls the edge function every 12 hours:
```sql
SELECT cron.schedule(
  'sync-members-every-12h',
  '0 */12 * * *',
  $$ SELECT net.http_post(
    url := 'https://cwzeymrokgsvwytkrhim.supabase.co/functions/v1/sync-members',
    headers := '{"Content-Type":"application/json","Authorization":"Bearer <anon_key>"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id; $$
);
```

### Step 4 — Add config.toml entry
```toml
[functions.sync-members]
verify_jwt = false
```

### Step 5 — Update ChallengeManager UI
Add a "Sync Now" button next to the Import button that calls the edge function and shows success/error toast with count of synced members. Keep the CSV import as a fallback.

### Step 6 — Add a `last_synced_at` tracking
Store last sync timestamp in `site_settings` (key: `members_last_synced`) so the admin can see when the last sync ran.

