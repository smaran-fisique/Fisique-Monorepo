import { Button } from "@/components/ui/button";
import { Users, MessageCircle } from "lucide-react";

export const TrainingOptionsSubSection = () => {
  return (
    <section className="py-16 md:py-20 bg-background-2">
      <div className="container-custom px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">

          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7 text-accent" />
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-foreground">
            Already Have a Trainer?
          </h3>

          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
            Freelance trainers and physiotherapists are welcome to train clients at Fisique.
            Bring your coach and access our premium equipment and facilities.
          </p>

          <Button
            variant="outline"
            className="border-border hover:bg-secondary text-foreground"
            asChild
          >
            <a
              href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20inquire%20about%20freelance%20trainer%20access%20at%20Fisique"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Inquire on WhatsApp
            </a>
          </Button>

        </div>
      </div>
    </section>
  );
};
