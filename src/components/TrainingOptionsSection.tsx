import { User, Users } from "lucide-react";

export const TrainingOptionsSection = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container-custom px-4 md:px-6">
        
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-16">
          Two Ways to Train
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1 - Train Yourself */}
          <div className="premium-card rounded-2xl p-8 md:p-10 space-y-6">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
              <User className="w-7 h-7 text-accent" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Train by Yourself
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              For experienced lifters and disciplined individuals
              who already follow a structured routine.
            </p>
            
            <div className="space-y-4 pt-2">
              <p className="text-sm font-medium text-accent uppercase tracking-wider">
                What this unlocks
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  World-class strength and conditioning equipment
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Predictable access without crowding
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Clean, focused training floor
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Sauna-supported recovery
                </li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-foreground/80 text-sm leading-relaxed">
                No coaching. No interference.
                <br />
                Just a space that respects your intent.
              </p>
            </div>
          </div>
          
          {/* Card 2 - BYOT */}
          <div className="premium-card rounded-2xl p-8 md:p-10 space-y-6">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center">
              <Users className="w-7 h-7 text-accent" />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Bring Your Own Trainer
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Already working with a personal trainer, physio, or coach?
              <br />
              Bring them with you.
            </p>
            
            <div className="space-y-4 pt-2">
              <p className="text-sm font-medium text-accent uppercase tracking-wider">
                What this unlocks
              </p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  External trainers are welcome
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  No in-house coaching conflict
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Professional-grade training environment
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Recovery built into your routine
                </li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-border">
              <p className="text-foreground/80 text-sm leading-relaxed">
                Keep your coach.
                <br />
                Upgrade everything else.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
