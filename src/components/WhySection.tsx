import { Users, Salad, Waves, type LucideIcon } from "lucide-react";
import { useSection } from "@/hooks/useSection";
interface Feature {
  icon: string;
  title: string;
  description: string;
}
interface WhyData {
  title: string;
  subtitle: string;
  features: Feature[];
}
const iconMap: Record<string, LucideIcon> = {
  Users,
  Salad,
  Waves
};
const defaultWhyData: WhyData = {
  title: "Why Fisique",
  subtitle: "Not a regular gym. A high‑intent studio with expert coaches, realistic nutrition, and built‑in recovery.",
  features: [{
    icon: "Users",
    title: "Elite Personal Coaching",
    description: "Science‑backed programs built around your body, goals, and lifestyle. No templates."
  }, {
    icon: "Salad",
    title: "Nutrition That Works",
    description: "Certified guidance that respects how you live. Sustainable, enjoyable, and results‑driven."
  }, {
    icon: "Waves",
    title: "Sauna + Recovery",
    description: "On‑site recovery that accelerates adaptation, reduces soreness, and keeps momentum high."
  }]
};
export const WhySection = () => {
  const {
    data: whyData
  } = useSection<WhyData>('why', defaultWhyData);
  return <section className="premium-section py-20 border-t border-border">
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="premium-glow-orb w-[500px] h-[500px] -left-32 top-20"
          style={{
            background: 'radial-gradient(circle, hsl(186 68% 45% / 0.2) 0%, transparent 70%)',
          }}
        />
        <div 
          className="premium-glow-orb w-[400px] h-[400px] -right-20 bottom-20"
          style={{
            background: 'radial-gradient(circle, hsl(186 100% 76% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mb-12">
          <h2 className="tracking-tight mb-4 text-5xl font-bold text-gradient">
            {whyData.title}
          </h2>
          <p className="text-foreground/80 text-lg max-w-3xl">
            {whyData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {whyData.features.map((feature, index) => {
          const Icon = iconMap[feature.icon] || Users;
          return <div key={index} className="premium-card p-7 rounded-2xl">
                <div className="mb-5 w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center shadow-glow">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>;
        })}
        </div>
      </div>
    </section>;
};