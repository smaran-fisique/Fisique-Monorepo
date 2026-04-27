'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const enterEase = [0.16, 1, 0.3, 1] as const;

const plans = [
  {
    name: 'Personal training',
    tagline: '1:1 coaching',
    pitch: 'Coach-led strength, mobility, and nutrition built around your week.',
    inclusions: [
      'Custom programme, written for you',
      'Every session run by a coach',
      'Nutrition guidance included',
      'Sauna recovery included',
      'Flexible scheduling',
    ],
    cta: 'Book a PT trial',
    waMsg: 'Hi! I\'d like to book a PT trial at Fisique',
    primary: true,
  },
  {
    name: 'Studio membership',
    tagline: 'Self-led access',
    pitch: 'A premium floor and signature kit — train your own way, your hours.',
    inclusions: [
      'Full equipment access',
      '1, 3, 6, 12-month options',
      'Sauna access included',
      'A premium, members-only floor',
      'Professionally maintained machines',
    ],
    cta: 'Request pricing',
    waMsg: 'Hi! I\'d like to know about studio membership',
    primary: false,
  },
];

export const MembershipPlansSection = () => {
  const reduce = useReducedMotion();

  return (
    <section id="membership" className="relative bg-background paper py-24 md:py-36">
      <div className="container-custom px-4 md:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: enterEase }}
          className="mb-10 flex items-baseline justify-between border-b hairline pb-3 font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
        >
          <span>Section · 04 · Memberships</span>
          <span className="hidden md:inline">Two ways onto the floor</span>
          <span>Page A4</span>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: enterEase }}
          className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
              Editions · Memberships
            </span>
            <h2 className="mt-4 font-display font-black text-foreground text-[clamp(40px,6.6vw,98px)] leading-[0.92] tracking-[-0.045em]">
              Two ways to train
              <span className="block font-thin text-accent">at Fisique.</span>
            </h2>
          </div>
          <p className="max-w-md text-[17px] leading-[1.55] text-foreground/80">
            Coached or self-led — both run on the same floor, with the same kit and recovery.
          </p>
        </motion.div>

        {/* Comparison */}
        <div className="grid grid-cols-1 gap-px overflow-hidden border hairline bg-border/40 md:grid-cols-2">
          {plans.map((p, i) => (
            <motion.article
              key={p.name}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: enterEase, delay: i * 0.1 }}
              className={`relative bg-background p-8 md:p-12 ${
                p.primary ? 'bg-background' : 'bg-background-2'
              }`}
            >
              {p.primary && (
                <span className="absolute -top-px right-8 inline-flex bg-accent px-3 py-1 font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent-foreground">
                  Most chosen
                </span>
              )}

              <div className="flex items-baseline justify-between gap-4 border-b hairline pb-4">
                <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-accent">
                  Edition · {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {p.tagline}
                </span>
              </div>

              <h3 className="mt-6 font-display font-black tracking-[-0.035em] text-foreground text-[clamp(34px,4.4vw,58px)] leading-[0.98]">
                {p.name}
              </h3>
              <p className="mt-4 max-w-sm text-[17px] leading-[1.55] text-muted-foreground">
                {p.pitch}
              </p>

              <ul className="mt-10 divide-y hairline border-y hairline">
                {p.inclusions.map((line) => (
                  <li
                    key={line}
                    className="flex items-center gap-4 py-4 text-foreground/90"
                  >
                    <span className="font-mono-display text-[11px] text-accent">+</span>
                    <span className="text-[15px] md:text-base">{line}</span>
                  </li>
                ))}
              </ul>

              <Button
                size="lg"
                className={`group mt-10 h-12 px-6 ${
                  p.primary
                    ? 'bg-accent text-accent-foreground shadow-glow hover:bg-accent/90 hover:shadow-glow-hover'
                    : 'bg-secondary text-foreground hover:bg-secondary/80'
                }`}
                asChild
              >
                <a
                  href={`https://wa.me/919515469444?text=${encodeURIComponent(p.waMsg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {p.cta}
                  <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </motion.article>
          ))}
        </div>

        {/* Trainer access — full-width strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: enterEase }}
          className="mt-12 flex flex-col items-start justify-between gap-4 border hairline px-6 py-6 md:flex-row md:items-center md:px-10"
        >
          <div>
            <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
              Classified · For freelance trainers
            </span>
            <p className="mt-2 font-display font-light text-[clamp(20px,2.4vw,28px)] leading-[1.25] text-foreground">
              Bring your own clients. Trainer access available on the floor.
            </p>
          </div>
          <a
            href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20inquire%20about%20trainer%20access"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono-display text-[11px] uppercase tracking-[0.18em] text-foreground underline decoration-accent/50 underline-offset-4 transition hover:decoration-accent"
          >
            Ask about trainer access
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
