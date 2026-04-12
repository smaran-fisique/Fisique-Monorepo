import type { Metadata } from 'next';
import { sanityClient, urlFor } from '@/lib/sanity';
import { BlogPostSchema } from '@/components/BlogPostSchema';
import { BreadcrumbSchema } from '@/components/BreadcrumbSchema';
import BlogPostContent from '@/components/pages/BlogPostContent';

interface PageProps {
  params: { slug: string };
}

const META_QUERY = `*[_type == "post" && slug.current == $slug && status == "published"][0]{
  title, excerpt, featuredImage, publishedAt,
  seo { metaTitle, metaDescription, ogImage }
}`

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await sanityClient.fetch<{
    title: string;
    excerpt: string | null;
    featuredImage: unknown | null;
    publishedAt: string | null;
    seo: { metaTitle: string | null; metaDescription: string | null; ogImage: unknown | null } | null;
  }>(META_QUERY, { slug: params.slug });

  if (!post) return { title: 'Post Not Found | Fisique Fitness Blog' };

  const title = post.seo?.metaTitle ?? post.title;
  const description = post.seo?.metaDescription ?? post.excerpt ?? 'Read this article on the Fisique Fitness blog.';
  const ogImage = post.seo?.ogImage
    ? urlFor(post.seo.ogImage as Parameters<typeof urlFor>[0]).width(1200).height(630).url()
    : post.featuredImage
    ? urlFor(post.featuredImage as Parameters<typeof urlFor>[0]).width(1200).height(630).url()
    : undefined;

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
