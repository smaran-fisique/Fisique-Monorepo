'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const enterEase = [0.16, 1, 0.3, 1] as const;

export const TrainingOptionsSubSection = () => {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-background paper py-10 md:py-20">
      <div className="container-custom px-4 md:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Image */}
          <motion.div
            initial={reduce ? false : { opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: enterEase }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[5/4] w-full overflow-hidden border hairline bg-card">
              <img
                src="/experience-coaching.jpg"
                alt="Coach working with a client at Fisique Kokapet"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/55 via-transparent to-transparent" />
              <div className="absolute left-4 right-4 top-4 flex items-baseline justify-between font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/95">
                <span>Plate 02 / 12</span>
                <span>Trainer access</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5 font-mono-display text-[10px] uppercase tracking-[0.22em] text-foreground/80">
                <span>Open floor</span>
                <span>+91 95154 69444</span>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: enterEase, delay: 0.1 }}
            className="lg:col-span-6 lg:col-start-7"
          >
            <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
              Notice · For independent trainers
            </span>
            <h3 className="mt-4 font-display font-black tracking-[-0.035em] text-foreground text-[clamp(34px,5vw,68px)] leading-[0.96]">
              Already have a coach?
              <span className="block font-thin text-accent">Bring them.</span>
            </h3>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.6] text-muted-foreground md:text-[17px]">
              Freelance trainers and physiotherapists are welcome on the floor.
              Use our equipment, sauna, and space — keep the relationship you
              already have with your coach.
            </p>

            <Button
              variant="outline"
              size="lg"
              className="group mt-8 h-12 border-border bg-transparent px-6 text-foreground hover:bg-secondary"
              asChild
            >
              <a
                href="https://wa.me/919515469444?text=Hi!%20I%20want%20to%20inquire%20about%20freelance%20trainer%20access%20at%20Fisique"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Ask about trainer access
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
