'use client';

import { Button } from "@/components/ui/button";
import { trackCtaClick } from "./OfferAnalytics";

interface StickyCtaProps {
  href: string;
  label: string;
  offerSlug: string;
}

export const StickyCTA = ({ href, label, offerSlug }: StickyCtaProps) => {
  const handleClick = () => {
    trackCtaClick(label, offerSlug);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-background via-background to-transparent pb-safe md:hidden">
      <Button
        asChild
        size="lg"
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg py-6 shadow-lg shadow-accent/20"
        onClick={handleClick}
      >
        <a href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      </Button>
    </div>
  );
};
