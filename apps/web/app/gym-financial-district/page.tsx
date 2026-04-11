import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import GymFinancialDistrictContent from '@/components/pages/GymFinancialDistrictContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-financial-district');
  return buildMetadata(seo, {
    title: 'Premium Gym Near Financial District | Fisique Fitness Kokapet',
    description: 'The perfect gym for IT professionals. Skip the crowded commercial gyms and experience 1:1 personal training just 5 minutes from Financial District.',
    path: '/gym-financial-district',
  });
}

export const revalidate = 3600;

const financialDistrictFAQs = [
  {
    question: 'How far is Fisique Fitness from Financial District?',
    answer: "Fisique Fitness is just 5 minutes (2.5 km) from Financial District. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—an easy commute before or after work.",
  },
  {
    question: 'What are the gym timings for IT professionals?',
    answer: "We're open from 5:30 AM to 10 PM, Monday to Saturday. Many Financial District professionals prefer early morning (5:30-8 AM) or evening (6-9 PM) slots that fit their work schedules.",
  },
  {
    question: 'Do you offer corporate wellness programs for Financial District companies?',
    answer: 'Yes! We offer special corporate rates and group wellness programs for companies in Financial District. Contact us to discuss customized packages for your organization.',
  },
  {
    question: 'Is parking available near the gym?',
    answer: 'Yes, Avant Cedar has ample parking space. The building is easily accessible with dedicated parking for gym members.',
  },
  {
    question: 'What makes Fisique different from gyms in Financial District?',
    answer: "Unlike crowded commercial gyms, we're a boutique personal training studio with limited membership. You get 1:1 attention, certified coaches, private sauna, and no waiting for equipment—perfect for time-conscious professionals.",
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Near Financial District' },
];

export default function GymFinancialDistrictPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={financialDistrictFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymFinancialDistrictContent />
    </>
  );
}
