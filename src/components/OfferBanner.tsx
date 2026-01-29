import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface Offer {
  id: string;
  title: string;
  description: string | null;
  cta_text: string;
  cta_link: string;
}

const BANNER_HEIGHT = 44; // px - keep in sync with CSS

export const OfferBanner = () => {
  const location = useLocation();
  const [offer, setOffer] = useState<Offer | null>(null);
  const [visible, setVisible] = useState(false);

  // Only show on homepage (not on /offers, /admin, etc.)
  const isHomepage = location.pathname === '/';

  useEffect(() => {
    fetchActiveOffer();
  }, []);

  // Add/remove body class and CSS variable when visibility changes
  useEffect(() => {
    const shouldShow = visible && isHomepage;
    if (shouldShow) {
      document.body.classList.add('has-offer-banner');
      document.documentElement.style.setProperty('--offer-banner-height', `${BANNER_HEIGHT}px`);
    } else {
      document.body.classList.remove('has-offer-banner');
      document.documentElement.style.setProperty('--offer-banner-height', '0px');
    }
    return () => {
      document.body.classList.remove('has-offer-banner');
      document.documentElement.style.setProperty('--offer-banner-height', '0px');
    };
  }, [visible, isHomepage]);

  const fetchActiveOffer = async () => {
    try {
      const { data, error } = await supabase
        .from('offers')
        .select('id, title, description, cta_text, cta_link')
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString())
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error || !data) return;

      // Check if offer was dismissed today
      const dismissedDate = localStorage.getItem('offer_banner_dismissed_date');
      const dismissedId = localStorage.getItem('offer_banner_dismissed');
      const today = new Date().toDateString();

      if (dismissedDate === today && dismissedId === data.id) {
        return; // Don't show if dismissed today
      }

      setOffer(data);
      setVisible(true);
    } catch (error) {
      console.error('Error fetching offer:', error);
    }
  };

  const handleDismiss = () => {
    if (offer) {
      localStorage.setItem('offer_banner_dismissed_date', new Date().toDateString());
      localStorage.setItem('offer_banner_dismissed', offer.id);
    }
    setVisible(false);
  };

  if (!visible || !offer || !isHomepage) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[60] bg-primary text-primary-foreground shadow-sm"
      style={{ height: BANNER_HEIGHT }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between gap-3">
        <div className="flex-1 text-xs md:text-sm truncate">
          <strong>{offer.title}</strong>
          {offer.description && <span className="ml-2 hidden sm:inline">{offer.description}</span>}
        </div>
        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="secondary"
            size="sm"
            className="h-7 text-xs px-3"
          >
            <a href={offer.cta_link} target="_blank" rel="noopener noreferrer">
              {offer.cta_text}
            </a>
          </Button>
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
