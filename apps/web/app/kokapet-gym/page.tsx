import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema, defaultFAQs } from '@/components/FAQSchema';
import { ServiceSchema } from '@/components/ServiceSchema';
import KokapetGymContent from '@/components/pages/KokapetGymContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/kokapet-gym');
  return buildMetadata(seo, {
    title: 'Premium Personal Gym Kokapet | Fisique Fitness',
    description: "Experience 1:1 personal training with certified coaches, private sauna recovery, and customized nutrition plans in Kokapet's most exclusive fitness studio.",
    path: '/kokapet-gym',
  });
}

export const revalidate = 3600;

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Kokapet Gym' },
];

export default function KokapetGymPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={defaultFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <KokapetGymContent />
    </>
  );
}
