import { Dumbbell, Maximize, Users, Flame, Wrench, Focus } from "lucide-react";

const features = [
  {
    icon: Dumbbell,
    title: "Premium training equipment",
  },
  {
    icon: Maximize,
    title: "Spacious, well-planned layout",
  },
  {
    icon: Users,
    title: "Limited capacity access",
  },
  {
    icon: Flame,
    title: "On-site sauna",
  },
  {
    icon: Wrench,
    title: "Professionally maintained machines",
  },
  {
    icon: Focus,
    title: "Serious, distraction-free culture",
  },
];

export const StudioProvidesSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background-2">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
            What the Studio Gives You
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-5 rounded-xl bg-card/50 border border-border/50"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-foreground font-medium">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-12 text-lg">
            Everything here is designed to support consistency.
          </p>
          
        </div>
      </div>
    </section>
  );
};
