import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import RefundContent from '@/components/pages/RefundContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/refund');
  return buildMetadata(seo, {
    title: 'Cancellation & Refund Policy | Fisique Fitness',
    description: 'Fisique Fitness cancellation and refund policy for gym memberships and personal training packages.',
    path: '/refund',
  });
}

export const revalidate = 3600;

export default function RefundPage() {
  return <RefundContent />;
}
