import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import fisiquelogo from "@/assets/fisique-logo.webp";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <nav className="flex items-center justify-between min-h-[70px]">
          {/* Logo */}
          <a href="/">
            <img 
              src={fisiquelogo} 
              alt="Fisique Fitness Logo" 
              width={157} 
              height={40} 
              className="h-10 w-auto" 
            />
          </a>

          {/* Right side - minimal nav */}
          <div className="flex items-center gap-3">
            <Button 
              asChild 
              variant="ghost" 
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <a 
                href="https://member.fisique.fitness" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Member Login
              </a>
            </Button>
            
            <Button 
              asChild 
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <a href="tel:+917671959610">
                <Phone className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Call Us</span>
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
