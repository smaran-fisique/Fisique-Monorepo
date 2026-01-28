import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { CoreOfferingsSection } from "@/components/CoreOfferingsSection";
import { StudioProvidesSection } from "@/components/StudioProvidesSection";
import { MembershipPlansSection } from "@/components/MembershipPlansSection";
import { TrainingOptionsSubSection } from "@/components/TrainingOptionsSubSection";
import { WhoIsForSection } from "@/components/WhoIsForSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { WebSiteSchema } from "@/components/WebSiteSchema";
import { Helmet } from "react-helmet-async";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  const { seo } = useSEO('/');
  
  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
        {seo.canonicalUrl && <link rel="canonical" href={seo.canonicalUrl} />}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/" />
      </Helmet>
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <CoreOfferingsSection />
        <StudioProvidesSection />
        <MembershipPlansSection />
        <TrainingOptionsSubSection />
        <WhoIsForSection />
        <ReviewsSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
