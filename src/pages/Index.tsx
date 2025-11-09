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
import { Helmet } from "react-helmet-async";
import { useSEO } from "@/hooks/useSEO";
const Index = () => {
  const {
    seo
  } = useSEO('/');
  return <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <OfferBanner />
      <Header />
      <main>
        <Hero />
        <WhySection className="" />
        <ProgramsSection />
        <ExperienceSection />
        <TransformationsSection />
        <PricingSection />
        <ReviewsSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>;
};
export default Index;