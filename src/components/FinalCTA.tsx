import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const whatsappNumber = "919515469444";
  const consultMessage = encodeURIComponent("Hi! I want to book a free consultation at Fisique.");

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      className="py-[120px] text-center"
      style={{ 
        background: 'radial-gradient(60% 60% at 50% 0%, hsl(186 68% 45% / 0.18), transparent 60%)' 
      }}
    >
      <div className="container-custom max-w-[860px]">
        <h2 className="text-[clamp(32px,4vw,46px)] leading-[1.1] font-bold mb-3">
          Your transformation doesn't need motivation. It needs{" "}
          <span className="text-gradient">direction</span>.
        </h2>
        
        <p className="text-muted-foreground text-lg mb-5.5 max-w-[50ch] mx-auto">
          Start with a free consultation and let us calibrate a plan that fits your body and your life.
        </p>
        
        <div className="flex flex-wrap gap-3.5 justify-center">
          <Button 
            size="lg"
            asChild
          >
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${consultMessage}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start Your Journey
            </a>
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg"
            onClick={scrollToContact}
          >
            Visit Studio
          </Button>
        </div>
      </div>
    </section>
  );
};
