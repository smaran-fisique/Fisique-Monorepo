import { useState, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const StickyBottomCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show after scrolling 600px (past hero section)
          setIsVisible(window.scrollY > 600);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || isDismissed) return null;

  const message = encodeURIComponent(
    "Hi! I'm interested in booking a free trial at Fisique Fitness."
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border shadow-lg animate-slide-up will-change-transform"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-custom px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-foreground hidden sm:block">
          Ready to transform your fitness?
        </p>
        <div className="flex items-center gap-3 flex-1 sm:flex-none justify-end">
          <Button size="sm" asChild>
            <a href={`https://wa.me/919515469444?text=${message}`}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Book Free Trial
            </a>
          </Button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
