import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useSection } from "@/hooks/useSection";
import { useSiteSettings } from "@/hooks/useSiteSettings";
interface PricingTier {
  name: string;
  description: string;
  features: string[];
  whatsappMessage: string;
}
interface PricingData {
  title: string;
  subtitle: string;
  ctaText: string;
  tiers: PricingTier[];
}
const defaultPricingData: PricingData = {
  title: "Membership • By Consultation",
  subtitle: "We recommend the right program after your in‑depth consultation. Pricing is shared by concierge based on frequency and goals.",
  ctaText: "Request Pricing on WhatsApp",
  tiers: [{
    name: "Standard PT",
    description: "Core personal training with built‑in access and guidance.",
    features: ["1‑on‑1 Personal Training", "Gym Access Included", "Nutrition Guidance", "Sauna Access", "Trainer Concierge Support"],
    whatsappMessage: "Hi! Could you share pricing for Standard PT at Fisique?"
  }, {
    name: "Intensive PT",
    description: "Higher frequency, deeper accountability, faster change.",
    features: ["High‑Frequency Coaching", "Complete Diet Planning", "Weekly Progress Audits", "Priority Booking", "Sauna + Recovery"],
    whatsappMessage: "Hi! Could you share pricing for Intensive PT at Fisique?"
  }]
};
export const PricingSection = () => {
  const {
    data: pricingData
  } = useSection<PricingData>('pricing', defaultPricingData);
  const {
    settings
  } = useSiteSettings();
  const whatsappNumber = settings.whatsapp_number;
  return <section id="pricing" className="premium-section py-20 border-t border-border">
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="premium-glow-orb w-[500px] h-[500px] -left-32 bottom-20"
          style={{
            background: 'radial-gradient(circle, hsl(186 68% 45% / 0.2) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mb-12">
          <h2 className="tracking-tight mb-4 text-5xl font-bold text-gradient">
            {pricingData.title}
          </h2>
          <p className="text-foreground/80 text-lg max-w-3xl">
            {pricingData.subtitle}
          </p>
        </div>

        <div className={`grid gap-6 ${pricingData.tiers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {pricingData.tiers.map((tier, index) => <div key={index} className="premium-card p-8 rounded-2xl relative">
              <h3 className="text-2xl font-bold mb-3 text-foreground">{tier.name}</h3>
              <p className="text-muted-foreground mb-6 text-base">{tier.description}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature, fIndex) => <li key={fIndex} className="flex items-start gap-3 text-foreground/80">
                    <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>)}
              </ul>

              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow hover:shadow-glow-hover transition-all" asChild>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tier.whatsappMessage)}`}>
                  {pricingData.ctaText}
                </a>
              </Button>
            </div>)}
        </div>
      </div>
    </section>;
};