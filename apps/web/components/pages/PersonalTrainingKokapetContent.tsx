'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { NearbyLocationsSection } from '@/components/NearbyLocationsSection';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowUpRight, Phone, Dumbbell, Target, Apple, Thermometer, TrendingUp, Calendar } from 'lucide-react';
import { personalTrainingFAQs } from '@/components/FAQSchema';

const WA = 'https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20personal%20training%20at%20Fisique%20Kokapet';

const included = [
  { Icon: Dumbbell, title: '1:1 Sessions', desc: 'Every session with your dedicated certified coach — no sharing, no waiting.' },
  { Icon: Target, title: 'Custom Programs', desc: 'Built around your goals, fitness level, and schedule. Adjusted weekly.' },
  { Icon: Apple, title: 'Nutrition Guidance', desc: 'Personalised meal plans and dietary coaching alongside training.' },
  { Icon: Thermometer, title: 'Sauna Recovery', desc: 'Post-workout sauna sessions included for muscle repair and stress relief.' },
  { Icon: TrendingUp, title: 'Progress Tracking', desc: 'Regular body composition assessments and program adjustments.' },
  { Icon: Calendar, title: 'Flexible Scheduling', desc: 'Sessions that fit your week — weekday mornings, evenings, Saturdays.' },
];

const phases = [
  { num: '01', phase: 'Days 1–30: Foundation', desc: 'Build proper form, establish habits, and start nutrition changes.' },
  { num: '02', phase: 'Days 31–60: Progression', desc: 'Increase intensity, refine nutrition, and build momentum.' },
  { num: '03', phase: 'Days 61–90: Transformation', desc: 'Peak performance, visible results, and sustainable habits.' },
];

export default function PersonalTrainingKokapetContent() {
  return (
    <>
      <Header />

      <main>

        {/* ── HERO ── */}
        <section className="paper border-b hairline">
          <div className="container-custom px-4 md:px-6 pt-10 pb-10 md:pt-14 md:pb-14">

            <div className="flex items-center justify-between border-b hairline pb-3 mb-8 md:mb-12">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                Personal Training · Kokapet
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Fisique · Kokapet
              </span>
            </div>

            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
              <div className="md:col-span-7">
                <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
                  90-Day Programs
                </span>
                <h1 className="mt-4 font-display font-black leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(36px,7vw,96px)]">
                  One coach.
                  <span className="block text-accent font-thin">Real results.</span>
                </h1>
                <p className="mt-6 text-[15px] leading-[1.65] text-muted-foreground max-w-lg">
                  Transform your body with expert one-on-one coaching. Customised programmes, nutrition guidance, and sauna recovery — designed for busy professionals who want results that last.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <Button size="sm" className="group h-10 bg-foreground px-4 text-background hover:bg-foreground/90" asChild>
                    <a href={WA} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Book Free Trial</span>
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 border hairline px-4 text-foreground hover:bg-foreground/5" asChild>
                    <a href="tel:+919515469444">
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Call</span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Stats tile */}
              <div className="tile tile-dark md:col-span-5 p-5 md:p-6">
                <div className="flex items-baseline justify-between border-b border-background/15 pb-3 mb-4">
                  <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent-glow">PT · Live</span>
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/60 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                </div>
                <dl className="grid grid-cols-3 gap-3 mb-5">
                  <div>
                    <dt className="font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/55 mb-1">Rating</dt>
                    <dd className="font-display font-black text-[clamp(20px,3vw,32px)] leading-none tracking-[-0.03em] text-accent-glow">5.0<span className="text-[0.55em] font-thin">★</span></dd>
                  </div>
                  <div className="border-l border-background/15 pl-3">
                    <dt className="font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/55 mb-1">Program</dt>
                    <dd className="font-display font-black text-[clamp(20px,3vw,32px)] leading-none tracking-[-0.03em] text-background">90d</dd>
                  </div>
                  <div className="border-l border-background/15 pl-3">
                    <dt className="font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/55 mb-1">Opens</dt>
                    <dd className="font-display font-black text-[clamp(20px,3vw,32px)] leading-none tracking-[-0.03em] text-background">5:30</dd>
                  </div>
                </dl>
                <div className="border-t border-background/15 pt-4 space-y-2 font-mono-display text-[9px] uppercase tracking-[0.18em] text-background/70">
                  <div className="flex justify-between"><span>Mon — Sat</span><span className="text-background">05:30 — 22:00</span></div>
                  <div className="flex justify-between"><span>Sun · self-train</span><span className="text-background">07:00 — 12:00</span></div>
                </div>
                <Button size="sm" className="mt-5 w-full group h-9 bg-background px-3 text-foreground hover:bg-background/90" asChild>
                  <a href={WA} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1.5 h-3 w-3" />
                    <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Book Free Trial</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="border-b hairline">
          <div className="container-custom px-4 md:px-6 py-12 md:py-20">
            <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">What's Included</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">02</span>
            </div>
            <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(26px,4vw,52px)] mb-10">
              Everything in one programme.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1.5">
              {included.map(({ Icon, title, desc }) => (
                <div key={title} className="tile p-5">
                  <div className="flex items-baseline justify-between border-b hairline pb-2 mb-3">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <h3 className="font-display font-black text-[15px] tracking-[-0.02em] leading-tight">{title}</h3>
                  <p className="mt-1.5 font-mono-display text-[11px] leading-[1.5] text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 90-DAY PROGRAMME ── */}
        <section className="border-b hairline bg-muted/20">
          <div className="container-custom px-4 md:px-6 py-12 md:py-20">
            <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">90-Day Transformation</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">03</span>
            </div>
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-5">
                <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(24px,3.5vw,48px)]">
                  Three phases.<br />One outcome.
                </h2>
                <p className="mt-6 text-[14px] leading-[1.7] text-muted-foreground">
                  Our signature 90-day programme builds lasting change in three progressive phases — each one building on the last, calibrated to your pace.
                </p>
                <Button size="sm" className="group mt-8 h-10 bg-foreground px-4 text-background hover:bg-foreground/90" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20the%2090-day%20transformation%20program" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                    <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Start Programme</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
              <div className="md:col-span-7 space-y-1.5">
                {phases.map(({ num, phase, desc }) => (
                  <div key={num} className="tile p-5 flex gap-5 items-start">
                    <span className="font-display font-black text-[clamp(28px,3vw,40px)] leading-none tracking-[-0.04em] text-accent/30">{num}</span>
                    <div>
                      <h3 className="font-display font-black text-[15px] tracking-[-0.02em] leading-tight">{phase}</h3>
                      <p className="mt-1.5 font-mono-display text-[11px] leading-[1.5] text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <ReviewsSection />

        {/* ── FAQ ── */}
        <FAQSection
          title="Personal Training FAQs"
          subtitle="Common questions about our training programmes"
          faqs={personalTrainingFAQs}
          includeSchema={false}
        />

        {/* ── NEARBY ── */}
        <NearbyLocationsSection currentPath="/personal-training-kokapet" />

        {/* ── FINAL CTA ── */}
        <section className="tile-dark">
          <div className="container-custom px-4 md:px-6 py-14 md:py-24">
            <div className="flex items-baseline gap-4 border-b border-background/15 pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent-glow">Book</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/40">Free trial · No commitment</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <h2 className="font-display font-black leading-[0.9] tracking-[-0.04em] text-background text-[clamp(30px,5vw,72px)]">
                Ready to transform?
                <span className="block font-thin text-accent-glow">Start today.</span>
              </h2>
              <div>
                <p className="text-[15px] leading-[1.65] text-background/75 mb-7">
                  Book a free trial session with our trainers. No membership required, no obligation — just show up and train.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="group h-10 bg-background px-4 text-foreground hover:bg-background/90" asChild>
                    <a href={WA} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Book Free Trial</span>
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                  <Button size="sm" variant="ghost" className="h-10 border border-background/20 px-4 text-background hover:bg-background/10" asChild>
                    <a href="tel:+919515469444">
                      <Phone className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Call</span>
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
