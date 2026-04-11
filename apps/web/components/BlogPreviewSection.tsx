'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
}

export const BlogPreviewSection = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, excerpt, featured_image_url, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 border-t border-border px-4">
        <div className="container-custom flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 border-t border-border px-4">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Latest from Our Blog
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tips, guides, and insights to support your fitness journey
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-primary/30"
            >
              {post.featured_image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" asChild>
            <Link href="/blog-posts/">
              Read More Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
