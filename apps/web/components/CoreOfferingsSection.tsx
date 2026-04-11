import { Target, Dumbbell, Move, Apple } from "lucide-react";

const offerings = [
  {
    icon: Target,
    title: "Personalised Plans",
    description: "Comprehensive fitness assessment followed by training programs tailored specifically to your goals, body type, and lifestyle.",
  },
  {
    icon: Dumbbell,
    title: "Strength Training",
    description: "Progressive overload programs with expert supervision to build functional strength and muscle safely.",
  },
  {
    icon: Move,
    title: "Mobility and Flexibility",
    description: "Dedicated focus on joint mobility, posture correction, and injury prevention for long-term fitness.",
  },
  {
    icon: Apple,
    title: "Nutrition Guidance",
    description: "Data-driven meal plans and nutritional coaching included with personal training packages.",
  },
];

export const CoreOfferingsSection = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-background-2">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-5xl mx-auto">

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
            Our Core Offerings
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {offerings.map((offering, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-card border border-border/50 space-y-4 hover:border-accent/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <offering.icon className="w-6 h-6 text-accent" />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  {offering.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {offering.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
