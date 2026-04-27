'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const enterEase = [0.16, 1, 0.3, 1] as const;

const offerings = [
  {
    no: '01',
    title: 'Personal training',
    short: '1:1 strength coaching',
    body:
      'Assessment, programming, and every session run by a coach. Loads, tempo, and rest set for you — not a class.',
    image: '/experience-coaching.jpg',
  },
  {
    no: '02',
    title: 'Strength & hypertrophy',
    short: 'Progressive overload',
    body:
      'Barbell and machine work programmed in 6–12 week blocks. Logged sets, real progress, no guessing what to do next.',
    image: '/hero-gym-optimized.webp',
  },
  {
    no: '03',
    title: 'Mobility & rehab',
    short: 'Move without pain',
    body:
      'Joint-by-joint mobility, posture work, and return-to-train protocols for old injuries. Coordinated with your strength block.',
    image: '/experience-consultation.jpg',
  },
  {
    no: '04',
    title: 'Sauna & recovery',
    short: 'Heat after heavy days',
    body:
      'Dry sauna, cool-down floor, and unhurried recovery time after sessions — included with every personal training plan.',
    image: '/experience-sauna.jpg',
  },
];

export const CoreOfferingsSection = () => {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7, ease: enterEase, delay },
  });

  return (
    <section
      id="services"
      className="relative bg-background-2 paper py-10 md:flex md:flex-col md:overflow-hidden md:py-0 md:h-[calc(100dvh-64px)]"
    >
      <div className="container-custom px-4 md:flex md:min-h-0 md:flex-1 md:flex-col md:px-6 md:pt-4 md:pb-4">
        {/* Title — full-width bento card */}
        <motion.div
          {...reveal()}
          className="tile relative overflow-hidden bg-card p-6 md:p-7"
        >
          <div className="flex items-baseline justify-between gap-4 border-b hairline pb-2 md:pb-3">
            <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent md:text-[10px] md:tracking-[0.28em]">
              Section · 03 · Programmes
            </span>
            <span className="hidden font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:inline">
              Four releases · one coached system
            </span>
            <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground md:text-[10px] md:tracking-[0.28em]">
              Page A3
            </span>
          </div>
          <h2 className="mt-4 font-display font-black text-foreground text-[clamp(34px,9vw,76px)] leading-[1.02] tracking-[-0.045em] md:mt-5 md:whitespace-nowrap md:text-[clamp(16px,4.4vw,76px)] md:leading-[1]">
            Four programmes,<span className="font-thin text-accent"> one floor.</span>
          </h2>
        </motion.div>

        {/* Mobile — stacked cards */}
        <div className="mt-3 grid grid-cols-1 gap-3 md:hidden">
          {offerings.map((o, i) => (
            <motion.article
              key={o.no}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: enterEase, delay: i * 0.06 }}
              className="relative overflow-hidden border hairline bg-card"
            >
              <div className="relative h-[180px] w-full overflow-hidden">
                <img
                  src={o.image}
                  alt={o.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 font-mono-display text-[10px] uppercase tracking-[0.22em] text-background">
                  {o.no} · {o.short}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-black tracking-[-0.03em] text-foreground text-[clamp(26px,6vw,40px)] leading-[1.02]">
                  {o.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.55] text-muted-foreground">
                  {o.body}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Desktop — diptych: numbered list × image preview */}
        <div className="hidden md:mt-2 md:grid md:min-h-0 md:flex-1 md:grid-cols-12 md:gap-3">
          {/* LEFT — numbered rows, hover to activate */}
          <motion.ul
            {...reveal(0.05)}
            className="relative flex min-h-0 flex-col overflow-hidden border hairline bg-card md:col-span-7"
            onMouseLeave={() => setActive((prev) => prev)}
          >
            {offerings.map((o, i) => {
              const isActive = active === i;
              return (
                <li
                  key={o.no}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group flex-1 border-b hairline last:border-b-0"
                >
                  <button
                    type="button"
                    className="flex h-full w-full items-start gap-5 px-6 py-4 text-left lg:px-8 lg:py-5"
                    onClick={() => setActive(i)}
                  >
                    <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-accent">
                      {o.no}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3
                          className={`font-display font-black tracking-[-0.03em] transition-colors text-[clamp(22px,2.4vw,38px)] leading-[1] ${
                            isActive ? 'text-foreground' : 'text-foreground/45'
                          }`}
                        >
                          {o.title}
                        </h3>
                        <ArrowUpRight
                          className={`h-4 w-4 flex-shrink-0 transition-all ${
                            isActive
                              ? 'translate-x-0 translate-y-0 text-accent opacity-100'
                              : '-translate-x-2 translate-y-2 opacity-0'
                          }`}
                        />
                      </div>
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          height: isActive ? 'auto' : 0,
                        }}
                        transition={{ duration: 0.45, ease: enterEase }}
                        className="overflow-hidden"
                      >
                        <p className="pt-2 font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                          {o.short}
                        </p>
                        <p className="mt-2 max-w-lg text-[14px] leading-[1.55] text-muted-foreground">
                          {o.body}
                        </p>
                      </motion.div>
                    </div>
                  </button>
                </li>
              );
            })}
          </motion.ul>

          {/* RIGHT — image preview swaps on hover */}
          <motion.figure
            {...reveal(0.1)}
            className="relative min-h-0 overflow-hidden border hairline md:col-span-5"
          >
            {offerings.map((o, i) => (
              <motion.img
                key={o.image}
                src={o.image}
                alt={o.title}
                initial={false}
                animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 1.04 }}
                transition={{ duration: 0.7, ease: enterEase }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-foreground/55 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-6 top-5 flex items-baseline justify-between font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/95">
              <span>Plate · {offerings[active].no}</span>
              <span>The floor</span>
            </figcaption>
            <figcaption className="absolute inset-x-6 bottom-5 flex items-end justify-between gap-4">
              <span className="font-display text-background text-[clamp(20px,2.2vw,30px)] leading-[1.18] tracking-[-0.02em]">
                {offerings[active].title}
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/85">
                {String(active + 1).padStart(2, '0')} / {String(offerings.length).padStart(2, '0')}
              </span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
};
