import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { WhatIsFisiqueSection } from "@/components/WhatIsFisiqueSection";
import { TrainingOptionsSection } from "@/components/TrainingOptionsSection";
import { StudioProvidesSection } from "@/components/StudioProvidesSection";
import { WhatWeDontDoSection } from "@/components/WhatWeDontDoSection";
import { WhoIsForSection } from "@/components/WhoIsForSection";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
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
      </Helmet>
      
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <WhatIsFisiqueSection />
        <TrainingOptionsSection />
        <StudioProvidesSection />
        <WhatWeDontDoSection />
        <WhoIsForSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
};

export default Index;
