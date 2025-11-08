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
  return <section id="pricing" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight mb-3">
            {pricingData.title}
          </h2>
          <p className="text-muted-foreground max-w-[60ch]">
            {pricingData.subtitle}
          </p>
        </div>

        <div className={`grid gap-6 ${pricingData.tiers.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {pricingData.tiers.map((tier, index) => <div key={index} className="p-6 rounded-[16px] border border-border relative" style={{
          background: 'var(--gradient-card)'
        }}>
              <h3 className="text-[22px] font-bold mb-2">{tier.name}</h3>
              <p className="text-muted-foreground mb-3.5">{tier.description}</p>
              
              <ul className="space-y-2.5 mb-7">
                {tier.features.map((feature, fIndex) => <li key={fIndex} className="flex items-start gap-2.5 text-muted-foreground">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>)}
              </ul>

              <Button className="w-full" asChild>
                <a href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(tier.whatsappMessage)}`}>
                  {pricingData.ctaText}
                </a>
              </Button>
            </div>)}
        </div>
      </div>
    </section>;
};