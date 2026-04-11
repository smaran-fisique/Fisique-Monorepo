import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import GymManikondaContent from '@/components/pages/GymManikondaContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-manikonda');
  return buildMetadata(seo, {
    title: 'Premium Gym Near Manikonda | Fisique Fitness Kokapet',
    description: 'Tired of impersonal gyms in Manikonda? Drive 10 minutes to experience boutique personal training with certified coaches and sauna recovery.',
    path: '/gym-manikonda',
  });
}

export const revalidate = 3600;

const faqs = [
  {
    question: 'How far is Fisique Fitness from Manikonda?',
    answer: "Fisique Fitness is approximately 10 minutes from Manikonda. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—easily accessible via ORR or the Narsingi road.",
  },
  {
    question: 'Why should I travel to Kokapet instead of joining a gym in Manikonda?',
    answer: 'Most gyms in Manikonda are large, crowded commercial facilities. Fisique offers a boutique personal training experience with 1:1 coaching, a private sauna, and certified trainers—worth the short 10-minute drive.',
  },
  {
    question: 'Do you offer morning batches for Manikonda residents?',
    answer: "Yes! We open at 5:30 AM, so you can get a great workout before your commute. Our personal training sessions are flexible and scheduled around your convenience.",
  },
  {
    question: "What's included in a personal training package?",
    answer: 'Every PT package includes 1:1 coaching sessions, customised nutrition plans, progress tracking, sauna access, and our signature 90-day transformation program structure.',
  },
  {
    question: 'Can I visit for a trial before signing up?',
    answer: 'Absolutely! We offer free consultation and trial sessions. Contact us at +91-9515469444 to book yours.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Near Manikonda' },
];

export default function GymManikondaPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymManikondaContent />
    </>
  );
}
