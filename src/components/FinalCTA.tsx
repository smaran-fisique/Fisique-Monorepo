import { Button } from "@/components/ui/button";
import { useSection } from "@/hooks/useSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
interface FinalCTAData {
  headline: string;
  highlightedText: string;
  description: string;
  primaryCTA: string;
  secondaryCTA: string;
  whatsappMessage: string;
}
const defaultFinalCTAData: FinalCTAData = {
  headline: "Your transformation doesn't need motivation. It needs",
  highlightedText: "direction",
  description: "Start with a free consultation and let us calibrate a plan that fits your body and your life.",
  primaryCTA: "Start Your Journey",
  secondaryCTA: "Visit Studio",
  whatsappMessage: "Hi! I want to book a free consultation at Fisique.",
};
export const FinalCTA = () => {
  const { data: ctaData } = useSection<FinalCTAData>("cta", defaultFinalCTAData);
  const { settings } = useSiteSettings();
  const whatsappNumber = settings.whatsapp_number;
  const consultMessage = encodeURIComponent(ctaData.whatsappMessage);
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <section
      className="premium-section py-32 text-center"
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="premium-glow-orb w-[600px] h-[600px] left-1/2 -translate-x-1/2 -top-32"
          style={{
            background: 'radial-gradient(circle, hsl(186 68% 45% / 0.25) 0%, transparent 70%)',
          }}
        />
        <div 
          className="premium-glow-orb w-[400px] h-[400px] left-1/4 bottom-0"
          style={{
            background: 'radial-gradient(circle, hsl(186 100% 76% / 0.15) 0%, transparent 70%)',
          }}
        />
        <div 
          className="premium-glow-orb w-[400px] h-[400px] right-1/4 bottom-0"
          style={{
            background: 'radial-gradient(circle, hsl(186 100% 76% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom max-w-[860px] relative z-10">
        <h2 className="text-[clamp(36px,5vw,52px)] leading-[1.1] font-bold mb-5">
          {ctaData.headline} <span className="text-gradient">{ctaData.highlightedText}</span>.
        </h2>

        <p className="text-foreground/70 text-lg mb-10 max-w-[50ch] mx-auto">{ctaData.description}</p>

        <div className="flex flex-wrap gap-4 justify-center pt-4">
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-glow-hover transition-all" asChild>
            <a href={`https://wa.me/${whatsappNumber}?text=${consultMessage}`}>{ctaData.primaryCTA}</a>
          </Button>

          <Button variant="outline" size="lg" className="border-foreground/30 text-foreground hover:bg-foreground/10" asChild>
            <a
              href="https://www.google.com/maps/place/Fisique+Fitness+-+Best+Gym+in+Kokapet/@17.3871076,78.3375157,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb95d94e825109:0x6ba7f754df2b8672!8m2!3d17.3871076!4d78.3400906!16s%2Fg%2F11y3l06b_5?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              {ctaData.secondaryCTA}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
