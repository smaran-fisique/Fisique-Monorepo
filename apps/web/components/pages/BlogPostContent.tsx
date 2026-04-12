'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { sanityClient, urlFor } from '@/lib/sanity';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyBottomCTA } from '@/components/StickyBottomCTA';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Calendar } from 'lucide-react';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';

interface BlogPost {
  title: string;
  body: unknown[];
  excerpt: string | null;
  featuredImage: unknown | null;
  publishedAt: string;
  category: { name: string } | null;
}

const QUERY = `*[_type == "post" && slug.current == $slug && status == "published"][0]{
  title,
  body,
  excerpt,
  featuredImage,
  publishedAt,
  category->{ name }
}`

const portableTextComponents = {
  types: {
    image: ({ value }: { value: unknown }) => {
      const src = urlFor(value as Parameters<typeof urlFor>[0]).width(1200).url();
      return (
        <figure className="my-8">
          <img src={src} alt="" className="w-full rounded-lg" />
        </figure>
      );
    },
  },
};

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    sanityClient.fetch<BlogPost>(QUERY, { slug })
      .then(setPost)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const imageUrl = post.featuredImage ? urlFor(post.featuredImage as Parameters<typeof urlFor>[0]).width(1200).height(630).url() : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <article className="container max-w-4xl mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Blog
            </Link>
          </Button>

          {imageUrl && (
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            {post.category && (
              <>
                <span className="font-medium text-primary">{post.category.name}</span>
                <span>•</span>
              </>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            )}
          </div>

          <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-blockquote:text-muted-foreground">
            {post.body && <PortableText value={post.body as Parameters<typeof PortableText>[0]['value']} components={portableTextComponents} />}
          </div>
        </article>

        <RelatedServicesSection />
      </main>

      <Footer />
      <StickyBottomCTA />
    </div>
  );
}
