import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import TermsContent from '@/components/pages/TermsContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/terms');
  return buildMetadata(seo, {
    title: 'Terms & Conditions | Fisique Fitness',
    description: 'Fisique Fitness terms and conditions governing use of our gym, personal training, and fitness services.',
    path: '/terms',
  });
}

export const revalidate = 3600;

export default function TermsPage() {
  return <TermsContent />;
}
