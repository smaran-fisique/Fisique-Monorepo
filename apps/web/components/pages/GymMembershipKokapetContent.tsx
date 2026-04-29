'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { NearbyLocationsSection } from '@/components/NearbyLocationsSection';
import { Button } from '@/components/ui/button';
import { MessageCircle, ArrowUpRight, Phone, Dumbbell, Users, Clock, Thermometer, Check, X } from 'lucide-react';
import { membershipFAQs } from '@/components/FAQSchema';

const WA_BASE = 'https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20';

const tiers = [
  {
    name: '1 Month',
    tag: 'Try us out',
    features: ['Full equipment access', 'Flexible hours (5:30 AM – 10 PM)', 'Boutique environment', 'Locker facilities'],
  },
  {
    name: '6 Months',
    tag: 'Most popular',
    popular: true,
    features: ['Full equipment access', 'Flexible hours (5:30 AM – 10 PM)', 'Boutique environment', 'Locker facilities', 'Better monthly rate', 'Priority booking'],
  },
  {
    name: '12 Months',
    tag: 'Best value',
    features: ['Full equipment access', 'Flexible hours (5:30 AM – 10 PM)', 'Boutique environment', 'Locker facilities', 'Best monthly rate', 'Priority booking', 'Guest passes included'],
  },
];

const comparison = [
  { feature: 'Overcrowded during peak hours', fisique: false, typical: true },
  { feature: 'Premium equipment maintained', fisique: true, typical: false },
  { feature: 'Certified trainers available', fisique: true, typical: false },
  { feature: 'On-site sauna', fisique: true, typical: false },
  { feature: 'Capped membership for space', fisique: true, typical: false },
  { feature: 'Personalised attention', fisique: true, typical: false },
  { feature: 'Nutrition guidance available', fisique: true, typical: false },
];

const included = [
  { Icon: Dumbbell, title: 'Premium Equipment', desc: 'Top-tier strength and cardio machines, regularly serviced.' },
  { Icon: Users, title: 'Capped Membership', desc: 'We limit intake so you never wait for a machine.' },
  { Icon: Clock, title: 'Flexible Hours', desc: 'Open 5:30 AM to 10 PM Monday through Saturday.' },
  { Icon: Thermometer, title: 'Sauna Add-on', desc: 'On-site sauna available for post-workout recovery.' },
];

export default function GymMembershipKokapetContent() {
  return (
    <>
      <Header />

      <main>

        {/* ── HERO ── */}
        <section className="paper border-b hairline">
          <div className="container-custom px-4 md:px-6 pt-10 pb-10 md:pt-14 md:pb-14">

            <div className="flex items-center justify-between border-b hairline pb-3 mb-8 md:mb-12">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">
                Gym Membership · Kokapet
              </span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Fisique · Kokapet
              </span>
            </div>

            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-start">
              <div className="md:col-span-7">
                <span className="font-mono-display text-[10px] uppercase tracking-[0.28em] text-accent">
                  Flexible Plans · No Lock-in
                </span>
                <h1 className="mt-4 font-display font-black leading-[0.9] tracking-[-0.04em] text-foreground text-[clamp(36px,7vw,96px)]">
                  Zero crowds.
                  <span className="block text-accent font-thin">Pure focus.</span>
                </h1>
                <p className="mt-6 text-[15px] leading-[1.65] text-muted-foreground max-w-lg">
                  Premium equipment, boutique environment, and capped membership — fitness the way it should be at Kokapet's most exclusive training facility.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  <Button size="sm" className="group h-10 bg-foreground px-4 text-background hover:bg-foreground/90" asChild>
                    <a href={`${WA_BASE}gym%20membership%20at%20Fisique%20Kokapet`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Request Pricing</span>
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
                  <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent-glow">Studio · Live</span>
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
                    <dt className="font-mono-display text-[8.5px] uppercase tracking-[0.18em] text-background/55 mb-1">Plans</dt>
                    <dd className="font-display font-black text-[clamp(20px,3vw,32px)] leading-none tracking-[-0.03em] text-background">3</dd>
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
                  <a href={`${WA_BASE}gym%20membership%20at%20Fisique%20Kokapet`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1.5 h-3 w-3" />
                    <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Request Pricing</span>
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── MEMBERSHIP PLANS ── */}
        <section className="border-b hairline">
          <div className="container-custom px-4 md:px-6 py-12 md:py-20">
            <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Membership Plans</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">02</span>
            </div>
            <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(24px,3.5vw,48px)] mb-10">
              Choose your commitment.
            </h2>
            <div className="grid md:grid-cols-3 gap-1.5">
              {tiers.map((tier) => (
                <div key={tier.name} className={`tile p-6 flex flex-col ${tier.popular ? 'border-accent' : ''}`}>
                  <div className="flex items-baseline justify-between border-b hairline pb-3 mb-4">
                    <span className="font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                      {tier.tag}
                    </span>
                    {tier.popular && (
                      <span className="font-mono-display text-[9px] uppercase tracking-[0.18em] text-accent">Popular</span>
                    )}
                  </div>
                  <h3 className="font-display font-black text-[clamp(22px,2.5vw,30px)] tracking-[-0.03em] leading-tight mb-4">
                    {tier.name}
                  </h3>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="h-3 w-3 text-accent mt-0.5 flex-shrink-0" />
                        <span className="font-mono-display text-[10px] uppercase tracking-[0.14em] text-muted-foreground leading-[1.5]">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    className={`group h-9 w-full ${tier.popular ? 'bg-foreground text-background hover:bg-foreground/90' : 'border hairline bg-transparent text-foreground hover:bg-foreground/5'}`}
                    asChild
                  >
                    <a href={`${WA_BASE}the%20${encodeURIComponent(tier.name)}%20gym%20membership`} target="_blank" rel="noopener noreferrer">
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Get Pricing</span>
                      <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Button>
                </div>
              ))}
            </div>
            <p className="mt-6 font-mono-display text-[10px] uppercase tracking-[0.18em] text-muted-foreground text-center">
              All memberships can be upgraded to include personal training at any time.
            </p>
          </div>
        </section>

        {/* ── WHAT'S INCLUDED ── */}
        <section className="border-b hairline bg-muted/20">
          <div className="container-custom px-4 md:px-6 py-12 md:py-20">
            <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Facilities</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">03</span>
            </div>
            <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(24px,3.5vw,48px)] mb-10">
              Every membership includes.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-1.5">
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

        {/* ── COMPARISON ── */}
        <section className="border-b hairline">
          <div className="container-custom px-4 md:px-6 py-12 md:py-20">
            <div className="flex items-baseline gap-4 border-b hairline pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent">Why Fisique</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-muted-foreground">04</span>
            </div>
            <h2 className="font-display font-black leading-[0.95] tracking-[-0.03em] text-[clamp(24px,3.5vw,48px)] mb-10">
              Boutique vs. typical gym.
            </h2>
            <div className="max-w-2xl">
              {/* Header row */}
              <div className="grid grid-cols-[1fr_80px_80px] border hairline">
                <div className="p-3 font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground border-r hairline">Feature</div>
                <div className="p-3 text-center font-mono-display text-[9px] uppercase tracking-[0.22em] text-accent border-r hairline">Fisique</div>
                <div className="p-3 text-center font-mono-display text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Typical</div>
              </div>
              {comparison.map((item, i) => (
                <div key={i} className="grid grid-cols-[1fr_80px_80px] border-x border-b hairline">
                  <div className="p-3 font-mono-display text-[10px] uppercase tracking-[0.12em] text-foreground/70 border-r hairline">
                    {item.feature}
                  </div>
                  <div className="flex items-center justify-center border-r hairline">
                    {item.fisique
                      ? <Check className="h-3.5 w-3.5 text-accent" />
                      : <X className="h-3.5 w-3.5 text-muted-foreground/40" />}
                  </div>
                  <div className="flex items-center justify-center">
                    {item.typical
                      ? <Check className="h-3.5 w-3.5 text-destructive/60" />
                      : <X className="h-3.5 w-3.5 text-muted-foreground/40" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <ReviewsSection />

        {/* ── FAQ ── */}
        <FAQSection
          title="Membership FAQs"
          subtitle="Everything you need to know about joining Fisique"
          faqs={membershipFAQs}
          includeSchema={false}
        />

        {/* ── NEARBY ── */}
        <NearbyLocationsSection currentPath="/gym-membership-kokapet" />

        {/* ── FINAL CTA ── */}
        <section className="tile-dark">
          <div className="container-custom px-4 md:px-6 py-14 md:py-24">
            <div className="flex items-baseline gap-4 border-b border-background/15 pb-3 mb-10">
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent-glow">Join</span>
              <span className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-background/40">Pricing on request</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-end">
              <h2 className="font-display font-black leading-[0.9] tracking-[-0.04em] text-background text-[clamp(30px,5vw,72px)]">
                Experience the difference.
                <span className="block font-thin text-accent-glow">Start today.</span>
              </h2>
              <div>
                <p className="text-[15px] leading-[1.65] text-background/75 mb-7">
                  Contact us for current membership pricing and any ongoing offers. Start your fitness journey at Kokapet's premier boutique gym.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button size="sm" className="group h-10 bg-background px-4 text-foreground hover:bg-background/90" asChild>
                    <a href={`${WA_BASE}gym%20membership%20at%20Fisique%20Kokapet`} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-1.5 h-3.5 w-3.5" />
                      <span className="font-mono-display text-[10px] uppercase tracking-[0.18em]">Request Pricing</span>
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
