import type { Metadata } from 'next';
import { getSeoMeta, buildMetadata } from '@/lib/seo';
import { BlogListSchema } from '@/components/BlogListSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import BlogContent from '@/components/pages/BlogContent';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta('/blog');
  return buildMetadata(seo, {
    title: 'Fitness Blog | Tips & Guides | Fisique Fitness',
    description: 'Tips, guides, and inspiration for your fitness journey from the Fisique Fitness team in Kokapet.',
    path: '/blog',
  });
}

export const revalidate = 3600;

const breadcrumbItems = [
  { name: 'Home', url: 'https://fisique.fitness/' },
  { name: 'Blog' },
];

export default function BlogPage() {
  return (
    <>
      <BlogListSchema posts={[]} />
      <BreadcrumbSchema items={breadcrumbItems} />
      <BlogContent />
    </>
  );
}
