import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { AnimatedSection } from "@/components/offers/AnimatedSection";
import { AnimatedIPhone } from "@/components/offers/AnimatedIPhone";
import { CountdownTimer } from "@/components/offers/CountdownTimer";
import { StickyCTA } from "@/components/offers/StickyCTA";
import { OfferSchema } from "@/components/offers/OfferSchema";
import { trackCtaClick, trackScrollMilestone } from "@/components/offers/OfferAnalytics";
import { ChevronDown, Check, AlertTriangle } from "lucide-react";

const OFFER_SLUG = "iphone";
const WHATSAPP_LINK = "https://bit.ly/wa-offer-fisique";
const TARGET_DATE = new Date("2026-02-28T23:59:59");

const IPhoneOffer = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollMilestones = useRef<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollTop / docHeight, 1);
      setScrollProgress(progress);

      // Track scroll milestones
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (progress * 100 >= milestone && !scrollMilestones.current.has(milestone)) {
          scrollMilestones.current.add(milestone);
          trackScrollMilestone(milestone, OFFER_SLUG);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCtaClick = () => {
    trackCtaClick("Claim Offer", OFFER_SLUG);
  };

  return (
    <>
      <Helmet>
        <title>Win iPhone 16 | 3 Month Training Offer | Fisique Fitness Kokapet</title>
        <meta
          name="description"
          content="Join Fisique Fitness Kokapet for 3 months of personal training and get a chance to win an iPhone 16. Limited spots available. Offer ends Feb 28, 2026."
        />
        <link rel="canonical" href="https://fisique.fitness/offers/iphone" />
        <meta property="og:title" content="Win iPhone 16 | Fisique Fitness Kokapet" />
        <meta property="og:description" content="Train for 3 months and win an iPhone 16!" />
        <meta property="og:url" content="https://fisique.fitness/offers/iphone" />
        <meta property="og:type" content="website" />
      </Helmet>

      <OfferSchema
        name="Win iPhone 16 - 3 Month Training Offer"
        description="Join Fisique Fitness for 3 months of personal training and get a chance to win an iPhone 16."
        url="https://fisique.fitness/offers/iphone"
        validFrom="2026-01-01"
        validThrough="2026-02-28"
      />

      <Header />

      <main ref={containerRef} className="min-h-screen bg-background overflow-x-hidden">
        {/* Section 1: Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
            {/* Phone mockup - hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <AnimatedIPhone scrollProgress={scrollProgress} />
            </div>

            {/* Content */}
            <div className="text-center lg:text-left max-w-xl">
              <AnimatedSection sectionName="hero" offerSlug={OFFER_SLUG}>
                <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                  Limited Time Offer
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  3 Months with{" "}
                  <span className="text-gradient">Fisique</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8">
                  Commit to your transformation. Get a chance to win an{" "}
                  <strong className="text-foreground">iPhone 16</strong>.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
                  onClick={handleCtaClick}
                >
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                    Claim Your Spot
                  </a>
                </Button>
              </AnimatedSection>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-indicator">
            <span className="text-sm text-muted-foreground">Scroll to learn more</span>
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection sectionName="how_it_works" offerSlug={OFFER_SLUG}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center mb-12">
                How It Works
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    title: "Sign Up",
                    description: "Join our 3-month personal training program at Fisique Fitness Kokapet.",
                  },
                  {
                    step: "02",
                    title: "Train Hard",
                    description: "Work with our certified trainers and stay consistent for 90 days.",
                  },
                  {
                    step: "03",
                    title: "Win Big",
                    description: "Complete your journey and enter the draw for an iPhone 16.",
                  },
                ].map((item) => (
                  <div key={item.step} className="premium-card rounded-2xl p-6 text-center">
                    <div className="text-4xl font-bold text-accent/30 mb-4">{item.step}</div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 3: The Reframe */}
        <section className="py-20 px-4 bg-card/50">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection sectionName="reframe" offerSlug={OFFER_SLUG}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                It's Not About the iPhone
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                The real prize is the <span className="text-foreground font-semibold">transformation</span>. 
                In 90 days, you'll build strength, confidence, and habits that last a lifetime. 
                The iPhone? That's just the cherry on top.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 text-left max-w-xl mx-auto">
                {[
                  "Personalized training plan",
                  "1-on-1 coaching sessions",
                  "Nutrition guidance",
                  "Body composition tracking",
                  "Sauna recovery access",
                  "Community support",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 4: Countdown / Scarcity */}
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection sectionName="countdown" offerSlug={OFFER_SLUG}>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Offer Ends Soon
              </h2>
              <p className="text-muted-foreground mb-8">
                Don't miss your chance. The clock is ticking.
              </p>

              <CountdownTimer targetDate={TARGET_DATE} className="mb-10" />

              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
                onClick={handleCtaClick}
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Claim Your Spot Now
                </a>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Section 5: Loss Aversion */}
        <section className="py-20 px-4 bg-destructive/5">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedSection sectionName="loss_aversion" offerSlug={OFFER_SLUG}>
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                What If You Leave Without Acting?
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Another month passes. The same excuses. The same results. 
                <br />
                <span className="text-foreground font-medium">
                  Or you could start today.
                </span>
              </p>

              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 py-6 text-lg"
                onClick={handleCtaClick}
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Start Your Transformation
                </a>
              </Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Bottom padding for mobile sticky CTA */}
        <div className="h-24 md:hidden" />
      </main>

      {/* Mobile Sticky CTA */}
      <StickyCTA href={WHATSAPP_LINK} label="Claim Your Spot" offerSlug={OFFER_SLUG} />
    </>
  );
};

export default IPhoneOffer;
