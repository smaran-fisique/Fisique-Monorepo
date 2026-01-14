import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import fisiquelogo from "@/assets/fisique-logo.webp";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container-custom px-4">
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

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-3">
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
                  Call Us
                </a>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2 text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-[70px] left-0 right-0 z-50 bg-background border-b border-border md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container-custom px-4 py-6 space-y-4">
          <a 
            href="https://member.fisique.fitness" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block py-3 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(false)}
          >
            Member Login
          </a>
          
          <Button 
            asChild 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <a href="tel:+917671959610" onClick={() => setMenuOpen(false)}>
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </a>
          </Button>
        </div>
      </div>
    </>
  );
};
