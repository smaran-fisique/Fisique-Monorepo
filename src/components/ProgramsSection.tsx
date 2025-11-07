import { Dumbbell, TrendingDown, Zap, Move, Ruler, Award, type LucideIcon } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useSection } from "@/hooks/useSection";

interface Program {
  icon: string;
  title: string;
  description: string;
}

interface ProgramsData {
  title: string;
  subtitle: string;
  programs: Program[];
}

const iconMap: Record<string, LucideIcon> = {
  Dumbbell,
  TrendingDown,
  Zap,
  Move,
  Ruler,
  Award,
};

const defaultProgramsData: ProgramsData = {
  title: "Signature Programs",
  subtitle: "Specialist coaching for specific outcomes. Select what fits your next 90 days.",
  programs: [
    {
      icon: "Dumbbell",
      title: "Strength Program",
      description: "Progressive overload, impeccable form, durable results.",
    },
    {
      icon: "TrendingDown",
      title: "Fat‑Loss Program",
      description: "Calibrated training plus realistic nutrition for steady fat loss.",
    },
    {
      icon: "Zap",
      title: "Body Recomposition",
      description: "Lose fat, gain lean mass, improve shape and posture.",
    },
    {
      icon: "Move",
      title: "Mobility & Stability",
      description: "Move better, lift better, feel better. Joint‑smart training.",
    },
    {
      icon: "Ruler",
      title: "Posture Fix",
      description: "Desk‑job antidote: alignment, symmetry, pain reduction.",
    },
    {
      icon: "Award",
      title: "Transformation Journey",
      description: "High‑touch coaching with weekly audits and concierge support.",
    },
  ],
};

export const ProgramsSection = () => {
  const { data: programsData } = useSection<ProgramsData>('programs', defaultProgramsData);

  return (
    <section id="programs" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight mb-3">
            {programsData.title}
          </h2>
          <p className="text-muted-foreground max-w-[60ch]">
            {programsData.subtitle}
          </p>
        </div>

        {/* Mobile: Vertical Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {programsData.programs.map((program, index) => {
                const Icon = iconMap[program.icon] || Dumbbell;
                return (
                  <CarouselItem key={index}>
                    <article
                      className="border border-border rounded-[18px] overflow-hidden"
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
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-5">
          {programsData.programs.map((program, index) => {
            const Icon = iconMap[program.icon] || Dumbbell;
            return (
              <article
                key={index}
                className="border border-border rounded-[18px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
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
    </section>
  );
};
