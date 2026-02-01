

## Offer Leaderboard Feature

Create a public leaderboard page for each offer (starting with `/offers/iphone/leaderboard`) and an admin interface to manually add/manage entrants who qualify for the draw.

---

### What You'll Get

1. **Public Leaderboard Page** (`/offers/iphone/leaderboard`)
   - Displays all qualified entrants for the iPhone offer
   - Shows each person's name and their probability of winning (100% / total entrants)
   - Clean, on-brand design matching the Fisique Fitness aesthetic
   - Auto-updates as new entrants are added

2. **Admin Management** (within existing Offers page)
   - "Manage Entrants" button on each offer card
   - Add new entrant form: Name + optional Phone/Notes
   - Delete entrants
   - View current count and probabilities

---

### Database Design

Create a new `offer_entrants` table:

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| offer_id | uuid | Foreign key to offers table |
| name | text | Entrant's display name |
| phone | text (optional) | Contact number |
| notes | text (optional) | Admin notes (e.g., "3-month PT membership") |
| created_at | timestamp | When they were added |
| created_by | uuid | Admin who added them |

**RLS Policies:**
- Anyone can SELECT (public leaderboard)
- Only admins can INSERT/UPDATE/DELETE

---

### File Changes

| File | Action | Purpose |
|------|--------|---------|
| `src/pages/offers/IPhoneLeaderboard.tsx` | Create | Public leaderboard page |
| `src/pages/admin/OfferEntrants.tsx` | Create | Admin page to manage entrants |
| `src/App.tsx` | Modify | Add routes for leaderboard and admin page |
| `src/layouts/AdminLayout.tsx` | Modify | Add navigation link to entrants (optional, can use existing Offers page) |
| `src/pages/admin/Offers.tsx` | Modify | Add "Manage Entrants" button per offer |

---

### User Interface Preview

**Public Leaderboard (`/offers/iphone/leaderboard`):**

```text
+------------------------------------------+
|  iPhone 16 Draw - Qualified Entrants     |
|  7 people in the draw                    |
+------------------------------------------+
|  #  Name              Win Probability    |
+------------------------------------------+
|  1  Rahul K.          14.3%             |
|  2  Priya S.          14.3%             |
|  3  Amit M.           14.3%             |
|  ...                                     |
+------------------------------------------+
|  [Join the Draw - CTA Button]           |
+------------------------------------------+
```

**Admin Panel (Offers page with entrant management):**

```text
+------------------------------------------+
|  Win an iPhone! - Entrants (7)          |
+------------------------------------------+
|  [+ Add Entrant]                        |
+------------------------------------------+
|  Name       Phone         Actions        |
|  Rahul K.   9876543210    [Delete]      |
|  Priya S.   9123456780    [Delete]      |
+------------------------------------------+
```

---

### Technical Details

**Database Migration:**

```sql
CREATE TABLE offer_entrants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text,
  notes text,
  created_at timestamptz DEFAULT now(),
  created_by uuid
);

ALTER TABLE offer_entrants ENABLE ROW LEVEL SECURITY;

-- Public can view entrants (for leaderboard)
CREATE POLICY "Anyone can view offer entrants"
  ON offer_entrants FOR SELECT
  USING (true);

-- Only admins can manage entrants
CREATE POLICY "Admins can manage offer entrants"
  ON offer_entrants FOR ALL
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));
```

**Probability Calculation:**
- Frontend calculates: `100 / totalEntrants`
- Displayed as percentage with 1 decimal place (e.g., "14.3%")
- Updates in real-time as entrants are added/removed

**Route Structure:**
- `/offers/iphone/leaderboard` - Public leaderboard for iPhone offer
- `/admin/offers/:offerId/entrants` - Admin management page (or inline in Offers page)

---

### Implementation Approach

1. **Create database table** - `offer_entrants` with proper RLS
2. **Build admin interface** - Add entrant management to existing Offers admin page
3. **Create public leaderboard** - New page component with SEO metadata
4. **Add routing** - Register new routes in App.tsx
5. **Link leaderboard** - Add button on iPhone offer page to view leaderboard

