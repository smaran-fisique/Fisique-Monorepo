import experienceCoaching from "@/assets/experience-coaching.jpg";
import experienceSauna from "@/assets/experience-sauna.jpg";
import experienceConsultation from "@/assets/experience-consultation.jpg";

export const ExperienceSection = () => {
  const experiences = [
    {
      image: experienceCoaching,
      caption: "1‑on‑1 coaching with real‑time form correction",
    },
    {
      image: experienceSauna,
      caption: "On‑site sauna recovery to accelerate adaptation",
    },
    {
      image: experienceConsultation,
      caption: "In‑depth consultation to align goals and plan",
    },
  ];

  return (
    <section id="experience" className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight">
            The Fisique Experience
          </h2>
          <p className="text-muted-foreground max-w-[60ch] md:text-right">
            Training designed for clarity, discipline, and results. Every session feels intentional and progress‑driven.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <figure
              key={index}
              className="border border-border rounded-[18px] overflow-hidden bg-[hsl(220_23%_8%)] group"
            >
              <div className="overflow-hidden">
                <img
                  src={exp.image}
                  alt={exp.caption}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="p-3.5 border-t border-border text-muted-foreground text-sm">
                {exp.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
