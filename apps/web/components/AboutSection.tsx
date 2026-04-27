'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const enterEase = [0.16, 1, 0.3, 1] as const;

const coachedInclusions = [
  'A coach on the floor for every session',
  'A signature programme written for you',
  'Strength, nutrition, recovery as one plan',
  'Sauna and mobility built in',
];

const selfLedInclusions = [
  'Full access to a premium, members-only floor',
  'Signature kit, professionally maintained',
  '1, 3, 6, 12-month memberships',
  'Sauna and mobility space included',
];

export const AboutSection = () => {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: enterEase, delay },
  });

  return (
    <section id="about-us" className="relative bg-background paper py-10 md:flex md:flex-col md:overflow-hidden md:py-0 md:h-[calc(100dvh-64px)]">
      <div className="container-custom px-4 md:flex md:min-h-0 md:flex-1 md:flex-col md:px-6 md:pt-4 md:pb-4">
        {/* Title — full-width bento card */}
        <motion.div
          {...reveal()}
          className="tile relative overflow-hidden bg-card p-6 md:p-7"
        >
          <div className="flex items-baseline justify-between gap-4 border-b hairline pb-2 md:pb-3">
            <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent md:text-[10px] md:tracking-[0.28em]">
              Section · 02 · The studio
            </span>
            <span className="hidden font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:inline">
              Two ways onto the floor
            </span>
            <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground md:text-[10px] md:tracking-[0.28em]">
              Page A2
            </span>
          </div>
          <h2 className="mt-4 font-display font-black text-foreground text-[clamp(34px,9vw,76px)] leading-[1.02] tracking-[-0.045em] md:mt-5 md:whitespace-nowrap md:text-[clamp(16px,4.4vw,76px)] md:leading-[1]">
            A PT-first floor,<span className="font-thin text-accent"> open both ways.</span>
          </h2>
        </motion.div>

        {/* Diptych — Coached × Self-led */}
        <div className="mt-3 grid grid-cols-1 gap-3 md:mt-2 md:min-h-0 md:flex-1 md:grid-cols-2">
          {/* Coached column */}
          <motion.article
            {...reveal(0.1)}
            className="relative flex flex-col border hairline bg-foreground p-6 text-background md:min-h-0 md:overflow-hidden md:p-7"
          >
            <div className="flex items-baseline justify-between border-b border-background/20 pb-2 md:pb-3">
              <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent-glow md:text-[10px] md:tracking-[0.28em]">
                Edition · 01 · Coached
              </span>
              <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-background/60 md:text-[10px]">
                The focus
              </span>
            </div>

            <h3 className="mt-3 font-display font-black tracking-[-0.035em] text-background text-[clamp(28px,3.4vw,52px)] leading-[0.95] md:mt-4">
              Personal
              <span className="block font-thin text-accent-glow">Training.</span>
            </h3>

            <p className="mt-3 max-w-md text-[14px] leading-[1.55] text-background/80 md:mt-4 md:text-[15px]">
              A coach on the floor for every set. Strength written, nutrition guided,
              recovery scheduled — one signature plan, one body of work.
            </p>

            <ul className="mt-4 divide-y divide-background/15 border-y border-background/15 md:mt-5">
              {coachedInclusions.map((line) => (
                <li
                  key={line}
                  className="flex items-baseline gap-3 py-2 text-background/90 md:gap-4 md:py-2.5"
                >
                  <span className="font-mono-display text-[11px] text-accent-glow">+</span>
                  <span className="text-[13.5px] md:text-[14.5px]">{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/919515469444?text=Hi!%20I'd%20like%20to%20book%20a%20PT%20trial%20at%20Fisique"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex md:mt-auto items-center gap-2 pt-4 font-mono-display text-[10px] uppercase tracking-[0.22em] text-background underline decoration-accent-glow/50 underline-offset-[6px] transition hover:decoration-accent-glow md:text-[11px]"
            >
              Book a free PT trial
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.article>

          {/* Self-led column */}
          <motion.article
            {...reveal(0.2)}
            className="relative flex flex-col border hairline bg-card p-6 md:min-h-0 md:overflow-hidden md:p-7"
          >
            <div className="flex items-baseline justify-between border-b hairline pb-2 md:pb-3">
              <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent md:text-[10px] md:tracking-[0.28em]">
                Edition · 02 · Self-led
              </span>
              <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground md:text-[10px]">
                Members&apos; studio
              </span>
            </div>

            <h3 className="mt-3 font-display font-black tracking-[-0.035em] text-foreground text-[clamp(28px,3.4vw,52px)] leading-[0.95] md:mt-4">
              Studio
              <span className="block font-thin text-accent">Membership.</span>
            </h3>

            <p className="mt-3 max-w-md text-[14px] leading-[1.55] text-muted-foreground md:mt-4 md:text-[15px]">
              A premium, members-only floor with our signature kit. Train your own way,
              your own hours — same studio, same standard, no coach.
            </p>

            <ul className="mt-4 divide-y hairline border-y hairline md:mt-5">
              {selfLedInclusions.map((line) => (
                <li
                  key={line}
                  className="flex items-baseline gap-3 py-2 text-foreground/90 md:gap-4 md:py-2.5"
                >
                  <span className="font-mono-display text-[11px] text-accent">+</span>
                  <span className="text-[13.5px] md:text-[14.5px]">{line}</span>
                </li>
              ))}
            </ul>

            <a
              href="https://wa.me/919515469444?text=Hi!%20I'd%20like%20to%20know%20about%20studio%20membership"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex md:mt-auto items-center gap-2 pt-4 font-mono-display text-[10px] uppercase tracking-[0.22em] text-foreground underline decoration-accent/50 underline-offset-[6px] transition hover:decoration-accent md:text-[11px]"
            >
              Request membership pricing
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
