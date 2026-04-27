'use client';

import { Button } from '@/components/ui/button';
import { MapPin, MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const enterEase = [0.16, 1, 0.3, 1] as const;

export const FinalCTA = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-foreground text-background py-16 md:py-28">
      {/* Soft accent wash — uses existing brand token */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: 'var(--gradient-radial-hero)' }}
        aria-hidden
      />

      <div className="container-custom relative z-10 px-4 md:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: enterEase }}
          className="max-w-5xl"
        >
          <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent-glow">
            Closing · 10 · Start
          </span>

          <h2 className="mt-6 font-display font-black tracking-[-0.045em] text-background text-[clamp(48px,6.6vw,124px)] leading-[0.86]">
            Book one trial<br />
            session.<br />
            <span className="font-thin text-accent-glow">Decide after.</span>
          </h2>

          <p className="mt-10 max-w-xl text-[18px] leading-[1.55] text-background/75 md:text-xl">
            One coached PT session. No package, no upsell — train, see the floor,
            then decide.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button
              size="lg"
              className="group h-14 bg-background px-8 text-base font-semibold text-foreground transition-all hover:bg-background/90"
              asChild
            >
              <a
                href="https://wa.me/919515469444?text=Hi!%20I'd%20like%20to%20book%20a%20PT%20trial%20at%20Fisique"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                <span className="font-mono-display text-[12px] uppercase tracking-[0.18em]">
                  WhatsApp to book
                </span>
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="h-14 border border-background/20 px-6 text-background hover:bg-background/10"
              asChild
            >
              <a
                href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mr-2 h-4 w-4" />
                <span className="font-mono-display text-[12px] uppercase tracking-[0.18em]">
                  Visit the studio
                </span>
              </a>
            </Button>
          </div>

          <div className="mt-16 flex flex-col gap-2 border-t border-background/15 pt-8 font-mono-display text-[11px] uppercase tracking-[0.28em] text-background/70 md:flex-row md:gap-10">
            <span>Mon–Sat · 5:30 AM — 10 PM · Sun · 7 AM — 12 PM (self-train)</span>
            <span>+91 95154 69444</span>
            <span>Kokapet, Hyderabad</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
