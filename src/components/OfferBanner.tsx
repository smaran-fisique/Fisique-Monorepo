import { useState, useEffect } from 'react';
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

export const OfferBanner = () => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchActiveOffer();
  }, []);

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

  if (!visible || !offer) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex-1 text-sm md:text-base">
          <strong>{offer.title}</strong>
          {offer.description && <span className="ml-2">{offer.description}</span>}
        </div>
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="secondary"
            size="sm"
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
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
