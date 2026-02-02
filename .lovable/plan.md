

# Implement Favicon Updates

## Overview

Copy the uploaded favicon files to the project and update `index.html` with proper favicon links to fix Google displaying the wrong icon.

## Step 1: Copy Favicon Assets to Public Directory

Copy all 7 uploaded files to `public/`:

| Source | Destination |
|--------|-------------|
| `user-uploads://favicon.ico` | `public/favicon.ico` |
| `user-uploads://favicon.svg` | `public/favicon.svg` |
| `user-uploads://favicon-96x96.png` | `public/favicon-96x96.png` |
| `user-uploads://apple-touch-icon.png` | `public/apple-touch-icon.png` |
| `user-uploads://web-app-manifest-192x192.png` | `public/web-app-manifest-192x192.png` |
| `user-uploads://web-app-manifest-512x512.png` | `public/web-app-manifest-512x512.png` |
| `user-uploads://site.webmanifest` | `public/site.webmanifest` |

## Step 2: Update index.html

Replace current favicon links (lines 56-57) with comprehensive setup:

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">

<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

<!-- Web Manifest -->
<link rel="manifest" href="/site.webmanifest">

<!-- Theme Color -->
<meta name="theme-color" content="#0a0c0f">
```

## Step 3: Update site.webmanifest

Modify the manifest with correct branding:
- Change `name` from "Fisique " to "Fisique Fitness"
- Update `theme_color` and `background_color` to `#0a0c0f` (dark theme)

## Step 4: Delete Old Favicon

Remove the non-standard file:
- `public/favicon.jpg`

## Files Summary

| Action | File |
|--------|------|
| Replace | `public/favicon.ico` |
| Add | `public/favicon.svg` |
| Add | `public/favicon-96x96.png` |
| Add | `public/apple-touch-icon.png` |
| Add | `public/web-app-manifest-192x192.png` |
| Add | `public/web-app-manifest-512x512.png` |
| Add | `public/site.webmanifest` |
| Modify | `index.html` |
| Delete | `public/favicon.jpg` |

