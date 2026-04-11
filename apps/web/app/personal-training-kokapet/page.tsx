import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema, personalTrainingFAQs } from '@/components/FAQSchema';
import { TrainerCredentialsSchema } from '@/components/TrainerCredentialsSchema';
import PersonalTrainingKokapetContent from '@/components/pages/PersonalTrainingKokapetContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/personal-training-kokapet');
  return buildMetadata(seo, {
    title: 'Personal Training Kokapet | 90-Day Transformation | Fisique Fitness',
    description: 'Transform your body with expert one-on-one coaching. Customized programs, nutrition guidance, and sauna recovery for busy professionals.',
    path: '/personal-training-kokapet',
  });
}

export const revalidate = 3600;

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Personal Training Kokapet' },
];

export default function PersonalTrainingKokapetPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <TrainerCredentialsSchema />
      <FAQSchema faqs={personalTrainingFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <PersonalTrainingKokapetContent />
    </>
  );
}
