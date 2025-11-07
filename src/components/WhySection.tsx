import { Users, Salad, Waves } from "lucide-react";

export const WhySection = () => {
  const features = [
    {
      icon: Users,
      title: "Elite Personal Coaching",
      description: "Science‑backed programs built around your body, goals, and lifestyle. No templates.",
    },
    {
      icon: Salad,
      title: "Nutrition That Works",
      description: "Certified guidance that respects how you live. Sustainable, enjoyable, and results‑driven.",
    },
    {
      icon: Waves,
      title: "Sauna + Recovery",
      description: "On‑site recovery that accelerates adaptation, reduces soreness, and keeps momentum high.",
    },
  ];

  return (
    <section className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight">
            Why Fisique
          </h2>
          <p className="text-muted-foreground max-w-[60ch] text-right">
            Not a regular gym. A high‑intent studio with expert coaches, realistic nutrition, and built‑in recovery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-[18px] border border-border shadow-[var(--shadow-elegant)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
                style={{ background: 'var(--gradient-card)' }}
              >
                <div className="mb-4 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
