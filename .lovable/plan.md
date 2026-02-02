
# Fix: Multiple Aggregate Ratings Schema Error

## Problem Identified

Google Search Console is reporting "multiple aggregate ratings" errors because the `LocalBusinessSchema` component (which contains `aggregateRating`) is included on **11+ pages** across the site:

- Index (homepage)
- KokapetGym
- PersonalTrainingKokapet
- GymMembershipKokapet
- GymFinancialDistrict
- GymNarsingi
- FreelanceTrainerKokapet
- FreelanceTrainerNarsingi
- FreelanceTrainerFinancialDistrict
- Contact
- And potentially others

When Google crawls these pages, it sees the same LocalBusiness entity with an aggregateRating repeated multiple times, which triggers the validation error.

## Solution

Modify `LocalBusinessSchema` to accept an optional `includeRating` prop. Only the **homepage** should include the aggregate rating. All other pages will use the schema without the rating.

### Changes Required

**1. Update `src/components/LocalBusinessSchema.tsx`**
- Add optional `includeRating?: boolean` prop (defaults to `true`)
- Conditionally include `aggregateRating` only when `includeRating` is `true`

**2. Update all landing pages to pass `includeRating={false}`**

Files to update:
- `src/pages/KokapetGym.tsx`
- `src/pages/PersonalTrainingKokapet.tsx`
- `src/pages/GymMembershipKokapet.tsx`
- `src/pages/GymFinancialDistrict.tsx`
- `src/pages/GymNarsingi.tsx`
- `src/pages/FreelanceTrainerKokapet.tsx`
- `src/pages/FreelanceTrainerNarsingi.tsx`
- `src/pages/FreelanceTrainerFinancialDistrict.tsx`
- `src/pages/Contact.tsx`

**3. Keep homepage (`src/pages/Index.tsx`) unchanged**
- It will continue to use `<LocalBusinessSchema />` which defaults to including the rating

## Technical Details

```typescript
// LocalBusinessSchema.tsx - Updated signature
interface LocalBusinessSchemaProps {
  includeRating?: boolean;
}

export const LocalBusinessSchema = ({ includeRating = true }: LocalBusinessSchemaProps) => {
  const { stats } = useSiteStats();
  
  const schema = {
    // ... existing properties ...
    // Only include aggregateRating when prop is true
    ...(includeRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": stats.avgRating,
        "reviewCount": stats.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    }),
    // ... remaining properties ...
  };
  // ...
};
```

```tsx
// Usage in landing pages (not homepage)
<LocalBusinessSchema includeRating={false} />
```

## Result

After this fix:
- Only the homepage will have `aggregateRating` in structured data
- Google will see a single source of truth for the aggregate rating
- All other LocalBusiness schema instances will still provide business info (address, hours, etc.) without duplicating ratings
- The "multiple aggregate ratings" error should be resolved in Google Search Console within a few days of re-crawling

## Alternative Considered

Removing `LocalBusinessSchema` entirely from non-homepage pages was considered, but keeping it (without ratings) still provides SEO value through consistent NAP (Name, Address, Phone) structured data.
