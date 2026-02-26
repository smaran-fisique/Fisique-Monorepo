import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/offers/CountdownTimer";
import { LiveLeaderboard } from "@/components/challenge/LiveLeaderboard";
import { toast } from "sonner";
import {
  Trophy,
  UserPlus,
  Users,
  Heart,
  Award,
  Share2,
  Copy,
  Star,
  Zap,
  Target,
  CheckCircle,
  MessageCircle,
  Clock,
} from "lucide-react";
import garminWatch from "@/assets/garmin-vivoactive5.png";
import heroGym from "@/assets/hero-gym-optimized.webp";

const trackEvent = (eventName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, { page_path: "/fisique-challenge" });
  }
};

const WHATSAPP_MESSAGE = encodeURIComponent(
  "I'm competing in the Fisique Champions Challenge. Vote for me and help me win a Garmin Vivoactive 5. You also unlock Rs 1,000 off membership. Vote here: https://fisique.fitness/fisique-challenge"
);

const CHALLENGE_END_DATE = new Date("2026-03-31T23:59:00+05:30");

const steps = [
  { icon: UserPlus, title: "Join the Challenge", desc: "Earn +50 points instantly" },
  { icon: Users, title: "Refer Members", desc: "Earn leaderboard points and Fisique Points" },
  { icon: Heart, title: "Receive Votes & Share", desc: "Climb faster on the leaderboard" },
  { icon: Trophy, title: "Top Ranked Win", desc: "Premium rewards for top performers" },
];

const pointsCards = [
  { icon: Zap, value: "1,000", label: "Fisique Points per referral" },
  { icon: Target, value: "3,500", label: "Points = 1 month membership" },
  { icon: Users, value: "∞", label: "Grow the community together" },
];

const trustBullets = [
  "Points are tracked on the leaderboard",
  "Votes are OTP verified",
  "Winners are announced publicly",
  "Prizes handed over on camera",
];

const handleCopyLink = () => {
  navigator.clipboard.writeText("https://fisique.fitness/fisique-challenge");
  toast.success("Challenge link copied!");
  trackEvent("challenge_share_click");
};

const scrollToLeaderboard = () => {
  document.getElementById("leaderboard")?.scrollIntoView({ behavior: "smooth" });
};

const FisiqueChallenge = () => {
  return (
    <>
      <Helmet>
        <title>Fisique Champions Challenge | Win a Garmin Vivoactive 5</title>
        <meta name="description" content="Compete, refer, and climb the leaderboard to win premium rewards at Fisique Fitness Kokapet." />
        <meta property="og:title" content="Win a Garmin Vivoactive 5 - Fisique Champions Challenge" />
        <meta property="og:description" content="Compete, refer, and climb the leaderboard to win premium rewards." />
        <meta property="og:image" content="/fisique-logo.webp" />
        <meta property="og:url" content="https://fisique.fitness/fisique-challenge" />
        <link rel="canonical" href="https://fisique.fitness/fisique-challenge" />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* ── HERO ── */}
        <section className="premium-section pt-28 pb-20 md:pt-36 md:pb-28 relative">
          <div className="absolute inset-0">
            <img src={heroGym} alt="" className="w-full h-full object-cover opacity-15" aria-hidden="true" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          </div>
          <div className="premium-glow-orb w-[400px] h-[400px] -top-40 -left-40 animate-glow-pulse" style={{ background: "hsl(186 68% 45% / 0.15)" }} />
          <div className="premium-glow-orb w-[300px] h-[300px] top-1/3 -right-32 animate-glow-pulse" style={{ background: "hsl(186 100% 76% / 0.08)", animationDelay: "1.5s" }} />

          <div className="container-custom px-4 relative z-10">
            <h1 className="text-center font-black leading-[0.95] tracking-tight text-[clamp(36px,7vw,72px)] mb-4">
              <span className="text-gradient">Champions</span> Challenge
            </h1>

            <p className="text-center text-xl md:text-2xl text-muted-foreground max-w-lg mx-auto mb-2">
              Compete. Climb the leaderboard. Win premium rewards.
            </p>

            <p className="text-center text-sm md:text-base text-accent/80 font-medium max-w-md mx-auto mb-14">
              Referrals + votes + verified shares = points. Highest points wins.
            </p>

            {/* Prize Podium */}
            <div className="grid grid-cols-4 gap-4 max-w-3xl mx-auto mb-8 items-end">
              {/* 2nd Place */}
              <div className="premium-card rounded-2xl p-5 md:p-6 text-center col-span-1">
                <Award className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">2nd Place</p>
                <p className="text-sm font-bold text-foreground tracking-wide leading-tight">₹10,000 Puma Voucher</p>
                <p className="text-xs text-accent/70 font-medium mt-1">Worth ₹10,000</p>
                <p className="text-xs text-muted-foreground mt-0.5">Valid in-store + online</p>
              </div>

              {/* 1st Place */}
              <div className="col-span-2">
                <div className="premium-card rounded-2xl p-6 md:p-8 text-center border-accent/50 shadow-[0_0_60px_hsl(186_68%_45%/0.3)] relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 40%, hsl(186 68% 45% / 0.12), transparent 70%)" }} />
                  <div className="relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-xs font-semibold text-accent uppercase tracking-widest mb-4">
                      <Trophy className="w-3.5 h-3.5" />
                      Grand Prize
                    </span>
                    <div className="relative w-36 h-36 md:w-40 md:h-40 mx-auto mb-4">
                      <div className="absolute inset-0 rounded-full bg-accent/10 animate-glow-pulse blur-xl" />
                      <img src={garminWatch} alt="Garmin Vivoactive 5" className="relative w-full h-full object-contain" />
                    </div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">1st Place</p>
                    <p className="text-xl font-bold text-foreground tracking-wide">Garmin Vivoactive 5</p>
                    <p className="text-sm text-accent font-semibold mt-1">Worth ₹25,000</p>
                    <p className="text-xs text-muted-foreground mt-1">AMOLED + GPS + Body Battery</p>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="premium-card rounded-2xl p-5 md:p-6 text-center col-span-1">
                <Star className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">3rd Place</p>
                <p className="text-sm font-bold text-foreground tracking-wide leading-tight">Bull Rage Gym Kit</p>
                <p className="text-xs text-accent/70 font-medium mt-1">Worth ₹5,000</p>
                <p className="text-xs text-muted-foreground mt-0.5">Bag + accessories bundle</p>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="text-center mb-10">
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

            {/* Live Leaderboard + Stats */}
            <LiveLeaderboard />

            {/* CTAs */}
            <div className="flex flex-col items-center gap-3 mt-10 mb-4">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" className="shadow-glow hover:shadow-glow-hover transition-all" onClick={() => { scrollToLeaderboard(); trackEvent("challenge_leaderboard_click"); }}>
                  View Leaderboard
                </Button>
                <Button variant="ghost" size="lg" onClick={() => { scrollToLeaderboard(); trackEvent("challenge_vote_click"); }}>
                  Vote in 30 Seconds — Get ₹1,000 Off
                  <Heart className="w-4 h-4 ml-1" />
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">One per phone number · Valid 72 hours · Non-stackable</p>

              {/* Share buttons */}
              <div className="flex items-center gap-3 mt-2">
                <a
                  href={`https://wa.me/?text=${WHATSAPP_MESSAGE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("challenge_share_click")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  WhatsApp
                </a>
                <button onClick={handleCopyLink} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all">
                  <Copy className="w-4 h-4" />
                  Copy Link
                </button>
              </div>
              <p className="text-xs text-muted-foreground/70">Share to climb faster</p>

              {/* Join CTA */}
              <a
                href="https://wa.me/919999999999?text=I%20want%20to%20join%20the%20Fisique%20Champions%20Challenge"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("challenge_join_click")}
                className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 font-medium mt-1 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Join Challenge — Get +50 Points
              </a>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <div className="container-custom px-4">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">How It Works</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {steps.map((s, i) => (
                <div key={i} className="premium-card rounded-2xl p-5 text-center">
                  <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-xs text-accent font-semibold mb-1">Step {i + 1}</p>
                  <p className="font-semibold text-sm text-foreground mb-1">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
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
              <Link to="/">Explore Fisique Fitness</Link>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FisiqueChallenge;
