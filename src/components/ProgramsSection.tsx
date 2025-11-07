import { Dumbbell, TrendingDown, Zap, Move, Ruler, Award } from "lucide-react";

export const ProgramsSection = () => {
  const programs = [
    {
      icon: Dumbbell,
      title: "Strength Program",
      description: "Progressive overload, impeccable form, durable results.",
    },
    {
      icon: TrendingDown,
      title: "Fat‑Loss Program",
      description: "Calibrated training plus realistic nutrition for steady fat loss.",
    },
    {
      icon: Zap,
      title: "Body Recomposition",
      description: "Lose fat, gain lean mass, improve shape and posture.",
    },
    {
      icon: Move,
      title: "Mobility & Stability",
      description: "Move better, lift better, feel better. Joint‑smart training.",
    },
    {
      icon: Ruler,
      title: "Posture Fix",
      description: "Desk‑job antidote: alignment, symmetry, pain reduction.",
    },
    {
      icon: Award,
      title: "Transformation Journey",
      description: "High‑touch coaching with weekly audits and concierge support.",
    },
  ];

  return (
    <section id="programs" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight">
            Signature Programs
          </h2>
          <p className="text-muted-foreground max-w-[60ch] md:text-right">
            Specialist coaching for specific outcomes. Select what fits your next 90 days.
          </p>
        </div>

        <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          <div className="flex md:grid md:grid-cols-3 gap-4 min-w-max md:min-w-0">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <article
                  key={index}
                  className="min-w-[280px] md:min-w-0 border border-border rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  style={{ background: 'var(--gradient-card)' }}
                >
                  <div className="p-5 flex flex-col h-full">
                    <div className="mb-4 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h4 className="text-lg font-bold mb-1.5">{program.title}</h4>
                    <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
                      {program.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
