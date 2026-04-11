// GA4 Event tracking for offer pages

export const trackSectionView = (sectionName: string, offerSlug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'section_view', {
      section_name: sectionName,
      offer_slug: offerSlug,
      page_path: `/offers/${offerSlug}`,
    });
  }
};

export const trackCtaClick = (ctaLabel: string, offerSlug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'cta_click', {
      cta_label: ctaLabel,
      offer_slug: offerSlug,
      page_path: `/offers/${offerSlug}`,
    });
  }
};

export const trackScrollMilestone = (percentage: number, offerSlug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll_milestone', {
      scroll_percentage: percentage,
      offer_slug: offerSlug,
      page_path: `/offers/${offerSlug}`,
    });
  }
};
