'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyBottomCTA } from '@/components/StickyBottomCTA';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, Calendar } from 'lucide-react';
import { RelatedServicesSection } from '@/components/RelatedServicesSection';

interface BlogPost {
  title: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
  updated_at: string | null;
  blog_categories: { name: string } | null;
}

interface BlogPostContentProps {
  slug: string;
}

export default function BlogPostContent({ slug }: BlogPostContentProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('title, content, excerpt, featured_image_url, published_at, updated_at, blog_categories(name)')
        .eq('slug', slug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

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

          {post.featured_image_url && (
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

          <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
            {post.blog_categories && (
              <>
                <span className="font-medium text-primary">{post.blog_categories.name}</span>
                <span>•</span>
              </>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>

          <div
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-blockquote:text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Services CTA */}
        <RelatedServicesSection />
      </main>

      <Footer />
      <StickyBottomCTA />
    </div>
  );
}
