'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const enterEase = [0.16, 1, 0.3, 1] as const;

const forYou = [
  'You want a coach who watches every set.',
  'You want a premium floor with maintained kit.',
  'You take recovery as seriously as the lifting.',
  'You want one programme, not five trends.',
  'You’re committing to months, not weeks.',
];

const notForYou = [
  'You want a packed commercial gym at ₹999 a month.',
  'You want a class to follow, not a programme to commit to.',
  'You’re looking for a quick six-week transformation.',
];

export const WhoIsForSection = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-background-2 paper py-10 md:py-20">
      <div className="container-custom px-4 md:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: enterEase }}
          className="mb-6 flex items-baseline justify-between border-b hairline pb-3 font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:mb-8"
        >
          <span>Section · 06 · Editorial</span>
          <span className="hidden md:inline">Who this floor is built for</span>
          <span>Page A6</span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.85, ease: enterEase }}
          className="mb-8 md:mb-12"
        >
          <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
            Op-ed · Position
          </span>
          <h2 className="mt-3 font-display font-black text-foreground text-[clamp(40px,7vw,96px)] leading-[0.95] tracking-[-0.045em] md:mt-4">
            We aren&apos;t for everyone.
            <span className="block font-thin text-accent">On purpose.</span>
          </h2>
        </motion.div>

        {/* Two-column ledger */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
          {/* For you */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: enterEase, delay: 0.05 }}
            className="border hairline bg-card p-5 md:p-7"
          >
            <div className="flex items-baseline justify-between border-b hairline pb-3">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
                Ledger · For you
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                {String(forYou.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-4 font-display font-black tracking-[-0.03em] text-foreground text-[clamp(22px,2.6vw,34px)] leading-[1.05]">
              You’re our kind of member.
            </h3>
            <ul className="mt-4 divide-y hairline border-y hairline md:mt-5">
              {forYou.map((line) => (
                <li
                  key={line}
                  className="flex items-baseline gap-3 py-3 text-foreground/90 md:gap-4 md:py-3.5"
                >
                  <Check className="h-3.5 w-3.5 flex-shrink-0 translate-y-[2px] text-accent" strokeWidth={2.5} />
                  <span className="text-[14.5px] leading-[1.5] md:text-[15.5px]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Not for you */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: enterEase, delay: 0.15 }}
            className="border hairline bg-foreground p-5 text-background md:p-7"
          >
            <div className="flex items-baseline justify-between border-b border-background/20 pb-3">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent-glow">
                Ledger · Not for you
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/60">
                {String(notForYou.length).padStart(2, '0')}
              </span>
            </div>
            <h3 className="mt-4 font-display font-black tracking-[-0.03em] text-background text-[clamp(22px,2.6vw,34px)] leading-[1.05]">
              We’re probably not your floor.
            </h3>
            <ul className="mt-4 divide-y divide-background/15 border-y border-background/15 md:mt-5">
              {notForYou.map((line) => (
                <li
                  key={line}
                  className="flex items-baseline gap-3 py-3 text-background/85 md:gap-4 md:py-3.5"
                >
                  <X className="h-3.5 w-3.5 flex-shrink-0 translate-y-[2px] text-accent-glow" strokeWidth={2.5} />
                  <span className="text-[14.5px] leading-[1.5] md:text-[15.5px]">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
