'use client';

import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { AboutSection } from '@/components/AboutSection';
import { CoreOfferingsSection } from '@/components/CoreOfferingsSection';
import { TrainingOptionsSubSection } from '@/components/TrainingOptionsSubSection';
import { WhoIsForSection } from '@/components/WhoIsForSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { FAQSection } from '@/components/FAQSection';
import { BlogPreviewSection } from '@/components/BlogPreviewSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';

export default function IndexContent() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <CoreOfferingsSection />
        <TrainingOptionsSubSection />
        <WhoIsForSection />
        <ReviewsSection />
        <FAQSection />
        <BlogPreviewSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
