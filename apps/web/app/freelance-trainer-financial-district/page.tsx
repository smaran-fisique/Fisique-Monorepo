import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import FreelanceTrainerFinancialDistrictContent from '@/components/pages/FreelanceTrainerFinancialDistrictContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/freelance-trainer-financial-district');
  return buildMetadata(seo, {
    title: 'Freelance Trainer Access Near Financial District | BYOT Gym | Fisique Fitness',
    description: 'Freelance trainers near Financial District Hyderabad: bring your IT professional clients to Fisique Fitness. Premium equipment, AC, sauna. Just 5 mins from FD.',
    path: '/freelance-trainer-financial-district',
  });
}

export const revalidate = 3600;

const freelanceFDFAQs = [
  {
    question: 'Where can freelance trainers near Financial District train clients?',
    answer: 'Fisique Fitness in Kokapet (5 mins from FD) offers trainer access passes. Bring your IT professional clients to a premium gym with professional equipment, AC, and sauna—a major upgrade from outdoor or building gym training.',
  },
  {
    question: 'What are the timings for trainer access?',
    answer: "We're open 5:30 AM to 10 PM, Monday to Saturday. Perfect for training FD professionals before or after work hours.",
  },
  {
    question: 'How does this benefit my IT professional clients?',
    answer: "Your clients get professional equipment, climate control (important for Hyderabad weather), and sauna for stress relief—things not available in apartment gyms or outdoor training. It helps you deliver better results.",
  },
  {
    question: "What's the cost for trainer access?",
    answer: 'We offer flexible daily, weekly, and monthly passes for trainers. Contact us at +91-9515469444 for current rates and to discuss your needs.',
  },
  {
    question: 'Can I train corporate groups at Fisique?',
    answer: 'Yes! We accommodate trainers running small group sessions for corporate clients. Our boutique environment ensures privacy and focus. Contact us for group training arrangements.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Freelance Trainer Access Near Financial District' },
];

export default function FreelanceTrainerFinancialDistrictPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={freelanceFDFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <FreelanceTrainerFinancialDistrictContent />
    </>
  );
}
