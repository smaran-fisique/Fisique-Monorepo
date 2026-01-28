import { Check } from "lucide-react";

const criteria = [
  "You want expert guidance to accelerate your results",
  "You value quality equipment over crowded gyms",
  "You care about recovery as much as workouts",
  "You want accountability and progress tracking",
  "You're ready to invest in your health seriously",
];

export const WhoIsForSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background-2">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            This Space Is For You If
          </h2>
          
          <ul className="space-y-4 text-lg md:text-xl text-left max-w-xl mx-auto">
            {criteria.map((item, index) => (
              <li 
                key={index}
                className="flex items-start gap-4 text-muted-foreground"
              >
                <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          
        </div>
      </div>
    </section>
  );
};
