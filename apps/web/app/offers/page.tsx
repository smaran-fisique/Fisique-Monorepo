import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import OffersIndexContent from '@/components/pages/OffersIndexContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/offers');
  return buildMetadata(seo, {
    title: 'Special Offers | Fisique Fitness Kokapet',
    description: 'Exclusive fitness offers at Fisique Fitness Kokapet. Win prizes, get discounts on personal training and gym memberships.',
    path: '/offers',
  });
}

export const revalidate = 3600;

export default function OffersPage() {
  return <OffersIndexContent />;
}
