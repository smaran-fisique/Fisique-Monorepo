'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
  category: { name: string } | null;
}

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('title, content, excerpt, featured_image_url, published_at, category:blog_categories(name)')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();
        if (error) throw error;
        setPost(((data ?? null) as unknown) as BlogPost | null);
      } catch (e) {
        console.error('Error fetching post:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Header />
        <main>
          <section className="paper border-b hairline">
            <div className="container-custom px-4 md:px-6 pt-10 pb-16 md:pt-14">
              <Skeleton className="h-4 w-32 mb-10" />
              <Skeleton className="h-[300px] w-full mb-8" />
              <Skeleton className="h-12 w-3/4 mb-4" />
              <Skeleton className="h-4 w-48 mb-10" />
              <div className="space-y-3 max-w-2xl">
                {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} className="h-4 w-full" />)}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) {
    return (
      <>
        <Header />
        <main>
          <section className="paper border-b hairline">
            <div className="container-custom px-4 md:px-6 pt-10 pb-24">
              <div className="flex items-center justify-between border-b hairline pb-3 mb-16">
                <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Journal</span>
              </div>
              <p className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground mb-6">Post not found</p>
              <Link
                href="/blog-posts/"
                className="inline-flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.18em] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to journal
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main>
        <section className="paper border-b hairline">
          <div className="container-custom px-4 md:px-6 pt-10 pb-16 md:pt-14">

            {/* Dateline */}
            <div className="flex items-center justify-between border-b hairline pb-3 mb-10 md:mb-14">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                {post.category?.name ?? 'Journal'} · Fisique
              </span>
              {post.published_at && (
                <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {format(new Date(post.published_at), 'MMM d, yyyy')}
                </span>
              )}
            </div>

            {/* Back link */}
            <Link
              href="/blog-posts/"
              className="inline-flex items-center gap-2 font-mono-display text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="h-3 w-3" />
              All articles
            </Link>

            {/* Hero image */}
            {post.featured_image_url && (
              <div className="aspect-video overflow-hidden border hairline mb-10">
                <img
                  src={post.featured_image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="max-w-2xl">
              <h1 className="font-display font-black text-foreground text-[clamp(28px,4vw,56px)] leading-[0.95] tracking-[-0.04em] mb-8">
                {post.title}
              </h1>

              <div
                className="prose prose-lg max-w-none
                  prose-headings:font-display prose-headings:font-black prose-headings:tracking-[-0.03em] prose-headings:text-foreground
                  prose-p:text-foreground/80 prose-p:leading-[1.75] prose-p:text-[15px]
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:text-foreground/80 prose-ol:text-foreground/80
                  prose-li:text-[15px] prose-li:leading-[1.7]
                  prose-blockquote:border-l-accent prose-blockquote:text-muted-foreground prose-blockquote:font-normal prose-blockquote:not-italic
                  prose-a:text-accent prose-a:no-underline hover:prose-a:underline
                  prose-img:border prose-img:hairline"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
