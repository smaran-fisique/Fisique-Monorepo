'use client';

import type { LucideIcon } from 'lucide-react';
import { MessageCircle, ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FAQSection } from '@/components/FAQSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { NearbyLocationsSection } from '@/components/NearbyLocationsSection';

export interface GymFeature {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

export interface GymService {
  Icon: LucideIcon;
  title: string;
  desc: string;
  href?: string;
  price?: string;
}

export interface GymLocationTemplateProps {
  // Dateline + hero
  sectionLabel: string;
  badge: string;
  BadgeIcon?: LucideIcon;
  h1Line1: string;
  h1Highlight: string;
  description: React.ReactNode;
  whatsappHref: string;
  directionsHref: string;
  directionsLabel?: string;

  // Why section
  whyTitle: string;
  whyBody: React.ReactNode;
  whyExtra?: React.ReactNode;
  features: GymFeature[];

  // Services (optional)
  services?: {
    title: string;
    items: GymService[];
  };

  // FAQ
  faqs?: { question: string; answer: string }[];
  faqTitle?: string;
  faqSubtitle?: string;

  // Nearby
  currentPath: string;

  // Final CTA
  finalCtaTitle: string;
  finalCtaDesc: string;
  finalCtaWhatsappHref: string;
  finalCtaWhatsappLabel?: string;
}

export default function GymLocationTemplate({
  sectionLabel,
  badge,
  BadgeIcon,
  h1Line1,
  h1Highlight,
  description,
  whatsappHref,
  directionsHref,
  directionsLabel = 'Directions',
  whyTitle,
  whyBody,
  whyExtra,
  features,
  services,
  faqs,
  faqTitle,
  faqSubtitle,
  currentPath,
  finalCtaTitle,
  finalCtaDesc,
  finalCtaWhatsappHref,
  finalCtaWhatsappLabel = 'Book Free Trial',
}: GymLocationTemplateProps) {
  return (
    <>
      <Header />
      <main>

        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className="paper border-b hairline">
          <div className="container-custom px-4 md:px-6 pt-10 pb-10 md:pt-14 md:pb-14">

            {/* Dateline */}
            <div className="flex items-center justify-between border-b hairline pb-3 mb-8 md:mb-12">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                {sectionLabel}
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Fisique · Kokapet
              </span>
            </div>

            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">

              {/* Left — headline + CTAs */}
              <div className="md:col-span-7">
                {BadgeIcon && (
                  <div className="flex items-center gap-2 mb-5">
                    <BadgeIcon className="h-3.5 w-3.5 text-accent" />
                    <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                      {badge}
                    </span>
                  </div>
                )}

                <h1 className="font-display font-black leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(36px,7vw,96px)]">
                  {h1Line1}
                  <span className="block text-accent font-thin">{h1Highlight}.</span>
                </h1>

                <p className="mt-6 text-[15px] leading-[1.65] text-muted-foreground max-w-lg md:text-[16px]">
                  {description}
                </p>

                <div className="mt-8 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="group h-10 bg-foreground px-4 text-background hover:bg-foreground/90"
                    asChild
                  >
                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                        WhatsApp
                      </span>
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 border hairline px-4 text-foreground hover:bg-foreground/5"
                    asChild
                  >
                    <a href={directionsHref} target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                        {directionsLabel}
                      </span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Right — stats tile */}
              <div className="tile tile-dark md:col-span-5 p-5 md:p-6">
                <div className="flex items-baseline justify-between border-b border-background/15 pb-3 mb-4">
                  <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent-glow">
                    Studio · Live
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                </div>
                <dl className="grid grid-cols-3 gap-3 mb-5">
                  <div>
                    <dt className="font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/55 mb-1">Rating</dt>
                    <dd className="font-display font-black text-[clamp(20px,3vw,32px)] leading-none tracking-[-0.03em] text-accent-glow">4.9<span className="text-[0.55em] font-thin">★</span></dd>
                  </div>
                  <div className="border-l border-background/15 pl-3">
                    <dt className="font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/55 mb-1">Drive</dt>
                    <dd className="font-display font-black text-[clamp(20px,3vw,32px)] leading-none tracking-[-0.03em] text-background">{badge.replace(/[^0-9–]/g, '').trim() || '—'}</dd>
                  </div>
                  <div className="border-l border-background/15 pl-3">
                    <dt className="font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/55 mb-1">Opens</dt>
                    <dd className="font-display font-black text-[clamp(20px,3vw,32px)] leading-none tracking-[-0.03em] text-background">5:30</dd>
                  </div>
                </dl>
                <div className="border-t border-background/15 pt-4 space-y-2 font-mono-display text-[9px] uppercase tracking-[0.18em] text-background/70">
                  <div className="flex justify-between">
                    <span>Mon — Sat</span>
                    <span className="text-background">05:30 — 22:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sun · self-train</span>
                    <span className="text-background">07:00 — 12:00</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="mt-5 w-full group h-9 bg-background px-3 text-foreground hover:bg-background/90"
                  asChild
                >
                  <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1.5 h-3 w-3" />
                    <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                      Book Free Trial
                    </span>
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY SECTION ──────────────────────────────────────── */}
        <section className="border-b hairline">
          <div className="container-custom px-4 md:px-6 py-12 md:py-20">

            <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Why Fisique</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">02</span>
            </div>

            <div className="grid md:grid-cols-12 gap-8 md:gap-12">

              {/* Left — text */}
              <div className="md:col-span-5">
                <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(26px,4vw,52px)]">
                  {whyTitle}
                </h2>
                <div className="mt-6 text-[14px] leading-[1.7] text-muted-foreground space-y-3">
                  {whyBody}
                </div>
                {whyExtra && (
                  <div className="mt-6">
                    {whyExtra}
                  </div>
                )}
              </div>

              {/* Right — feature tiles */}
              <div className="md:col-span-7 grid grid-cols-2 gap-1.5">
                {features.map(({ Icon, title, desc }) => (
                  <div key={title} className="tile p-5">
                    <div className="flex items-baseline justify-between border-b hairline pb-2 mb-3">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <h3 className="font-display font-black text-[15px] tracking-[-0.02em] leading-tight">
                      {title}
                    </h3>
                    <p className="mt-1.5 font-mono-display text-[11px] leading-[1.5] text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────── */}
        {services && (
          <section className="border-b hairline bg-muted/20">
            <div className="container-custom px-4 md:px-6 py-12 md:py-20">

              <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
                <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Services</span>
                <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">03</span>
              </div>

              <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(24px,3.5vw,48px)] mb-8">
                {services.title}
              </h2>

              <div className="grid md:grid-cols-3 gap-1.5">
                {services.items.map(({ Icon, title, desc, href, price }) => {
                  const inner = (
                    <div className="tile p-6 h-full flex flex-col group-hover:bg-accent/5 transition-colors">
                      <div className="flex items-baseline justify-between border-b hairline pb-3 mb-4">
                        <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                          Service
                        </span>
                        <Icon className="h-4 w-4 text-accent" />
                      </div>
                      <h3 className="font-display font-black text-[clamp(17px,2vw,22px)] tracking-[-0.02em] leading-tight group-hover:text-accent transition-colors">
                        {title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.55] text-muted-foreground flex-1">
                        {desc}
                      </p>
                      {price && (
                        <p className="mt-4 font-mono-display text-[10px] uppercase tracking-[0.18em] text-accent">
                          {price}
                        </p>
                      )}
                    </div>
                  );
                  return href ? (
                    <a key={title} href={href} className="group">
                      {inner}
                    </a>
                  ) : (
                    <div key={title} className="group">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── REVIEWS ──────────────────────────────────────────── */}
        <ReviewsSection />

        {/* ── FAQ ──────────────────────────────────────────────── */}
        {faqs && (
          <FAQSection
            title={faqTitle ?? 'Common Questions'}
            subtitle={faqSubtitle}
            faqs={faqs}
            includeSchema={false}
          />
        )}

        {/* ── NEARBY ───────────────────────────────────────────── */}
        <NearbyLocationsSection currentPath={currentPath} />

        {/* ── FINAL CTA ────────────────────────────────────────── */}
        <section className="tile-dark">
          <div className="container-custom px-4 md:px-6 py-14 md:py-24">

            <div className="flex items-baseline gap-4 border-b border-background/15 pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent-glow">
                Book
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/40">
                Free trial · No commitment
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-end">
              <h2 className="font-display font-black leading-[0.9] tracking-[-0.04em] text-background text-[clamp(30px,5vw,72px)]">
                {finalCtaTitle}
                <span className="block font-thin text-accent-glow">Start today.</span>
              </h2>
              <div>
                <p className="text-[15px] leading-[1.65] text-background/75 mb-7">
                  {finalCtaDesc}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="group h-10 bg-background px-4 text-foreground hover:bg-background/90"
                    asChild
                  >
                    <a href={finalCtaWhatsappHref} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                        {finalCtaWhatsappLabel}
                      </span>
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-10 border border-background/20 px-4 text-background hover:bg-background/10"
                    asChild
                  >
                    <a href="tel:+919515469444">
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">
                        Call
                      </span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
