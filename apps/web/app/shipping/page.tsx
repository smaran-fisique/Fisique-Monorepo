import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import ShippingContent from '@/components/pages/ShippingContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/shipping');
  return buildMetadata(seo, {
    title: 'Shipping & Exchange Policy | Fisique Fitness',
    description: 'Fisique Fitness shipping and exchange policy for merchandise and fitness products.',
    path: '/shipping',
  });
}

export const revalidate = 3600;

export default function ShippingPage() {
  return <ShippingContent />;
}
