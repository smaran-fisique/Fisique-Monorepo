'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/integrations/supabase/client';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';

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
    <>
      <Header />

      <main>
        <section className="paper border-b hairline">
          <div className="container-custom px-4 md:px-6 pt-10 pb-10 md:pt-14 md:pb-14">

            {/* Dateline */}
            <div className="flex items-center justify-between border-b hairline pb-3 mb-10 md:mb-14">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                Journal · Fisique
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Training · Nutrition · Recovery
              </span>
            </div>

            {/* Headline + search */}
            <div className="mb-10 md:mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
                  Fitness Journal
                </span>
                <h1 className="mt-4 font-display font-black text-foreground text-[clamp(40px,7vw,108px)] leading-[0.92] tracking-[-0.045em]">
                  The
                  <span className="font-thin text-accent"> journal.</span>
                </h1>
              </div>
              <div className="md:max-w-xs w-full">
                <input
                  type="text"
                  placeholder="Search articles…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border hairline bg-background px-4 py-2.5 font-mono-display text-[11px] uppercase tracking-[0.18em] placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-64" />
                ))}
              </div>
            )}

            {/* Posts grid */}
            {!loading && filteredPosts.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
                {filteredPosts.map((post, i) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group tile flex flex-col overflow-hidden"
                  >
                    {post.featured_image_url && (
                      <div className="aspect-video overflow-hidden border-b hairline">
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-baseline justify-between border-b hairline pb-2 mb-3">
                        <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                          {post.category?.name ?? 'Journal'} · {String(i + 1).padStart(2, '0')}
                        </span>
                        {post.published_at && (
                          <span className="font-mono-display text-[9px] uppercase tracking-[0.16em] text-muted-foreground/60">
                            {format(new Date(post.published_at), 'MMM d, yyyy')}
                          </span>
                        )}
                      </div>
                      <h2 className="font-display font-black text-[clamp(16px,1.8vw,20px)] tracking-[-0.02em] leading-tight group-hover:text-accent transition-colors flex-1">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-2 text-[12px] leading-[1.6] text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}
                      <div className="mt-4 flex items-center gap-1 font-mono-display text-[9px] uppercase tracking-[0.18em] text-accent">
                        Read
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && filteredPosts.length === 0 && (
              <div className="border-y hairline py-24 text-center">
                <p className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  {search ? 'No posts match your search' : 'No posts yet'}
                </p>
              </div>
            )}

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
