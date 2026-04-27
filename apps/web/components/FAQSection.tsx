'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion, useReducedMotion } from 'framer-motion';
import { FAQSchema, defaultFAQs } from './FAQSchema';

const enterEase = [0.16, 1, 0.3, 1] as const;

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
  includeSchema?: boolean;
}

export const FAQSection = ({
  title = 'Common questions, plain answers.',
  subtitle = 'Everything we get asked before someone signs up.',
  faqs = defaultFAQs,
  includeSchema = true,
}: FAQSectionProps) => {
  const reduce = useReducedMotion();

  return (
    <section className="relative bg-background-2 paper py-10 md:py-20">
      {includeSchema && <FAQSchema faqs={faqs} />}

      <div className="container-custom px-4 md:px-6">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: enterEase }}
          className="mb-8 flex items-baseline justify-between border-b hairline pb-3 font-mono-display text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:mb-12"
        >
          <span>Section · 08 · Q&A</span>
          <span className="hidden md:inline">Plain answers, before you sign up</span>
          <span>Page A8</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: enterEase }}
            className="lg:col-span-4"
          >
            <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
              Q&A · Frequently asked
            </span>
            <h2 className="mt-4 font-display font-black text-foreground text-[clamp(34px,4.6vw,68px)] leading-[0.96] tracking-[-0.035em]">
              {title}
            </h2>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.6] text-muted-foreground">
              {subtitle}
            </p>
          </motion.div>

          <div className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t hairline">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="border-b hairline border-x-0 border-t-0"
                >
                  <AccordionTrigger className="group py-6 text-left hover:no-underline md:py-8">
                    <div className="flex items-baseline gap-6">
                      <span className="font-mono-display text-[11px] uppercase tracking-[0.22em] text-accent">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-display tracking-[-0.02em] text-foreground/80 group-hover:text-foreground text-[clamp(20px,2.4vw,30px)] leading-[1.18]">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pl-12 text-[15px] leading-[1.65] text-muted-foreground md:pl-14 md:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};
