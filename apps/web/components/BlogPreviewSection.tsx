'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const enterEase = [0.16, 1, 0.3, 1] as const;

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
}

const fmtDate = (s: string) =>
  new Date(s).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

export const BlogPreviewSection = () => {
  const reduce = useReducedMotion();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('id, title, slug, excerpt, featured_image_url, published_at')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3);
        if (error) throw error;
        setPosts(data || []);
      } catch (e) {
        console.error('Error fetching posts:', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section className="bg-background py-14 md:py-24">
        <div className="container-custom flex justify-center px-4">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      </section>
    );
  }

  if (posts.length === 0) return null;

  const [feature, ...rest] = posts;

  return (
    <section className="relative bg-background paper py-10 md:py-20">
      <div className="container-custom px-4 md:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: enterEase }}
          className="mb-8 flex items-baseline justify-between border-b hairline pb-3 font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:mb-10"
        >
          <span>Section · 09 · The Journal</span>
          <span className="hidden md:inline">Field notes, written between sets</span>
          <span>Page B1</span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: enterEase }}
          className="mb-14 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
              Dispatch · The Journal
            </span>
            <h2 className="mt-4 font-display font-black text-foreground text-[clamp(40px,6.6vw,98px)] leading-[0.92] tracking-[-0.045em]">
              Field notes
              <span className="block font-thin text-accent">from the floor.</span>
            </h2>
          </div>
          <Link
            href="/blog-posts/"
            className="group inline-flex items-center gap-2 font-mono-display text-[11px] uppercase tracking-[0.18em] text-foreground underline decoration-accent/50 underline-offset-4 transition hover:decoration-accent"
          >
            All articles
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Feature post — large */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: enterEase }}
            className="lg:col-span-7"
          >
            <Link href={`/blog/${feature.slug}`} className="group block">
              {feature.featured_image_url && (
                <div className="relative aspect-[16/10] w-full overflow-hidden border hairline bg-card">
                  <img
                    src={feature.featured_image_url}
                    alt={feature.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
              )}
              <div className="mt-6 flex items-center gap-4 font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>{fmtDate(feature.published_at)}</span>
                <span className="h-px w-8 bg-border" />
                <span className="text-accent">Featured</span>
              </div>
              <h3 className="mt-4 font-display font-black tracking-[-0.03em] text-foreground transition-colors group-hover:text-accent text-[clamp(28px,4vw,52px)] leading-[1.02]">
                {feature.title}
              </h3>
              {feature.excerpt && (
                <p className="mt-4 max-w-2xl text-[16px] leading-[1.6] text-muted-foreground md:text-[17px]">
                  {feature.excerpt}
                </p>
              )}
            </Link>
          </motion.div>

          {/* Smaller posts — stacked */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            {rest.map((post, i) => (
              <motion.div
                key={post.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, ease: enterEase, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex gap-5 border-b hairline pb-8"
                >
                  {post.featured_image_url && (
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden border hairline bg-card md:h-32 md:w-32">
                      <img
                        src={post.featured_image_url}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      {fmtDate(post.published_at)}
                    </p>
                    <h3 className="mt-2 font-display font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent text-[clamp(18px,2vw,24px)] leading-[1.18]">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-muted-foreground">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
