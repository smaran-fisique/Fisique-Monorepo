import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import FreelanceTrainerNarsingiContent from '@/components/pages/FreelanceTrainerNarsingiContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/freelance-trainer-narsingi');
  return buildMetadata(seo, {
    title: 'Freelance Trainer Access Near Narsingi | BYOT Gym | Fisique Fitness',
    description: 'Freelance trainers near Narsingi: bring your clients to Fisique Fitness Kokapet. Premium gym access, professional equipment, boutique environment. Just 3 mins from Narsingi.',
    path: '/freelance-trainer-narsingi',
  });
}

export const revalidate = 3600;

const freelanceNarsingiFAQs = [
  {
    question: 'Where can freelance trainers in Narsingi train their clients?',
    answer: 'Fisique Fitness in Kokapet (just 3 mins from Narsingi) offers trainer access passes for freelance trainers and physiotherapists to bring their clients. Full equipment access in a boutique environment.',
  },
  {
    question: 'How far is Fisique from Narsingi for freelance training?',
    answer: "We're just 3-5 minutes from Narsingi via the main road to Kokapet. Located above Pulla Reddy Sweets in Avant Cedar—very convenient for Narsingi residents and trainers.",
  },
  {
    question: "What's included in the trainer access pass?",
    answer: 'Full access to strength equipment, free weights, cardio machines, and functional training areas. Sauna access for client recovery can be added. Flexible daily, weekly, or monthly passes available.',
  },
  {
    question: 'Can I train multiple clients at Fisique?',
    answer: "Yes! Trainer passes allow you to bring different clients throughout the day. It's a professional alternative to training clients at their homes or in parks.",
  },
  {
    question: 'Why choose Fisique over home or outdoor training?',
    answer: "Professional equipment your clients can't access at home, climate-controlled comfort, sauna for recovery, and a focused environment—all benefits that outdoor or home training can't match.",
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Freelance Trainer Access Near Narsingi' },
];

export default function FreelanceTrainerNarsingiPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={freelanceNarsingiFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FreelanceTrainerNarsingiContent />
    </>
  );
}
