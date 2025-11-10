import experienceCoaching from "@/assets/experience-coaching.jpg";
import experienceSauna from "@/assets/experience-sauna.jpg";
import experienceConsultation from "@/assets/experience-consultation.jpg";
import { useSection } from "@/hooks/useSection";
interface Experience {
  image: string;
  caption: string;
}
interface ExperienceData {
  title: string;
  subtitle: string;
  experiences: Experience[];
}
const imageMap: Record<string, string> = {
  experienceCoaching,
  experienceSauna,
  experienceConsultation
};
const defaultExperienceData: ExperienceData = {
  title: "The Fisique Experience",
  subtitle: "Training designed for clarity, discipline, and results. Every session feels intentional and progress‑driven.",
  experiences: [{
    image: "experienceCoaching",
    caption: "1‑on‑1 coaching with real‑time form correction"
  }, {
    image: "experienceSauna",
    caption: "On‑site sauna recovery to accelerate adaptation"
  }, {
    image: "experienceConsultation",
    caption: "In‑depth consultation to align goals and plan"
  }]
};
export const ExperienceSection = () => {
  const {
    data: experienceData
  } = useSection<ExperienceData>('experience', defaultExperienceData);
  return <section id="experience" className="premium-section py-20 border-t border-border">
      {/* Premium background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="premium-glow-orb w-[500px] h-[500px] -right-32 top-40"
          style={{
            background: 'radial-gradient(circle, hsl(186 100% 76% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="mb-12">
          <h2 className="font-bold tracking-tight mb-4 text-5xl text-gradient">
            {experienceData.title}
          </h2>
          <p className="text-foreground/80 text-lg max-w-3xl">
            {experienceData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {experienceData.experiences.map((exp, index) => <figure key={index} className="premium-card rounded-2xl overflow-hidden group">
              <div className="overflow-hidden">
                <img src={imageMap[exp.image] || exp.image} alt={exp.caption} width={660} height={495} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
              </div>
              <figcaption className="p-4 border-t border-border/50 text-foreground/70 text-sm">
                {exp.caption}
              </figcaption>
            </figure>)}
        </div>
      </div>
    </section>;
};