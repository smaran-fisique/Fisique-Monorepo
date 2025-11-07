import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhySection } from "@/components/WhySection";
import { ProgramsSection } from "@/components/ProgramsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { TransformationsSection } from "@/components/TransformationsSection";
import { PricingSection } from "@/components/PricingSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { OfferBanner } from "@/components/OfferBanner";

const Index = () => {
  return (
    <>
      <OfferBanner />
      <Header />
      <main>
        <Hero />
        <WhySection />
        <ProgramsSection />
        <ExperienceSection />
        <TransformationsSection />
        <PricingSection />
        <ReviewsSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
};

export default Index;
