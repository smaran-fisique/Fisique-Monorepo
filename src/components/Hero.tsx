import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import heroGym from "@/assets/hero-gym.webp";

export const Hero = () => {
  const whatsappNumber = "919515469444";
  const trialMessage = encodeURIComponent("Hi! I want to book a free trial at Fisique.");
  const conciergeMessage = encodeURIComponent("Hi! I'd like concierge assistance with plans and timings.");

  return (
    <section className="relative pt-[110px] pb-[100px] overflow-hidden perspective-[1000px]">
      <div 
        className="absolute inset-x-[-10%] top-[-20%] h-[95%] pointer-events-none"
        style={{ background: 'var(--gradient-radial-hero)' }}
      />
      
      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          <div className="space-y-7">
            <div className="inline-block">
              <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase">
                Kokapet • Luxury Personal Training
              </span>
            </div>
            
            <h1 className="text-[clamp(40px,5vw,64px)] leading-[1.05] tracking-tight font-black">
              Personal Training.{" "}
              <span className="text-gradient">Elevated</span> to an Art.
            </h1>
            
            <p className="text-[clamp(16px,1.8vw,18px)] text-muted-foreground max-w-[56ch]">
              Premium one-on-one coaching, nutrition that actually works, and sauna recovery - all under one roof. 
              Transformation starts with direction, not motivation.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-3">
              <Button 
                size="lg"
                asChild
              >
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${trialMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Free Trial
                </a>
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                asChild
              >
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${conciergeMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Concierge
                </a>
              </Button>
            </div>
          </div>

          <div className="relative rounded-[22px] overflow-hidden border border-border shadow-[var(--shadow-elegant)]">
            <span className="absolute right-4 top-4 z-10 bg-accent/10 backdrop-blur-sm text-[hsl(var(--accent-glow))] border border-accent/40 px-3.5 py-2.5 rounded-full font-bold text-[0.82rem] tracking-wide">
              Sauna • Nutrition • 1‑on‑1
            </span>
            <img 
              src={heroGym}
              alt="Premium luxury gym training space with modern equipment"
              className="w-full h-full object-cover aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
