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
  return <section id="experience" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="mb-7">
          <h2 className="font-bold tracking-tight mb-3 text-5xl text-cyan-500">
            {experienceData.title}
          </h2>
          <p className="text-muted-foreground w-full max-w-none\n">
            {experienceData.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {experienceData.experiences.map((exp, index) => <figure key={index} className="border border-border rounded-[18px] overflow-hidden bg-[hsl(220_23%_8%)] group">
              <div className="overflow-hidden">
                <img src={imageMap[exp.image] || exp.image} alt={exp.caption} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <figcaption className="p-3.5 border-t border-border text-muted-foreground text-sm">
                {exp.caption}
              </figcaption>
            </figure>)}
        </div>
      </div>
    </section>;
};