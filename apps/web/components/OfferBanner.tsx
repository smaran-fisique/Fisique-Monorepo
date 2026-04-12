'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { sanityClient } from '@/lib/sanity';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Offer {
  _id: string;
  title: string;
  ctaText: string | null;
  ctaLink: string | null;
}

const QUERY = `*[_type == "offer" && isActive == true
  && (!defined(startDate) || startDate <= now())
  && (!defined(endDate) || endDate >= now())
] | order(endDate asc) [0] {
  _id, title, ctaText, ctaLink
}`;

const BANNER_HEIGHT = 44;

export const OfferBanner = () => {
  const pathname = usePathname();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [visible, setVisible] = useState(false);

  const isExcludedPage = pathname.startsWith('/offers') || pathname.startsWith('/admin');

  useEffect(() => {
    sanityClient.fetch<Offer | null>(QUERY).then((data) => {
      if (!data) return;
      const dismissedDate = localStorage.getItem('offer_banner_dismissed_date');
      const dismissedId = localStorage.getItem('offer_banner_dismissed');
      const today = new Date().toDateString();
      if (dismissedDate === today && dismissedId === data._id) return;
      setOffer(data);
      setVisible(true);
    }).catch(console.error);
  }, []);

  useEffect(() => {
    const shouldShow = visible && !isExcludedPage;
    if (shouldShow) {
      document.body.classList.add('has-offer-banner');
      document.documentElement.style.setProperty('--offer-banner-height', `${BANNER_HEIGHT}px`);
      document.body.style.paddingTop = `${BANNER_HEIGHT}px`;
    } else {
      document.body.classList.remove('has-offer-banner');
      document.documentElement.style.setProperty('--offer-banner-height', '0px');
      document.body.style.paddingTop = '0px';
    }
    return () => {
      document.body.classList.remove('has-offer-banner');
      document.documentElement.style.setProperty('--offer-banner-height', '0px');
      document.body.style.paddingTop = '0px';
    };
  }, [visible, isExcludedPage]);

  const handleDismiss = () => {
    if (offer) {
      localStorage.setItem('offer_banner_dismissed_date', new Date().toDateString());
      localStorage.setItem('offer_banner_dismissed', offer._id);
    }
    setVisible(false);
  };

  if (!visible || !offer || isExcludedPage) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground shadow-sm"
      style={{ height: BANNER_HEIGHT }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-3">
        <div className="flex-1 text-xs md:text-sm truncate">
          <strong>{offer.title}</strong>
        </div>
        <div className="flex items-center gap-2">
          {offer.ctaLink && offer.ctaText && (
            <Button asChild variant="secondary" size="sm" className="h-7 text-xs px-3">
              <a href={offer.ctaLink} target="_blank" rel="noopener noreferrer">
                {offer.ctaText}
              </a>
            </Button>
          )}
          <button
            onClick={handleDismiss}
            className="hover:bg-primary-foreground/20 p-1 rounded transition-colors"
            aria-label="Dismiss offer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
