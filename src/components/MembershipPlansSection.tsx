import { Button } from "@/components/ui/button";
import { Check, MessageCircle } from "lucide-react";

const plans = [
  {
    name: "Personal Training",
    priority: "P0",
    description: "One-on-one coaching with expert trainers",
    features: [
      "Customized workout programs",
      "Nutrition guidance included",
      "Progress tracking & accountability",
      "Sauna recovery sessions",
      "Flexible scheduling",
    ],
    cta: "Book a PT Trial",
    highlight: true,
  },
  {
    name: "Gym Membership",
    priority: "P1",
    description: "Premium equipment access for independent training",
    features: [
      "Full equipment access",
      "1, 3, 6, 12 month options",
      "Uncrowded, focused environment",
      "Sauna access included",
      "Professional maintenance",
    ],
    cta: "Request Pricing",
    highlight: false,
  },
];

export const MembershipPlansSection = () => {
  return (
    <section id="membership" className="py-24 md:py-32 bg-background">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-6">
            Membership Plans
          </h2>
          
          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto">
            Choose the training experience that fits your goals
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl border space-y-6 ${
                  plan.highlight 
                    ? 'bg-accent/5 border-accent/30' 
                    : 'bg-card border-border/50'
                }`}
              >
                {plan.highlight && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-accent bg-accent/10 rounded-full">
                    Most Popular
                  </span>
                )}
                
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {plan.description}
                  </p>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    plan.highlight 
                      ? 'bg-accent hover:bg-accent/90 text-accent-foreground' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                  asChild
                >
                  <a 
                    href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20know%20more%20about%20Fisique%20membership" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {plan.cta}
                  </a>
                </Button>
              </div>
            ))}
          </div>
          
          {/* P2: Freelance trainer note */}
          <div className="text-center p-6 rounded-xl bg-muted/30 border border-border/30">
            <p className="text-muted-foreground">
              <span className="text-foreground font-medium">Already have a trainer?</span>{" "}
              Freelance trainers and physiotherapists are welcome to train clients at Fisique.{" "}
              <a 
                href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20inquire%20about%20trainer%20access" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Contact us for trainer access options →
              </a>
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
};
