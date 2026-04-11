'use client';

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
  Award
};
const defaultProgramsData: ProgramsData = {
  title: "Signature Programs",
  subtitle: "Specialist coaching for specific outcomes. Select what fits your next 90 days.",
  programs: [{
    icon: "Dumbbell",
    title: "Strength Program",
    description: "Progressive overload, impeccable form, durable results."
  }, {
    icon: "TrendingDown",
    title: "Fat‑Loss Program",
    description: "Calibrated training plus realistic nutrition for steady fat loss."
  }, {
    icon: "Zap",
    title: "Body Recomposition",
    description: "Lose fat, gain lean mass, improve shape and posture."
  }, {
    icon: "Move",
    title: "Mobility & Stability",
    description: "Move better, lift better, feel better. Joint‑smart training."
  }, {
    icon: "Ruler",
    title: "Posture Fix",
    description: "Desk‑job antidote: alignment, symmetry, pain reduction."
  }, {
    icon: "Award",
    title: "Transformation Journey",
    description: "High‑touch coaching with weekly audits and concierge support."
  }]
};
export const ProgramsSection = () => {
  const {
    data: programsData
  } = useSection<ProgramsData>('programs', defaultProgramsData);
  return <section id="programs" className="premium-section py-20 border-t border-border">
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="premium-glow-orb w-[450px] h-[450px] -right-32 top-32"
          style={{
            background: 'radial-gradient(circle, hsl(186 100% 76% / 0.18) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mb-12">
          <h2 className="font-bold tracking-tight mb-4 text-5xl text-gradient">
            {programsData.title}
          </h2>
          <p className="text-foreground/80 text-lg max-w-3xl">
            {programsData.subtitle}
          </p>
        </div>

        {/* Mobile: Vertical Carousel */}
        <div className="md:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {programsData.programs.map((program, index) => {
              const Icon = iconMap[program.icon] || Dumbbell;
              return <CarouselItem key={index}>
                    <article className="premium-card rounded-2xl overflow-hidden">
                      <div className="p-6 flex flex-col h-full">
                        <div className="mb-5 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shadow-glow">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <h4 className="text-lg font-bold mb-2.5">{program.title}</h4>
                        <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
                          {program.description}
                        </p>
                      </div>
                    </article>
                  </CarouselItem>;
            })}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-4">
              <CarouselPrevious className="static translate-x-0 translate-y-0" />
              <CarouselNext className="static translate-x-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {programsData.programs.map((program, index) => {
          const Icon = iconMap[program.icon] || Dumbbell;
          return <article key={index} className="premium-card rounded-2xl overflow-hidden">
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-5 w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shadow-glow">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="text-lg font-bold mb-2.5">{program.title}</h4>
                  <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
                    {program.description}
                  </p>
                </div>
              </article>;
        })}
        </div>
      </div>
    </section>;
};
