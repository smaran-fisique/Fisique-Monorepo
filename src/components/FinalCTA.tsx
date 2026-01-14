import { Button } from "@/components/ui/button";
import { MapPin, MessageCircle } from "lucide-react";

export const FinalCTA = () => {
  return (
    <section className="py-24 md:py-32 text-center relative">
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] left-1/2 -translate-x-1/2 -top-32 opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom max-w-3xl relative z-10 px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Train Without Compromise
        </h2>

        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Whether you train solo or with your coach,
          <br className="hidden sm:block" />{" "}
          Fisique gives you a space that respects your seriousness.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            <a href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20know%20more%20about%20Fisique" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
