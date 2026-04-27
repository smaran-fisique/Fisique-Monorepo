'use client';

import { Button } from '@/components/ui/button';
import { MapPin, MessageCircle, ArrowUpRight, Quote } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const heroGym = '/hero-gym-optimized.webp';
const enterEase = [0.16, 1, 0.3, 1] as const;

const tickerWords = ['Strength', 'Mobility', 'Sauna', 'Programmes', 'Coaching', 'Recovery'];

export const Hero = () => {
  const reduce = useReducedMotion();

  const tile = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, ease: enterEase, delay },
  });

  return (
    <section className="relative flex flex-col overflow-hidden bg-background paper h-[calc(100svh-60px)] md:h-[calc(100dvh-64px)]">
      <div className="container-custom flex min-h-0 flex-1 flex-col px-3 pt-2 pb-2 md:px-6 md:pt-4 md:pb-4">
        {/* Bento grid */}
        <div className="grid min-h-0 flex-1 grid-cols-2 gap-1.5 grid-rows-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.7fr)_auto] md:grid-cols-12 md:grid-rows-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:gap-2">
          {/* TILE A — Headline over photo, left 50%, spans both rows */}
          <motion.article
            {...tile(0.1)}
            className="tile relative col-span-2 row-start-1 row-end-2 overflow-hidden p-4 md:col-span-6 md:row-start-1 md:row-end-3 md:p-7"
          >
            <img
              src={heroGym}
              alt="Inside the Fisique training studio in Kokapet"
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              width={1920}
              height={1920}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/55 to-foreground/25" />

            <div className="relative flex h-full flex-col gap-3 md:gap-6">
              <header className="flex items-baseline justify-between border-b border-background/20 pb-2 md:pb-3">
                <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent-glow md:text-[10px]">
                  Lead · 01
                </span>
                <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-background/70 md:text-[10px]">
                  Plate 01 · The floor
                </span>
              </header>

              <h1 className="mt-auto font-display text-background">
                <span className="block text-[clamp(28px,7.8vw,124px)] font-black leading-[0.9] tracking-[-0.04em] md:text-[clamp(44px,6.6vw,124px)]">
                  One coach.
                </span>
                <span className="block text-[clamp(28px,7.8vw,124px)] font-black leading-[0.9] tracking-[-0.04em] md:text-[clamp(44px,6.6vw,124px)]">
                  One client.
                </span>
                <span className="block text-accent-glow text-[clamp(28px,7.8vw,124px)] font-thin leading-[0.9] tracking-[-0.04em] md:text-[clamp(44px,6.6vw,124px)]">
                  One floor.
                </span>
              </h1>

              <p className="hidden max-w-md border-t border-background/20 pt-5 text-[15px] leading-[1.55] text-background/90 md:block md:text-[16px]">
                <span className="font-medium text-background">Fisique</span> is a PT-first training
                studio in Kokapet. Coach-led strength, sauna recovery, and nutrition guidance — or
                bring yourself, train your way, on the same premium floor.
              </p>
            </div>
          </motion.article>

          {/* TILE C — CTA (dark), top-right */}
          <motion.article
            {...tile(0.26)}
            className="tile tile-dark col-span-2 row-start-3 row-end-4 flex flex-col justify-between gap-3 overflow-hidden p-4 md:col-span-6 md:col-start-7 md:row-start-2 md:row-end-3 md:gap-4 md:p-6"
          >
            <div>
              <div className="flex items-baseline justify-between border-b border-background/15 pb-2 md:pb-3">
                <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent-glow md:text-[10px]">
                  Booking · Free
                </span>
                <span className="hidden font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/60 sm:inline">
                  No card · No commitment
                </span>
              </div>
              <p className="mt-3 font-display text-[clamp(20px,5.6vw,52px)] font-black leading-[1] tracking-[-0.035em] md:mt-4 md:text-[clamp(28px,3vw,44px)]">
                Try one PT session.
                <span className="block font-thin text-accent-glow">Decide after.</span>
              </p>

              <dl className="mt-3 grid grid-cols-3 gap-2 border-t border-background/15 pt-3 md:mt-5 md:gap-4 md:pt-4">
                <div>
                  <dt className="font-display text-[clamp(20px,5vw,40px)] font-black leading-[0.9] tracking-[-0.04em] text-accent-glow md:text-[clamp(24px,2.6vw,40px)]">
                    85<span className="text-[0.5em] align-top font-thin">%+</span>
                  </dt>
                  <dd className="mt-1 font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/70 md:mt-2 md:text-[10px] md:tracking-[0.22em]">
                    Conversion rate
                  </dd>
                </div>
                <div className="border-l border-background/15 pl-2 md:pl-4">
                  <dt className="font-display text-[clamp(20px,5vw,40px)] font-black leading-[0.9] tracking-[-0.04em] text-background md:text-[clamp(24px,2.6vw,40px)]">
                    60
                  </dt>
                  <dd className="mt-1 font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/70 md:mt-2 md:text-[10px] md:tracking-[0.22em]">
                    Minutes
                  </dd>
                </div>
                <div className="border-l border-background/15 pl-2 md:pl-4">
                  <dt className="font-display text-[clamp(20px,5vw,40px)] font-black leading-[0.9] tracking-[-0.04em] text-background md:text-[clamp(24px,2.6vw,40px)]">
                    1:1
                  </dt>
                  <dd className="mt-1 font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/70 md:mt-2 md:text-[10px] md:tracking-[0.22em]">
                    No distractions
                  </dd>
                </div>
              </dl>
            </div>
            <div className="flex flex-wrap gap-2 md:mt-6">
              <Button
                size="sm"
                className="group h-9 bg-background px-3 text-foreground hover:bg-background/90 md:h-11 md:px-4"
                asChild
              >
                <a
                  href="https://wa.me/919515469444?text=Hi!%20I'd%20like%20to%20book%20a%20trial%20at%20Fisique"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-1.5 h-3 w-3 md:mr-2 md:h-3.5 md:w-3.5" />
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.18em] md:text-[11px]">
                    WhatsApp
                  </span>
                  <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:h-3.5 md:w-3.5" />
                </a>
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-9 border border-background/20 px-3 text-background hover:bg-background/10 md:h-11 md:px-4"
                asChild
              >
                <a href="tel:+919515469444">
                  <span className="font-mono-display text-[10px] uppercase tracking-[0.18em] md:text-[11px]">
                    Call
                  </span>
                </a>
              </Button>
            </div>
          </motion.article>

          {/* TILE D — Status / hours */}
          <motion.article
            {...tile(0.32)}
            className="tile col-span-1 row-start-2 row-end-3 overflow-hidden p-3 md:col-span-3 md:col-start-7 md:row-start-1 md:row-end-2 md:p-6"
          >
            <div className="flex items-center justify-between border-b hairline pb-2 md:pb-3">
              <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent md:text-[10px]">
                Status · Live
              </span>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
            </div>
            <p className="mt-2 font-display text-[clamp(18px,4.4vw,38px)] font-black leading-[1] tracking-[-0.03em] text-foreground md:mt-3 md:text-[clamp(24px,2.4vw,38px)]">
              Open today
            </p>
            <dl className="mt-3 space-y-1.5 font-mono-display text-[9px] uppercase tracking-[0.18em] text-foreground/75 md:mt-5 md:space-y-2 md:text-[11px]">
              <div className="flex justify-between border-b hairline pb-1.5 md:pb-2">
                <dt>Mon — Sat</dt>
                <dd>05:30 — 22:00</dd>
              </div>
              <div className="hidden justify-between border-b hairline pb-2 md:flex">
                <dt>Sun · self-train</dt>
                <dd>07:00 — 12:00</dd>
              </div>
              <div className="flex justify-between">
                <dt>Address</dt>
                <dd className="text-foreground">Kokapet</dd>
              </div>
            </dl>
            <a
              href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 font-mono-display text-[9px] uppercase tracking-[0.18em] text-foreground underline decoration-accent/50 underline-offset-4 transition hover:decoration-accent md:mt-5 md:gap-2 md:text-[11px]"
            >
              <MapPin className="h-3 w-3 md:h-3.5 md:w-3.5" />
              Directions
              <ArrowUpRight className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </a>
          </motion.article>

          {/* TILE E — Quote / pull-quote */}
          <motion.article
            {...tile(0.38)}
            className="tile col-span-1 row-start-2 row-end-3 flex flex-col justify-between overflow-hidden p-3 md:col-span-3 md:col-start-10 md:row-start-1 md:row-end-2 md:p-6"
          >
            <div>
              <Quote className="h-4 w-4 text-accent md:h-5 md:w-5" aria-hidden />
              <p className="mt-2 font-display text-[clamp(13px,3.2vw,26px)] font-light leading-[1.3] text-foreground/85 md:mt-4 md:text-[clamp(20px,2.2vw,26px)]">
                &ldquo;Best gym I&apos;ve been to. Trainers know what they&apos;re doing — equipment is top-class.&rdquo;
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between border-t hairline pt-2 font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-muted-foreground md:mt-6 md:pt-4 md:text-[10px] md:tracking-[0.22em]">
              <span>Google review</span>
              <span className="text-accent">★ 4.9</span>
            </div>
          </motion.article>

          {/* TILE F — Marquee, full width under bento */}
          <motion.div
            {...tile(0.44)}
            className="tile tile-dark col-span-2 row-start-4 row-end-5 overflow-hidden md:col-span-12 md:row-start-3 md:row-end-4"
          >
            <div className="marquee-track py-1.5 md:py-5">
              {[...tickerWords, ...tickerWords, ...tickerWords].map((w, i) => (
                <span
                  key={i}
                  className="flex items-center font-display font-black tracking-[-0.03em] text-background/95 text-[clamp(18px,4vw,52px)] leading-none whitespace-nowrap"
                >
                  <span>{w}</span>
                  <span className="mx-7 inline-block h-2 w-2 rotate-45 bg-accent md:mx-12" />
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
