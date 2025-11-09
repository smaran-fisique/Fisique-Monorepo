import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import heroGym from "@/assets/hero-gym.webp";
import { useSection } from "@/hooks/useSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { CyclingText } from "@/components/CyclingText";

interface HeroData {
  badge: string;
  headline: string;
  headlineMiddle: string;
  cyclingWords: string[];
  description: string;
  ctaText: string;
  secondaryCtaText: string;
  backgroundOverlayOpacity?: number;
}

const defaultHeroData: HeroData = {
  badge: "Kokapet • Luxury Personal Training",
  headline: "Personal Training.",
  headlineMiddle: "Elevated through",
  cyclingWords: ["Precision", "Progress", "Expertise"],
  description: "Premium one-on-one coaching, nutrition that actually delivers, and sauna recovery — all crafted around your transformation. Because lasting results come from guidance, not guesswork.",
  ctaText: "Book a Free Trial",
  secondaryCtaText: "WhatsApp Concierge",
  backgroundOverlayOpacity: 0.6,
};

export const Hero = () => {
  const { data: heroData } = useSection<HeroData>('hero', defaultHeroData);
  const { settings } = useSiteSettings();
  const whatsappNumber = settings.whatsapp_number;
  const trialMessage = encodeURIComponent("Hi! I want to book a free trial at Fisique.");
  const conciergeMessage = encodeURIComponent("Hi! I'd like concierge assistance with plans and timings.");

  // Ensure cyclingWords has a fallback
  const cyclingWords = heroData.cyclingWords || defaultHeroData.cyclingWords;

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      
      {/* Layer 1: Photo Background - Peek Through Effect */}
      <div className="absolute inset-0">
        <img 
          src={heroGym}
          alt="Premium training facility"
          className="w-full h-full object-cover opacity-40 blur-[2px]"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      {/* Layer 2: Brand Color Gradients + Fun Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large cyan glow - top left */}
        <div 
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(186 68% 45% / 0.35) 0%, hsl(186 68% 45% / 0.15) 40%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
        
        {/* Light cyan glow - right side */}
        <div 
          className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(186 100% 76% / 0.28) 0%, hsl(186 100% 76% / 0.12) 40%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
        
        {/* Diagonal gradient sweep */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, hsl(186 68% 45% / 0.18) 0%, transparent 45%, hsl(186 100% 76% / 0.12) 100%)'
          }}
        />
        
        {/* Decorative glowing dots */}
        <div className="absolute top-24 right-[15%] w-2 h-2 rounded-full bg-accent-glow shadow-glow opacity-70" />
        <div className="absolute top-[40%] left-[12%] w-3 h-3 rounded-full bg-accent opacity-50" />
        <div className="absolute bottom-[25%] right-[20%] w-2.5 h-2.5 rounded-full bg-accent-glow opacity-60" />
      </div>
      
      {/* Layer 3: Vignette for Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/40" />
      
      {/* Layer 4: Bottom Fade to Black */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent via-background/60 to-background pointer-events-none" />
      
      {/* Layer 5: Content */}
      <div className="relative z-10 container-custom px-4 md:px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-7 md:space-y-8">
          
          {/* Badge */}
          <div className="inline-block">
            <span className="text-accent font-bold tracking-[0.2em] text-xs uppercase drop-shadow-lg">
              {heroData.badge}
            </span>
          </div>
          
          {/* Headline with Cycling Text */}
          <h1 className="text-[clamp(44px,7vw,80px)] leading-[1.08] tracking-tight font-black text-white drop-shadow-2xl">
            {heroData.headline}
            <br className="hidden sm:block" />
            {heroData.headlineMiddle}{" "}
            <CyclingText 
              words={cyclingWords}
              intervalMs={2000}
              className="inline-block"
            />
          </h1>
          
          {/* Description */}
          <p className="text-[clamp(17px,1.9vw,20px)] leading-relaxed text-white/95 max-w-3xl mx-auto drop-shadow-lg">
            {heroData.description}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button 
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-glow hover:shadow-glow-hover transition-all"
              asChild
            >
              <a href={`https://wa.me/${whatsappNumber}?text=${trialMessage}`}>
                {heroData.ctaText}
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/40 text-white hover:bg-white/15 font-semibold backdrop-blur-sm"
              asChild
            >
              <a href={`https://wa.me/${whatsappNumber}?text=${conciergeMessage}`}>
                <MessageCircle className="w-4 h-4 mr-2" />
                {heroData.secondaryCtaText}
              </a>
            </Button>
          </div>
          
        </div>
      </div>
    </section>
  );
};
