import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import FreelanceTrainerKokapetContent from '@/components/pages/FreelanceTrainerKokapetContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/freelance-trainer-kokapet');
  return buildMetadata(seo, {
    title: 'Freelance Trainer Access in Kokapet | BYOT Gym | Fisique Fitness',
    description: 'Bring your own personal trainer to Fisique Fitness Kokapet. Premium gym access for freelance trainers, physiotherapists & their clients. Professional equipment, boutique environment.',
    path: '/freelance-trainer-kokapet',
  });
}

export const revalidate = 3600;

const freelanceKokapetFAQs = [
  {
    question: 'Can I bring my own personal trainer to Fisique Fitness?',
    answer: "Yes! We welcome freelance trainers and physiotherapists to train their clients at Fisique. We offer trainer access passes that allow you to use our premium equipment and facilities while working with your own coach.",
  },
  {
    question: 'How does the BYOT (Bring Your Own Trainer) program work?',
    answer: 'Your trainer gets facility access to bring you in for sessions. You benefit from our premium equipment, boutique environment, and optional sauna access while continuing with your trusted coach.',
  },
  {
    question: 'What facilities are available for freelance training?',
    answer: 'Full access to our strength training equipment, free weights, cable machines, cardio equipment, and functional training areas. Sauna access can be added for recovery sessions.',
  },
  {
    question: 'What are the costs for trainer access passes?',
    answer: 'We offer flexible pricing for trainers—daily, weekly, and monthly passes. Contact us at +91-9515469444 for current rates and to discuss your training needs.',
  },
  {
    question: 'Why should I train at Fisique instead of at home or a park?',
    answer: "Our studio offers climate-controlled comfort, professional-grade equipment, a boutique non-crowded environment, and sauna for recovery—all things that aren't available for outdoor or home training.",
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Freelance Trainer Access Kokapet' },
];

export default function FreelanceTrainerKokapetPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={freelanceKokapetFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FreelanceTrainerKokapetContent />
    </>
  );
}
