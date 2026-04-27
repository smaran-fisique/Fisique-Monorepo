'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyBottomCTA } from '@/components/StickyBottomCTA';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Users, Dumbbell, MapPin } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
  category: { name: string } | null;
}

export default function BlogContent() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image_url, published_at, category:blog_categories(name)')
          .eq('status', 'published')
          .order('published_at', { ascending: false });
        if (error) throw error;
        setPosts(((data ?? []) as unknown) as BlogPost[]);
      } catch (e) {
        console.error('Error fetching posts:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fitness Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Tips, guides, and inspiration for your fitness journey</p>
          </div>

          <div className="mb-8 max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">{search ? 'No posts found' : 'No blog posts yet'}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
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
                  <div className="p-6">
                    {post.category && (
                      <span className="text-xs font-medium text-primary mb-2 block">{post.category.name}</span>
                    )}
                    <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h2>
                    {post.excerpt && (
                      <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="mt-4 text-xs text-muted-foreground">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <section className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-4">Explore Our Services</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-8">Ready to take the next step? Check out what Fisique Fitness offers</p>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/personal-training-kokapet" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group">
                <Users className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Personal Training</h3>
                <p className="text-sm text-muted-foreground">1:1 coaching with certified trainers for real results</p>
              </Link>
              <Link href="/gym-membership-kokapet" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group">
                <Dumbbell className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Gym Membership</h3>
                <p className="text-sm text-muted-foreground">Premium equipment in an uncrowded boutique environment</p>
              </Link>
              <Link href="/kokapet-gym" className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all group">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">Our Kokapet Studio</h3>
                <p className="text-sm text-muted-foreground">Discover Kokapet's most exclusive fitness facility</p>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <StickyBottomCTA />
    </div>
  );
}
