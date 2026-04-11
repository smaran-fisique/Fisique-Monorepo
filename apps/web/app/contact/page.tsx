import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { LocalBusinessSchema } from '@/components/LocalBusinessSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import ContactContent from '@/components/pages/ContactContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/contact');
  return buildMetadata(seo, {
    title: 'Contact Us | Fisique Fitness Kokapet',
    description: 'Get in touch with Fisique Fitness. Start your fitness journey today with a free consultation.',
    path: '/contact',
  });
}

export const revalidate = 3600;

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Contact' },
];

export default function ContactPage() {
  return (
    <>
      <LocalBusinessSchema includeRating={false} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <ContactContent />
    </>
  );
}
