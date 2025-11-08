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
      className="py-[120px] text-center"
      style={{
        background: "radial-gradient(60% 60% at 50% 0%, hsl(186 68% 45% / 0.18), transparent 60%)",
      }}
    >
      <div className="container-custom max-w-[860px]">
        <h2 className="text-[clamp(32px,4vw,46px)] leading-[1.1] font-bold mb-3">
          {ctaData.headline} <span className="text-gradient">{ctaData.highlightedText}</span>.
        </h2>

        <p className="text-muted-foreground text-lg mb-5.5 max-w-[50ch] mx-auto">{ctaData.description}</p>

        <div className="flex flex-wrap gap-4 justify-center pt-6">
          <Button size="lg" asChild>
            <a href={`https://wa.me/${whatsappNumber}?text=${consultMessage}`}>{ctaData.primaryCTA}</a>
          </Button>

          <Button variant="ghost" size="lg" asChild>
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
