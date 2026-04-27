import type { Metadata } from 'next';
import { createSupabaseServerClient } from '@/integrations/supabase/server';
import { BlogPostSchema } from '@/components/BlogPostSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import BlogPostContent from '@/components/pages/BlogPostContent';

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const supabase = createSupabaseServerClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, featured_image_url')
    .eq('slug', params.slug)
    .eq('status', 'published')
    .maybeSingle();

  if (!post) return { title: 'Post Not Found | Fisique Fitness Blog' };

  const title = post.title;
  const description = post.excerpt ?? 'Read this article on the Fisique Fitness blog.';
  const ogImage = post.featured_image_url ?? undefined;

  return {
    title: `${title} | Fisique Fitness Blog`,
    description,
    alternates: { canonical: `https://fisique.fitness/blog/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `https://fisique.fitness/blog/${params.slug}`,
      type: 'article',
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export const revalidate = 600;

export default function BlogPostPage({ params }: PageProps) {
  return (
    <>
      <BlogPostSchema title="" excerpt="" slug={params.slug} publishedAt="" />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://fisique.fitness/' },
          { name: 'Blog', url: 'https://fisique.fitness/blog' },
          { name: 'Article' },
        ]}
      />
      <BlogPostContent slug={params.slug} />
    </>
  );
}
