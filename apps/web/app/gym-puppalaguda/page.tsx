import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import GymPuppalagudaContent from '@/components/pages/GymPuppalagudaContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-puppalaguda');
  return buildMetadata(seo, {
    title: 'Premium Gym Near Puppalaguda | Fisique Fitness Kokapet',
    description: 'Your closest premium fitness destination. Experience 1:1 personal training, nutrition counseling, and sauna recovery—all just 6 minutes from Puppalaguda.',
    path: '/gym-puppalaguda',
  });
}

export const revalidate = 3600;

const faqs = [
  {
    question: 'How far is Fisique Fitness from Puppalaguda?',
    answer: "Fisique Fitness is just 6 minutes from Puppalaguda. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via the Narsingi road.",
  },
  {
    question: 'What makes Fisique different from Puppalaguda gyms?',
    answer: 'Fisique is a boutique personal training studio with limited membership. Unlike commercial gyms, you get 1:1 coaching, certified trainers, customised nutrition, and a private sauna—all in a focused, uncrowded environment.',
  },
  {
    question: 'Do you have flexible timing for working professionals?',
    answer: "Absolutely! We're open 5:30 AM to 10 PM, Monday to Saturday. Personal training sessions are scheduled around your convenience—early morning, midday, or evening.",
  },
  {
    question: 'Is sauna included with membership?',
    answer: 'Sauna is included with all personal training packages. For gym-only members, sauna access is available as an add-on.',
  },
  {
    question: 'Can I get a free trial?',
    answer: 'Yes! We offer a free consultation and trial session. Contact us at +91-9515469444 to book.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Near Puppalaguda' },
];

export default function GymPuppalagudaPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymPuppalagudaContent />
    </>
  );
}
