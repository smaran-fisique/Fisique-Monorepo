import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import GymNarsingiContent from '@/components/pages/GymNarsingiContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-narsingi');
  return buildMetadata(seo, {
    title: 'Premium Gym Near Narsingi | Fisique Fitness Kokapet',
    description: "Your neighborhood's best-kept fitness secret. Experience boutique personal training just minutes from Narsingi.",
    path: '/gym-narsingi',
  });
}

export const revalidate = 3600;

const narsingiFAQs = [
  {
    question: 'How far is Fisique Fitness from Narsingi?',
    answer: "Fisique Fitness is just 3-5 minutes from Narsingi. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—an easy drive via the main road connecting Narsingi to Kokapet.",
  },
  {
    question: 'What makes this gym different from others near Narsingi?',
    answer: "Unlike crowded commercial gyms, Fisique is a boutique personal training studio. We offer 1:1 coaching, limited membership for personalized attention, private sauna, and certified trainers who create customized programs for your goals.",
  },
  {
    question: 'Do you offer morning and evening slots?',
    answer: "Yes! We're open 5:30 AM to 10 PM, Monday to Saturday. We have slots that fit any schedule—early morning for those who prefer to workout before work, or evening for after-work sessions.",
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes, Avant Cedar building has dedicated parking space for members. The gym is on the 4th floor with easy elevator access.',
  },
  {
    question: 'What services are available for Narsingi residents?',
    answer: 'We offer personal training packages (including our signature 90-day transformation), gym memberships, nutrition counseling, and sauna recovery. All services are designed for busy professionals and residents who want real results.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Near Narsingi' },
];

export default function GymNarsingiPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={narsingiFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymNarsingiContent />
    </>
  );
}
