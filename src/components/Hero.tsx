import { Button } from "@/components/ui/button";
import { MapPin, Phone } from "lucide-react";
import heroGym from "@/assets/hero-gym-optimized.webp";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={heroGym} 
          alt="Private training studio interior" 
          className="w-full h-full object-cover opacity-30" 
          loading="eager" 
          fetchPriority="high" 
        />
      </div>
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      
      {/* Content */}
      <div className="relative z-10 container-custom px-4 md:px-6 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          
          {/* Eyebrow */}
          <span className="text-accent font-medium tracking-[0.15em] text-sm uppercase">
            Kokapet's Only Private Training Studio
          </span>
          
          {/* Main Headline */}
          <h1 className="text-[clamp(48px,8vw,88px)] leading-[0.95] tracking-tight font-black text-foreground">
            Private Training Studio
          </h1>
          
          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Train by yourself or with your own coach
            <br className="hidden sm:block" />
            in a focused, distraction-free environment.
          </p>
          
          {/* Clarity line */}
          <p className="text-sm md:text-base text-foreground/70 font-medium tracking-wide">
            No in-house personal training. No programs. No crowding.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow hover:shadow-glow-hover transition-all" 
              asChild
            >
              <a 
                href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Visit the Studio
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border hover:bg-secondary text-foreground font-semibold" 
              asChild
            >
              <a href="tel:+917671959610">
                <Phone className="w-4 h-4 mr-2" />
                Call 7671959610
              </a>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};
