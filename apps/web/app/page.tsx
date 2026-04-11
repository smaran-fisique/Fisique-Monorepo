import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { OrganizationSchema } from '@/components/OrganizationSchema';
import { WebSiteSchema } from '@/components/WebSiteSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import IndexContent from '@/components/pages/IndexContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/');
  return buildMetadata(seo, {
    title: 'Fisique Fitness | Premium Personal Training Studio in Kokapet',
    description: "Experience 1:1 personal training, sauna recovery, and expert nutrition guidance at Fisique Fitness Kokapet. Hyderabad's most exclusive boutique gym.",
    path: '/',
  });
}

export const revalidate = 3600;

const breadcrumbItems = [{ name: 'Home' }];

export default function IndexPage() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <LocalBusinessSchema />
      <BreadcrumbSchema items={breadcrumbItems} />
      <IndexContent />
    </>
  );
}
