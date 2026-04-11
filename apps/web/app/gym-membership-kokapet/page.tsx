import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import { FAQSchema, membershipFAQs } from '@/components/FAQSchema';
import GymMembershipKokapetContent from '@/components/pages/GymMembershipKokapetContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/gym-membership-kokapet');
  return buildMetadata(seo, {
    title: 'Gym Membership Kokapet | Flexible Plans | Fisique Fitness',
    description: "Premium equipment, boutique environment, and zero crowds. Experience fitness the way it should be at Kokapet's most exclusive training facility.",
    path: '/gym-membership-kokapet',
  });
}

export const revalidate = 3600;

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Gym Membership Kokapet' },
];

export default function GymMembershipKokapetPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <FAQSchema faqs={membershipFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <GymMembershipKokapetContent />
    </>
  );
}
