import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import PrivacyContent from '@/components/pages/PrivacyContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/privacy');
  return buildMetadata(seo, {
    title: 'Privacy Policy | Fisique Fitness',
    description: 'Fisique Fitness privacy policy. Learn how we collect, use, and protect your personal information.',
    path: '/privacy',
  });
}

export const revalidate = 3600;

export default function PrivacyPage() {
  return <PrivacyContent />;
}
