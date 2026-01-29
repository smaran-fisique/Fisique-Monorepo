

# Import Apify Reviews from XML File

## Summary
Create an edge function that accepts the Apify XML data you've manually downloaded and imports all 77 reviews into the `google_reviews` table. This will also add a "Bulk Import" button to the admin panel for easy future imports.

## Data Mapping

The XML fields map to database columns as follows:

| XML Field | Database Column |
|-----------|-----------------|
| `reviewId` | `google_review_id` (unique identifier for upsert) |
| `name` | `author_name` |
| `stars` | `rating` |
| `text` | `text` |
| `publishedAtDate` | `time` |
| `publishAt` | `relative_time_description` |
| `reviewerPhotoUrl` | `profile_photo_url` |

## Implementation

### 1. Create Import Edge Function
New function: `supabase/functions/import-reviews-bulk/index.ts`

Accepts JSON array of reviews (parsed from XML on frontend) and performs upsert into database using `google_review_id` as the conflict key.

### 2. Update Admin UI
Add to the Global SEO page:
- "Import Reviews" button that opens a modal
- Textarea or file upload for pasting/uploading Apify data
- Support for both XML and JSON formats from Apify exports
- Parse the data and send to edge function
- Show import results (count imported, duplicates skipped)

### 3. Process Flow

```text
1. Admin downloads XML from Apify
2. Admin pastes XML content (or uploads file) in Global SEO
3. Frontend parses XML to extract reviews
4. Frontend sends parsed reviews to import-reviews-bulk
5. Edge function upserts all reviews
6. Edge function triggers sync-review-stats
7. Review count updates automatically
```

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `supabase/functions/import-reviews-bulk/index.ts` | Create | Accept and import reviews |
| `src/pages/admin/GlobalSEO.tsx` | Modify | Add import UI |
| `supabase/config.toml` | Modify | Add function config |

## Future Enhancement: Apify Webhook
Once this manual import is working, we can add:
- Automatic webhook from Apify when scheduled scrape completes
- APIFY_API_TOKEN secret for authentication
- Weekly schedule in Apify dashboard

This gives you immediate ability to import your 77 reviews, with a path to full automation later.

