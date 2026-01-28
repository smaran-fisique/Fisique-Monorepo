

# Sticky Bottom CTA Bar for Lead Generation

## Overview
Add a persistent bottom CTA bar that appears on scroll, optimized for mobile-first lead generation. Based on CRO research, this bar will use a low-commitment message focused on booking a free trial rather than aggressive sales language.

---

## Research-Backed Decisions

| Best Practice | Our Implementation |
|---------------|-------------------|
| Mobile bottom placement (29% win rate vs 15% desktop) | Fixed to bottom on mobile, optionally subtle on desktop |
| Low-commitment CTA (+25% conversion) | "Book Free Trial" instead of "Join Now" |
| Semi-sticky behavior | Appears after scrolling past hero section |
| Non-intrusive design | Slim bar with dismiss option, respects user preference |
| Clear value proposition | Short text highlighting the free trial offer |

---

## Design Approach

```text
+----------------------------------------------------------+
|                    MOBILE VIEW                            |
+----------------------------------------------------------+
|                                                          |
|  [Page Content]                                          |
|                                                          |
|                                                          |
+----------------------------------------------------------+
| Ready to transform? | [Book Free Trial] [X]             |
+----------------------------------------------------------+
     ^-- Sticky bottom bar (appears after hero scroll)
```

### Visual Specifications
- **Background**: Semi-transparent dark with blur (matches header style)
- **Height**: 64-72px on mobile, 56px on desktop
- **Animation**: Slides up smoothly when triggered
- **Dismiss**: Small X button that hides bar for the session
- **Safe area**: Respects mobile browser bottom navigation

### Content Options

**Primary (Low Commitment - Recommended):**
- "Ready to start?" + "Book Free Trial" button

**Alternative A:**
- "Free PT Trial Available" + "Book Now" button

**Alternative B:**
- "Transform with us" + "Get Started" button

---

## Technical Implementation

### 1. Create StickyBottomCTA Component
**File:** `src/components/StickyBottomCTA.tsx`

Features:
- Uses `useState` to track visibility (scroll-based)
- Uses `useState` for dismissed state (session-only)
- Intersection Observer to detect when hero is scrolled past
- Responsive design (mobile-first, optional desktop)
- Smooth slide-up animation using existing animation utilities
- WhatsApp link with pre-filled message

### 2. Scroll Detection Logic
```tsx
// Show bar when user scrolls past hero section
const [isVisible, setIsVisible] = useState(false);
const [isDismissed, setIsDismissed] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    // Show after scrolling 600px (past hero)
    setIsVisible(window.scrollY > 600);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

### 3. Component Structure
```tsx
{isVisible && !isDismissed && (
  <div className="fixed bottom-0 left-0 right-0 z-40 
                  bg-background/95 backdrop-blur-md 
                  border-t border-border shadow-lg
                  animate-slide-up safe-area-pb">
    <div className="container-custom px-4 py-3 
                    flex items-center justify-between gap-4">
      <p className="text-sm text-foreground hidden sm:block">
        Ready to transform your fitness?
      </p>
      <div className="flex items-center gap-3 flex-1 sm:flex-none justify-end">
        <Button size="sm" asChild>
          <a href="https://wa.me/919515469444?text=...">
            <MessageCircle className="w-4 h-4 mr-2" />
            Book Free Trial
          </a>
        </Button>
        <button onClick={() => setIsDismissed(true)} 
                className="text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
)}
```

### 4. Add to Pages
**Files to modify:**
- `src/pages/Index.tsx` - Add component before Footer
- `src/pages/KokapetGym.tsx` - Add component
- `src/pages/PersonalTrainingKokapet.tsx` - Add component
- `src/pages/GymMembershipKokapet.tsx` - Add component

### 5. Relationship with FloatingWhatsApp
Two options:

**Option A (Recommended): Replace FloatingWhatsApp with Sticky Bar**
- The sticky bar provides the same function with better visibility
- Removes potential overlap/conflict on mobile
- Cleaner UX with single persistent CTA

**Option B: Keep Both, Adjust Positioning**
- Hide FloatingWhatsApp when sticky bar is visible
- FloatingWhatsApp stays on blog pages where sticky bar isn't needed

---

## Mobile Considerations

1. **Safe Area Padding**: Add `pb-safe` or `env(safe-area-inset-bottom)` for iPhone home indicator
2. **Thumb-Friendly**: CTA button positioned on right side for easy thumb access
3. **Performance**: Use `will-change-transform` for smooth animations
4. **Scroll Performance**: Throttle scroll handler with `requestAnimationFrame`

---

## Optional Enhancements (Future)

1. **A/B Test Different CTAs**: Track which message converts better
2. **Time-Delayed Appearance**: Show after 5 seconds instead of scroll
3. **Page-Specific Messages**: Different CTA text per page
4. **Countdown/Urgency**: "Limited slots available" (if applicable)
5. **Phone Call Option**: Add secondary "Call Us" button on desktop

---

## Files to Create/Modify

### New Files:
1. `src/components/StickyBottomCTA.tsx` - Main sticky bar component

### Files to Modify:
1. `src/pages/Index.tsx` - Import and add component
2. `src/pages/KokapetGym.tsx` - Import and add component
3. `src/pages/PersonalTrainingKokapet.tsx` - Import and add component
4. `src/pages/GymMembershipKokapet.tsx` - Import and add component
5. `src/index.css` - Add safe area utility if needed

### Optional Removal:
- Remove FloatingWhatsApp from pages where StickyBottomCTA is added to avoid redundancy

---

## Animation Addition (if not already present)
```css
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}
```

---

## Expected Impact

Based on the CRO research:
- **Minimum expected lift**: 8% increase in lead capture (from adding any sticky CTA)
- **Potential with optimized copy**: Up to 25% increase in trial bookings
- **Mobile-specific improvement**: 29% win rate on mobile visitors

The key is making the next action (booking a trial) effortless and always accessible without being intrusive.

