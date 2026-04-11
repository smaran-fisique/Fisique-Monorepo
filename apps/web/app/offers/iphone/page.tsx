import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import IPhoneOfferContent from '@/components/pages/IPhoneOfferContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/offers/iphone');
  return buildMetadata(seo, {
    title: 'Win an iPhone | 3 Month Training Offer | Fisique Fitness Kokapet',
    description: 'Join Fisique Fitness Kokapet for 3 months of personal training and get a chance to win an iPhone. Limited spots available. Offer ends Feb 28, 2026.',
    path: '/offers/iphone',
  });
}

export const revalidate = 3600;

export default function IPhoneOfferPage() {
  return <IPhoneOfferContent />;
}
