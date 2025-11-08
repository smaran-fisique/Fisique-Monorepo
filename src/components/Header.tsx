import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, LogIn } from "lucide-react";
import fisiquelogo from "@/assets/fisique-logo.webp";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setScrollProgress(progress);
      setScrolled(scrollTop > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b border-border transition-all duration-300 ${
        scrolled ? "glass-header shadow-xl" : "glass-header"
      }`}
    >
      <div
        className="absolute left-0 right-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-accent-glow opacity-25 transition-all duration-300"
        style={{
          background: `linear-gradient(90deg, hsl(var(--accent)) ${scrollProgress}%, transparent ${scrollProgress}%)`,
        }}
      />

      <div className="container-custom">
        <nav className="flex items-center justify-between min-h-[70px]">
          <div className="flex items-center gap-3">
            <img src={fisiquelogo} alt="Fisique Fitness Logo" className="h-10 w-auto" />
          </div>

          <div className="hidden md:flex items-center gap-3">
            {[
              { id: "programs", label: "Programs" },
              { id: "pricing", label: "Pricing" },
              { id: "contact", label: "Contact" },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="px-3.5 py-2 rounded-lg opacity-90 hover:bg-[hsl(220_23%_8%)] hover:text-[hsl(var(--accent-glow))] transition-all duration-200 relative group"
              >
                {label}
                <span className="absolute left-3 right-3 bottom-1.5 h-0.5 bg-gradient-to-r from-transparent via-[hsl(var(--accent-glow))] to-transparent opacity-0 scale-x-50 group-hover:opacity-90 group-hover:scale-x-100 transition-all duration-300" />
              </button>
            ))}

            <Button
              asChild
              variant="outline"
              size="sm"
              className="ml-2 border-accent/30 hover:bg-accent/10 hover:border-accent"
            >
              <a href="https://member.fisique.fitness" target="_blank" rel="noopener noreferrer">
                Member Login
              </a>
            </Button>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => scrollToSection("contact")}>
              <MessageCircle className="w-4 h-4" />
            </Button>

            <Button asChild variant="ghost" size="sm">
              <a
                href="https://member.fisique.fitness"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Member Portal Login"
              >
                <LogIn className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
