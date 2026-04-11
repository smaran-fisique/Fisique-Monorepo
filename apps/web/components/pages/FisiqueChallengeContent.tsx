'use client';

import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CountdownTimer } from '@/components/offers/CountdownTimer';
import { LiveLeaderboard } from '@/components/challenge/LiveLeaderboard';
import {
  Trophy,
  UserPlus,
  Users,
  Award,
  Star,
  Zap,
  Target,
  CheckCircle,
  MessageCircle,
  Clock,
  Watch,
  Footprints,
  Briefcase,
} from 'lucide-react';
const heroGym = '/hero-gym-optimized.webp';

const NeonIcon = ({ icon: Icon, size = 'w-10 h-10 md:w-14 md:h-14', color = 'hsl(186 68% 45%)' }: { icon: React.ElementType; size?: string; color?: string }) => (
  <div className="relative flex items-center justify-center">
    <div className="absolute inset-0 rounded-full blur-xl opacity-50 animate-glow-pulse" style={{ background: color }} />
    <Icon className={`${size} relative`} style={{ color, filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 20px ${color})` }} strokeWidth={1.5} />
  </div>
);

const trackEvent = (eventName: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, { page_path: '/fisique-challenge' });
  }
};

const CHALLENGE_END_DATE = new Date('2026-03-31T23:59:00+05:30');

const steps = [
  {
    icon: UserPlus,
    title: 'Join',
    emoji: '',
    tagline: 'Get in the game',
    highlight: '+50',
    bullets: ['All active members eligible', 'Enrollment required', '+50 pts joining bonus instantly'],
    accent: 'hsl(186 68% 45%)',
  },
  {
    icon: Zap,
    title: 'Earn',
    emoji: '',
    tagline: 'Stack your points',
    highlight: 'Unlimited pts',
    bullets: [
      '+120 pts — PT referral',
      '+60 pts — Membership referral',
      '+30 pts — Instagram post',
      '+15 pts — Instagram story',
      '+10 pts — Per vote (max 400)',
    ],
    accent: 'hsl(45 80% 55%)',
  },
  {
    icon: Trophy,
    title: 'Win',
    emoji: '',
    tagline: 'Claim your glory',
    highlight: '₹50k+ in prizes',
    bullets: ['Garmin Vivoactive 5', 'Sportswear voucher', 'Bull Rage gym kit', 'Decathlon gift cards'],
    accent: 'hsl(25 60% 55%)',
  },
];

const pointsCards = [
  { icon: Zap, value: '1,000', label: 'Fisique Points per referral' },
  { icon: Target, value: '3,500', label: 'Points = 1 month membership' },
  { icon: Users, value: '∞', label: 'Grow the community together' },
];

const trustBullets = [
  'Points are tracked on the leaderboard',
  'Votes are OTP verified',
  'Winners are announced publicly',
  'Prizes handed over on camera',
];

const scrollToLeaderboard = () => {
  document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
};

export default function FisiqueChallengeContent() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* ── HERO ── */}
        <section className="premium-section pt-20 pb-8 md:pt-28 md:pb-12 relative">
          <div className="absolute inset-0">
            <img src={heroGym} alt="" className="w-full h-full object-cover opacity-15" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>
          <div className="premium-glow-orb w-[400px] h-[400px] -top-40 -left-40 animate-glow-pulse" style={{ background: 'hsl(186 68% 45% / 0.15)' }} />
          <div className="premium-glow-orb w-[300px] h-[300px] top-1/3 -right-32 animate-glow-pulse" style={{ background: 'hsl(186 100% 76% / 0.08)', animationDelay: '1.5s' }} />

          <div className="container-custom px-4 relative z-10">
            <h1 className="text-center font-black leading-[0.95] tracking-tight text-[clamp(36px,7vw,72px)] mb-6">
              <span className="text-gradient">Champions</span> Challenge
            </h1>

            {/* Prize Structure */}
            <div className="max-w-3xl mx-auto mb-8">
              {/* Podium */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 items-end">
                {/* 2nd Place */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-2 flex items-center justify-center">
                    <NeonIcon icon={Footprints} />
                  </div>
                  <div className="w-full rounded-xl p-3 md:p-5 text-center flex flex-col justify-center border-2 border-[hsl(0_0%_65%/0.5)] bg-gradient-to-b from-[hsl(0_0%_50%/0.1)] to-[hsl(0_0%_30%/0.15)] shadow-[inset_0_1px_0_hsl(0_0%_80%/0.2),0_0_20px_hsl(0_0%_60%/0.1)]">
                    <p className="text-xs md:text-sm font-bold text-foreground uppercase tracking-wide">2<sup>nd</sup> Place</p>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-tight">Premium Sportswear Voucher</p>
                    <p className="text-xs text-accent/80 font-semibold mt-1">(₹10,000)</p>
                  </div>
                </div>

                {/* 1st Place - Grand Prize */}
                <div className="flex flex-col items-center -mt-4">
                  <div className="relative w-20 h-20 md:w-28 md:h-28 mx-auto mb-2 flex items-center justify-center">
                    <NeonIcon icon={Watch} size="w-14 h-14 md:w-20 md:h-20" color="hsl(45 80% 55%)" />
                  </div>
                  <div className="w-full rounded-xl p-3 md:p-6 text-center flex flex-col justify-center border-2 border-[hsl(45_70%_50%/0.6)] bg-gradient-to-b from-[hsl(45_60%_50%/0.12)] to-[hsl(45_50%_30%/0.15)] shadow-[inset_0_1px_0_hsl(45_70%_60%/0.3),0_0_30px_hsl(45_70%_50%/0.15)]">
                    <p className="text-sm md:text-base font-black text-foreground uppercase tracking-wide">Grand Prize</p>
                    <p className="text-[11px] md:text-sm text-muted-foreground mt-1">Ultimate Fitness Tracker</p>
                    <p className="text-sm text-accent font-bold mt-1">(Value ₹25,000)</p>
                  </div>
                </div>

                {/* 3rd Place */}
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-2 flex items-center justify-center">
                    <NeonIcon icon={Briefcase} />
                  </div>
                  <div className="w-full rounded-xl p-3 md:p-5 text-center flex flex-col justify-center border-2 border-[hsl(25_50%_45%/0.5)] bg-gradient-to-b from-[hsl(25_50%_45%/0.1)] to-[hsl(25_40%_30%/0.15)] shadow-[inset_0_1px_0_hsl(25_60%_60%/0.2),0_0_20px_hsl(25_50%_45%/0.1)]">
                    <p className="text-xs md:text-sm font-bold text-foreground uppercase tracking-wide">3<sup>rd</sup> Place</p>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-tight">Complete Gym Kit Bundle</p>
                  </div>
                </div>
              </div>

              {/* Runners-Up Bar */}
              <div className="mt-4 border-2 border-accent/40 rounded-xl px-5 py-3.5 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 shadow-[0_0_24px_hsl(186_68%_45%/0.12)]">
                <p className="text-sm text-foreground text-center">
                  <span className="font-bold text-accent">Runners-Up:</span>{' '}
                  5× Decathlon Gift Cards (₹2,000 each)
                </p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Clock className="w-3.5 h-3.5" />
                <span className="uppercase tracking-widest font-semibold">Ends in</span>
              </div>
              <CountdownTimer targetDate={CHALLENGE_END_DATE} className="mb-3" />
              <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                <span>Season: Mar 2026</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                <span>Winners announced: Apr 1</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16 md:py-24 border-t border-border/50 overflow-hidden">
          <div className="container-custom px-4">
            <p className="text-center text-xs uppercase tracking-widest text-accent font-semibold mb-2">3 Simple Steps</p>
            <h2 className="text-center text-2xl md:text-4xl font-black mb-4">How It Works</h2>
            <p className="text-center text-muted-foreground max-w-md mx-auto mb-12">
              Join the challenge, earn points through actions, and win premium prizes.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="group relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-8 text-center transition-all duration-300 hover:border-accent/50 hover:shadow-[0_0_40px_hsl(186_68%_45%/0.1)] hover:-translate-y-1"
                >
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-background"
                    style={{ backgroundColor: s.accent }}
                  >
                    Step {i + 1}
                  </div>

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${s.accent.replace(')', ' / 0.15)')}` }}
                  >
                    <s.icon className="w-6 h-6" style={{ color: s.accent }} />
                  </div>

                  <h3 className="text-xl font-black text-foreground mb-1">{s.title}</h3>
                  <p className="text-xs text-muted-foreground mb-4 italic">{s.tagline}</p>

                  <div
                    className="inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-5"
                    style={{
                      backgroundColor: `${s.accent.replace(')', ' / 0.12)')}`,
                      color: s.accent,
                      boxShadow: `0 0 20px ${s.accent.replace(')', ' / 0.15)')}`,
                    }}
                  >
                    {s.highlight}
                  </div>

                  <ul className="text-left space-y-2">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: s.accent }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-accent text-lg font-bold">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEADERBOARD + CTAs ── */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <div className="container-custom px-4">
            <LiveLeaderboard />

            <div className="flex flex-col items-center gap-4 mt-10 mb-4">
              <div className="border border-accent/30 rounded-2xl px-6 py-4 bg-accent/5 text-center max-w-md shadow-[0_0_30px_hsl(186_68%_45%/0.1)]">
                <p className="text-lg md:text-xl font-bold text-foreground mb-1">
                  New here? Vote & get <span className="text-accent">₹1,000 off</span> membership
                </p>
                <p className="text-xs text-muted-foreground">
                  Pick any contestant below · Verify via WhatsApp · Instant discount code
                </p>
              </div>

              <p className="text-xs text-muted-foreground">One discount per phone number · Valid 72 hours · Non-stackable</p>

              <a
                href="https://wa.me/919515847444?text=I%20want%20to%20join%20the%20Fisique%20Champions%20Challenge"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('challenge_join_click')}
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium mt-1 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Already a member? Join as a Contestant
              </a>
            </div>
          </div>
        </section>

        {/* ── TRUST BLOCK ── */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <div className="container-custom px-4">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">
              This is performance-based — not a lucky draw
            </h2>
            <p className="text-center text-muted-foreground max-w-md mx-auto mb-10">
              Every point is earned, every vote is verified, every winner is public.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {trustBullets.map((bullet) => (
                <div key={bullet} className="premium-card rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-sm text-foreground">{bullet}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FISIQUE POINTS ── */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <div className="container-custom px-4">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">Refer. Earn. Train Longer.</h2>
            <p className="text-center text-muted-foreground max-w-md mx-auto mb-10">
              Earn Fisique Points for every successful referral. Redeem them for free membership months.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {pointsCards.map((c, i) => (
                <div key={i} className="premium-card rounded-2xl p-6 text-center">
                  <c.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold text-foreground mb-1">{c.value}</p>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER POSITIONING ── */}
        <section className="py-16 md:py-20 border-t border-border/50">
          <div className="container-custom px-4 text-center">
            <p className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm leading-relaxed">
              Fisique Champions Challenge is a performance-based championship rewarding members who actively contribute to the Fisique community.
            </p>
            <Button asChild variant="outline">
              <Link href="/">Explore Fisique Fitness</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
