# Fisique Fitness CMS Implementation Plan

## Overview
Complete CMS system for managing all website content through an admin dashboard.

## User Decisions
1. **Google Analytics**: Will add GA4 Measurement ID through admin dashboard later
2. **Admin User**: Option C - Manual promotion via Supabase dashboard after signup
3. **WhatsApp Number**: Admin-editable, default: 919515469444
4. **Blog Categories**: Generic fitness categories (will enhance later)
5. **Offers Banner**: Reset daily (localStorage tracking)

---

## Phase 1: Database Schema, Authentication & Site Settings

### Database Tables
- `app_role` enum (admin, moderator, user)
- `user_roles` table with has_role() security definer function
- `sections` table for homepage content sections
- `blog_posts`, `blog_categories`, `blog_tags`, `blog_post_tags`
- `offers` table for promotional banners
- `seo_meta` table for page-specific SEO
- `analytics_events` table for internal tracking
- `media` table for file management
- `site_settings` table for global config (WhatsApp, GA4, etc.)

### Authentication
- Email/password login at `/admin/login`
- Auto-confirm email enabled
- Auth context provider
- Protected routes for `/admin/*`
- Role-based access control

### Admin Dashboard Structure
- `/admin` - Dashboard home
- `/admin/login` - Login page
- `/admin/settings` - Site settings editor
- Layout with sidebar navigation

### Frontend Integration
- React hook for site settings
- Dynamic WhatsApp number in FloatingWhatsApp component
- GA4 initialization (when ID provided)

---

## Phase 2: Blog System

### Admin Features
- `/admin/blog` - Blog post list
- `/admin/blog/new` - Create new post
- `/admin/blog/[id]/edit` - Edit existing post
- Rich text editor (TipTap or similar)
- Category management
- Tag management
- Featured image upload
- SEO meta fields per post
- Publish/draft status

### Frontend Features
- `/blog` - Blog listing page
- `/blog/[slug]` - Individual blog post page
- Category filtering
- Tag filtering
- Search functionality
- Related posts
- Social sharing

---

## Phase 3: Analytics System

### Google Analytics 4
- GA4 initialization from site_settings
- Pageview tracking
- Event tracking (button clicks, form submissions)
- E-commerce events (if applicable)

### Internal Analytics
- Custom event tracking to `analytics_events` table
- Admin dashboard with:
  - Page views over time
  - Popular pages
  - User journey tracking
  - Conversion tracking

### Admin Dashboard
- `/admin/analytics` - Analytics overview
- Charts using Recharts
- Date range selector
- Export capabilities

---

## Phase 4: Offers System

### Admin Features
- `/admin/offers` - Offers list
- `/admin/offers/new` - Create offer
- `/admin/offers/[id]/edit` - Edit offer
- Fields: title, description, CTA text, CTA link, start/end dates, active status
- Banner preview

### Frontend Features
- Dismissible banner at top of page
- Daily reset logic (localStorage)
- Offer rotation based on dates
- A/B testing support (future)

---

## Phase 5: Homepage Content Management

### Admin Features
- `/admin/content` - Content sections list
- `/admin/content/[section]` - Edit section
- Sections to manage:
  - Hero (headline, subheadline, CTA, background image)
  - Why Section (points, images)
  - Programs (cards with titles, descriptions, features)
  - Experience (items with images, descriptions)
  - Transformations (testimonials, before/after images)
  - Pricing (plans with features, prices)
  - Reviews (integration with Google Reviews API)
  - Final CTA (headline, CTA text)

### Data Migration
- Script to migrate hardcoded content to database
- Preserve all existing content
- No breaking changes to live site

---

## Phase 6: SEO Management

### Admin Features
- `/admin/seo` - SEO overview for all pages
- Edit meta for:
  - Homepage
  - Blog listing
  - Individual blog posts
  - Static pages
- Fields: title, description, keywords, og:image, canonical URL
- Preview how it looks in search results

### Technical Implementation
- React Helmet or similar for meta tags
- Dynamic sitemap generation
- robots.txt management
- Structured data (JSON-LD) for blog posts

---

## Phase 7: Media Library

### Admin Features
- `/admin/media` - Media library
- Upload files (images, videos, PDFs)
- Organize by folders/categories
- Search and filter
- Image optimization on upload
- Copy URL to clipboard
- Delete unused media

### Storage
- Supabase Storage bucket: `public-media`
- RLS policies for public read, admin write
- Automatic thumbnail generation

---

## Phase 8: User Management

### Admin Features
- `/admin/users` - User list
- View user details
- Assign/remove roles
- Deactivate users
- Activity log per user

### Security
- Admins can manage roles
- Cannot remove own admin role
- Audit log for role changes

---

## Phase 9: Frontend Content Integration

### Replace Hardcoded Content
- Update all components to fetch from database
- Fallbacks for missing content
- Loading states
- Error handling

### Components to Update
- Hero.tsx
- WhySection.tsx
- ProgramsSection.tsx
- ExperienceSection.tsx
- TransformationsSection.tsx
- PricingSection.tsx
- ReviewsSection.tsx
- FinalCTA.tsx
- FloatingWhatsApp.tsx

---

## Phase 10: Testing & Polish

### Testing
- Admin auth flow
- Content CRUD operations
- Blog post creation and display
- Offers banner behavior
- Analytics tracking
- Media uploads
- SEO meta rendering
- Mobile responsiveness

### Polish
- Loading skeletons
- Error messages
- Success toasts
- Form validation
- Image optimization
- Performance audit
- Security audit

---

## Post-Implementation Instructions

### For User
1. Sign up at `/admin/login`
2. Open Lovable Cloud → Database → `user_roles` table
3. Insert: `user_id: <your-id>`, `role: admin`
4. Access admin dashboard at `/admin`
5. Go to Settings → Add GA4 Measurement ID
6. Start managing content!

### Future Enhancements
- Multi-language support
- Advanced A/B testing
- Email newsletter integration
- Member portal integration
- Booking system integration
- Payment processing
