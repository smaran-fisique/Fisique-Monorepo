import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import GymGachibowliContent from '@/components/pages/GymGachibowliContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-gachibowli');
  return buildMetadata(seo, {
    title: 'Premium Gym Near Gachibowli | Fisique Fitness Kokapet',
    description: 'Escape the crowded Gachibowli gyms. Experience boutique personal training with certified coaches just 8 minutes from your office.',
    path: '/gym-gachibowli',
  });
}

export const revalidate = 3600;

const faqs = [
  {
    question: 'How far is Fisique Fitness from Gachibowli?',
    answer: "Fisique Fitness is approximately 8 minutes from Gachibowli and Nanakramguda. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via the Financial District road.",
  },
  {
    question: 'Is this gym suitable for IT professionals working in Gachibowli?',
    answer: "Absolutely! Many of our members are IT professionals from Gachibowli and Financial District. We offer flexible scheduling from 5:30 AM to 10 PM, so you can work out before or after office hours.",
  },
  {
    question: "What's different about Fisique compared to gyms in Gachibowli?",
    answer: "Unlike large commercial gyms in Gachibowli, Fisique is a boutique personal training studio with limited membership. You get 1:1 coaching, no waiting for equipment, and certified trainers who create programs tailored to your goals.",
  },
  {
    question: 'Do you offer corporate wellness programs for Gachibowli companies?',
    answer: "While we don't run corporate group programs, many teams from Gachibowli tech companies train with us individually. Our personal training approach delivers better results than generic group classes.",
  },
  {
    question: 'Is there parking at Fisique Fitness?',
    answer: 'Yes, Avant Cedar building has dedicated parking space for members. The gym is on the 4th floor with easy elevator access.',
  },
];

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Near Gachibowli' },
];

export default function GymGachibowliPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymGachibowliContent />
    </>
  );
}
