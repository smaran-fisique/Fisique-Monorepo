import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const PricingSection = () => {
  const whatsappNumber = "919515469444";

  const tiers = [
    {
      name: "Standard PT",
      description: "Core personal training with built‑in access and guidance.",
      features: [
        "1‑on‑1 Personal Training",
        "Gym Access Included",
        "Nutrition Guidance",
        "Sauna Access",
        "Trainer Concierge Support",
      ],
      message: encodeURIComponent("Hi! Could you share pricing for Standard PT at Fisique?"),
    },
    {
      name: "Intensive PT",
      description: "Higher frequency, deeper accountability, faster change.",
      features: [
        "High‑Frequency Coaching",
        "Complete Diet Planning",
        "Weekly Progress Audits",
        "Priority Booking",
        "Sauna + Recovery",
      ],
      message: encodeURIComponent("Hi! Could you share pricing for Intensive PT at Fisique?"),
    },
  ];

  return (
    <section id="pricing" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight">
            Membership • By Consultation
          </h2>
          <p className="text-muted-foreground max-w-[60ch] md:text-right">
            We recommend the right program after your in‑depth consultation. Pricing is shared by concierge based on frequency and goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="p-6 rounded-[16px] border border-border relative"
              style={{ background: 'var(--gradient-card)' }}
            >
              <h3 className="text-[22px] font-bold mb-2">{tier.name}</h3>
              <p className="text-muted-foreground mb-3.5">{tier.description}</p>
              
              <ul className="space-y-2.5 mb-4.5">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-2.5 text-muted-foreground">
                    <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${tier.message}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Pricing on WhatsApp
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
