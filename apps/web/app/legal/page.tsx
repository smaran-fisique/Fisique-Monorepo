import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import LegalContent from '@/components/pages/LegalContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/legal');
  return buildMetadata(seo, {
    title: 'Legal & Compliance | Fisique Fitness',
    description: 'Fisique Fitness legal policies including Terms & Conditions, Privacy Policy, Refund Policy, Shipping Policy, and EMI terms.',
    path: '/legal',
  });
}

export const revalidate = 3600;

export default function LegalPage() {
  return (
    <Suspense>
      <LegalContent />
    </Suspense>
  );
}
