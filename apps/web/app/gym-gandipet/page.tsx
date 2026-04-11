import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import GymGandipetContent from '@/components/pages/GymGandipetContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-gandipet');
  return buildMetadata(seo, {
    title: 'Premium Gym Near Gandipet | Fisique Fitness Kokapet',
    description: 'Living near the lake but struggling to find a quality gym? Experience boutique personal training just 7 minutes from Gandipet.',
    path: '/gym-gandipet',
  });
}

export const revalidate = 3600;

const faqs = [
  {
    question: 'How far is Fisique Fitness from Gandipet?',
    answer: "Fisique Fitness is just 7 minutes from Gandipet and Khajaguda. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via Gandipet Road.",
  },
  {
    question: 'What makes Fisique better than gyms closer to Gandipet?',
    answer: "Fisique is a boutique personal training studio, not a crowded commercial gym. You get 1:1 certified coaching, a private sauna, customised nutrition plans, and a community atmosphere that larger gyms simply can't offer.",
  },
  {
    question: 'Do you cater to residents of Khajaguda too?',
    answer: 'Yes! Many of our members come from Khajaguda, which is just 5-6 minutes away. The drive to Fisique is short and easy via the Kokapet junction.',
  },
  {
    question: 'What are the membership options?',
    answer: 'We offer personal training packages (including our signature 90-day transformation), gym memberships (1, 3, 6, and 12-month plans), nutrition counseling, and sauna recovery sessions.',
  },
  {
    question: 'Is there a trial session available?',
    answer: 'Yes! We offer a free consultation and trial session for all new members. Contact us at +91-9515469444 to book yours.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Near Gandipet' },
];

export default function GymGandipetPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymGandipetContent />
    </>
  );
}
