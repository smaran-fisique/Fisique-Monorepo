'use client';

import { useState, useEffect, useCallback } from 'react';
import { Star, ArrowLeft, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import { Skeleton } from '@/components/ui/skeleton';

const enterEase = [0.16, 1, 0.3, 1] as const;
const TRUNCATE = 200;

const PLACE_URL =
  'https://www.google.com/maps/search/?api=1&query=Fisique+Fitness+-+Best+Gym+in+Kokapet&query_place_id=ChIJCVGCTtmVyzsRcoYr31T3p2s';

const REVIEW_TAGS = [
  { label: 'Trainers', count: 36 },
  { label: 'Quality equipment', count: 7 },
  { label: 'Tailored workouts', count: 5 },
  { label: 'Sauna', count: 4 },
  { label: 'Motivating trainer', count: 3 },
  { label: 'Diet advice', count: 2 },
  { label: 'Realistic plan', count: 2 },
];

interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string;
  relative_time_description: string;
}

function ReviewModal({ review, onClose }: { review: Review; onClose: () => void }) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" />

        {/* Card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.3, ease: enterEase }}
          className="relative z-10 w-full max-w-lg bg-background border hairline p-6 md:p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 grid h-8 w-8 place-items-center border hairline text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < review.rating ? 'fill-accent stroke-accent' : 'fill-none stroke-muted-foreground/40'
                }`}
              />
            ))}
          </div>

          {/* Full text */}
          <blockquote className="text-[15px] leading-[1.65] text-foreground/90 tracking-[-0.005em]">
            &ldquo;{review.text}&rdquo;
          </blockquote>

          {/* Author */}
          <div className="mt-6 flex items-center gap-3 border-t hairline pt-5">
            {review.profile_photo_url ? (
              <img
                src={review.profile_photo_url.replace(/=s\d+/, '=s200')}
                alt={review.author_name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                loading="lazy"
              />
            ) : (
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                <span className="font-medium text-foreground">{review.author_name.charAt(0)}</span>
              </div>
            )}
            <div>
              <p className="font-display font-bold text-[14px] text-foreground">{review.author_name}</p>
              <p className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                {review.relative_time_description} · Google review
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export const ReviewsSection = () => {
  const { data: reviews, isLoading, error } = useGoogleReviews();
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<Review | null>(null);

  const total = reviews?.length ?? 0;

  useEffect(() => {
    if (!reviews || reduce || expanded) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % reviews.length), 7000);
    return () => clearInterval(t);
  }, [reviews, reduce, expanded]);

  const go = (dir: 1 | -1) => {
    if (!reviews) return;
    setIndex((i) => (i + dir + reviews.length) % reviews.length);
  };

  const closeModal = useCallback(() => setExpanded(null), []);

  return (
    <>
      <section className="relative bg-background paper py-10 md:py-20">
        <div className="container-custom px-4 md:px-6">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: enterEase }}
            className="mb-8 flex items-baseline justify-between border-b hairline pb-3 font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
          >
            <span>Section · 07 · Letters</span>
            <span className="hidden md:inline">From the members</span>
            <span>Page A7</span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: enterEase }}
            className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
                Voices · Members
              </span>
              <h2 className="mt-4 font-display font-black text-foreground text-[clamp(40px,7vw,108px)] leading-[0.92] tracking-[-0.045em]">
                In their
                <span className="font-thin text-accent"> words.</span>
              </h2>
            </div>
            <a
              href={PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground underline decoration-accent/50 underline-offset-4 transition hover:text-foreground hover:decoration-accent"
            >
              Read all on Google →
            </a>
          </motion.div>

          {/* Stats + tags */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: enterEase }}
            className="mb-10 flex flex-wrap items-center gap-2 md:mb-12"
          >
            <span className="mr-2 font-mono-display text-[10px] uppercase tracking-[0.28em] text-foreground">
              5.0 ★ · 81 reviews
            </span>
            {REVIEW_TAGS.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1.5 border hairline bg-background px-3 py-1 font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground"
              >
                {tag.label}
                <span className="text-accent">{tag.count}</span>
              </span>
            ))}
          </motion.div>

          {isLoading ? (
            <Skeleton className="h-[320px] w-full" />
          ) : error || !reviews || total === 0 ? (
            <div className="border-y hairline py-20 text-center">
              <p className="text-muted-foreground">
                Reviews unavailable.{' '}
                <a href={PLACE_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                  View on Google →
                </a>
              </p>
            </div>
          ) : (
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

              {/* Giant quote + counter */}
              <div className="lg:col-span-3">
                <div
                  className="font-display font-black leading-none text-accent/30 text-[clamp(140px,20vw,280px)]"
                  aria-hidden
                >
                  &ldquo;
                </div>
                <div className="-mt-6 font-mono-display text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:-mt-12">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
              </div>

              {/* Quote — fixed height container */}
              <div className="relative lg:col-span-9">
                {/* Fixed-height quote area */}
                <div className="h-[220px] md:h-[200px] overflow-hidden relative">
                  <AnimatePresence mode="wait">
                    <motion.figure
                      key={reviews[index].id}
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.6, ease: enterEase }}
                      className="absolute inset-0"
                    >
                      <div className="flex items-center gap-1 text-accent mb-5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < reviews[index].rating ? 'fill-accent stroke-accent' : 'fill-none stroke-muted-foreground/40'
                            }`}
                          />
                        ))}
                      </div>

                      <blockquote className="text-foreground/90 text-[clamp(16px,1.5vw,21px)] leading-[1.55] tracking-[-0.005em]">
                        &ldquo;
                        {reviews[index].text.length > TRUNCATE
                          ? reviews[index].text.slice(0, TRUNCATE).trimEnd() + '…'
                          : reviews[index].text}
                        &rdquo;
                        {reviews[index].text.length > TRUNCATE && (
                          <button
                            onClick={() => setExpanded(reviews[index])}
                            className="ml-2 font-mono-display text-[10px] uppercase tracking-[0.18em] text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent transition-colors"
                          >
                            Read more
                          </button>
                        )}
                      </blockquote>
                    </motion.figure>
                  </AnimatePresence>
                </div>

                {/* Author — always below the fixed box */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={reviews[index].id + '-author'}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.4, ease: enterEase }}
                    className="mt-6 flex items-center gap-4 border-t hairline pt-5"
                  >
                    {reviews[index].profile_photo_url ? (
                      <img
                        src={reviews[index].profile_photo_url.replace(/=s\d+/, '=s200')}
                        alt={reviews[index].author_name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                        <span className="font-medium text-foreground">
                          {reviews[index].author_name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-display font-bold text-foreground">{reviews[index].author_name}</p>
                      <p className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {reviews[index].relative_time_description} · Google review
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="mt-8 flex items-center justify-between gap-6 border-t hairline pt-6">
                  <div className="flex flex-1 items-center gap-4">
                    <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-foreground tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="relative h-px flex-1 bg-border">
                      <div
                        className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-500"
                        style={{ width: `${((index + 1) / total) * 100}%` }}
                      />
                    </div>
                    <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-muted-foreground tabular-nums">
                      {String(total).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => go(-1)}
                      aria-label="Previous review"
                      className="grid h-10 w-10 place-items-center border hairline transition hover:bg-secondary"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => go(1)}
                      aria-label="Next review"
                      className="grid h-10 w-10 place-items-center border hairline transition hover:bg-secondary"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {expanded && <ReviewModal review={expanded} onClose={closeModal} />}
    </>
  );
};
