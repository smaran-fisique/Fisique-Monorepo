import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import GymTellапурContent from '@/components/pages/GymTellапурContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-tellapur');
  return buildMetadata(seo, {
    title: 'Premium Gym Near Tellapur | Fisique Fitness Kokapet',
    description: "Looking for a gym that's worth the drive? Fisique Fitness offers boutique personal training—a 12-minute drive from Tellapur that delivers real results.",
    path: '/gym-tellapur',
  });
}

export const revalidate = 3600;

const faqs = [
  {
    question: 'How far is Fisique Fitness from Tellapur?',
    answer: "Fisique Fitness is approximately 12 minutes from Tellapur and Nallagandla. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—accessible via ORR or the Kokapet-Tellapur road.",
  },
  {
    question: 'Is the drive from Tellapur worth it?',
    answer: "Absolutely. Our Tellapur members consistently say the 12-minute drive is worth it for the quality of coaching, the boutique atmosphere, and the real results they achieve. You won't find this level of personalisation closer to home.",
  },
  {
    question: 'Do you serve Nallagandla residents too?',
    answer: 'Yes! Nallagandla is even closer at about 10 minutes. Many of our members come from both Tellapur and Nallagandla.',
  },
  {
    question: "What's the best route from Tellapur?",
    answer: "The quickest route is via ORR towards Financial District, then exit at Kokapet. It's a smooth 12-minute drive with minimal traffic, especially during early morning or evening hours.",
  },
  {
    question: 'Do you offer a free trial?',
    answer: 'Yes! We offer a free consultation and trial session for all prospective members. Contact us at +91-9515469444 to schedule yours.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Near Tellapur' },
];

export default function GymTellапурPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymTellапурContent />
    </>
  );
}
