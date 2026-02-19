import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Trophy,
  UserPlus,
  Users,
  Heart,
  Award,
  Share2,
  Copy,
  ChevronRight,
  Star,
  Zap,
  Target,
} from "lucide-react";
import garminWatch from "@/assets/garmin-vivoactive5.png";

// Analytics helper
const trackEvent = (eventName: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      page_path: "/fisique-challenge",
    });
  }
};

const WHATSAPP_MESSAGE = encodeURIComponent(
  "I'm competing in the Fisique Champions Challenge. Vote for me and help me win a Garmin Vivoactive 5. You also unlock Rs 1,000 off membership. Vote here: https://fisique.fitness/fisique-challenge"
);

const prizes = [
  {
    place: "1st Place",
    prize: "Garmin Vivoactive 5",
    featured: true,
    icon: Trophy,
  },
  {
    place: "2nd Place",
    prize: "₹10,000 Puma Voucher",
    featured: false,
    icon: Award,
  },
  {
    place: "3rd Place",
    prize: "Bull Rage Gym Kit worth ₹5,000",
    featured: false,
    icon: Star,
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Join the Challenge",
    desc: "Earn +50 points instantly",
  },
  {
    icon: Users,
    title: "Refer Members",
    desc: "Earn leaderboard points and Fisique Points",
  },
  {
    icon: Heart,
    title: "Receive Votes & Share",
    desc: "Climb faster on the leaderboard",
  },
  {
    icon: Trophy,
    title: "Top Ranked Win",
    desc: "Premium rewards for top performers",
  },
];

const pointsCards = [
  {
    icon: Zap,
    value: "1,000",
    label: "Fisique Points per referral",
  },
  {
    icon: Target,
    value: "3,500",
    label: "Points = 1 month membership",
  },
  {
    icon: Users,
    value: "∞",
    label: "Grow the community together",
  },
];

const handleCopyLink = () => {
  navigator.clipboard.writeText("https://fisique.fitness/fisique-challenge");
  toast.success("Challenge link copied!");
  trackEvent("challenge_share_click");
};

const FisiqueChallenge = () => {
  return (
    <>
      <Helmet>
        <title>Fisique Champions Challenge | Win a Garmin Vivoactive 5</title>
        <meta
          name="description"
          content="Compete, refer, and climb the leaderboard to win premium rewards at Fisique Fitness Kokapet."
        />
        <meta
          property="og:title"
          content="Win a Garmin Vivoactive 5 - Fisique Champions Challenge"
        />
        <meta
          property="og:description"
          content="Compete, refer, and climb the leaderboard to win premium rewards."
        />
        <meta property="og:image" content="/fisique-logo.webp" />
        <meta
          property="og:url"
          content="https://fisique.fitness/fisique-challenge"
        />
        <link
          rel="canonical"
          href="https://fisique.fitness/fisique-challenge"
        />
      </Helmet>

      <Header />

      <main className="min-h-screen">
        {/* ── SECTION 1: Hero ── */}
        <section className="premium-section pt-28 pb-20 md:pt-36 md:pb-28">
          {/* Background orbs */}
          <div
            className="premium-glow-orb w-[400px] h-[400px] -top-40 -left-40 animate-glow-pulse"
            style={{ background: "hsl(186 68% 45% / 0.15)" }}
          />
          <div
            className="premium-glow-orb w-[300px] h-[300px] top-1/3 -right-32 animate-glow-pulse"
            style={{
              background: "hsl(186 100% 76% / 0.08)",
              animationDelay: "1.5s",
            }}
          />

          <div className="container-custom px-4 relative z-10">
            {/* Eyebrow */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-sm font-medium text-accent">
                <Trophy className="w-4 h-4" />
                Fisique Champions Challenge
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-center font-bold leading-[0.95] tracking-tight text-[clamp(36px,7vw,72px)] mb-4">
              <span className="text-gradient">Champions</span> Challenge
            </h1>

            <p className="text-center text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-12">
              Compete. Climb the leaderboard. Win premium rewards.
            </p>

            {/* Prize Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-3xl mx-auto mb-8">
              {prizes.map((p) => (
                <div
                  key={p.place}
                  className={`premium-card rounded-2xl p-6 text-center ${
                    p.featured
                      ? "border-accent/40 shadow-[0_0_30px_hsl(186_68%_45%/0.2)] md:scale-105"
                      : ""
                  }`}
                >
                  {p.featured ? (
                    <img
                      src={garminWatch}
                      alt="Garmin Vivoactive 5"
                      className="w-20 h-20 mx-auto mb-3 object-contain"
                    />
                  ) : (
                    <p.icon
                      className="w-8 h-8 mx-auto mb-3 text-muted-foreground"
                    />
                  )}
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    {p.place}
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {p.prize}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-muted-foreground max-w-md mx-auto mb-8">
              Earn points by referring members, receiving votes, and sharing
              your journey. Top performers win.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" onClick={() => trackEvent("challenge_leaderboard_click")}>
                <Link to="/fisique-challenge/leaderboard">
                  View Leaderboard
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                onClick={() => trackEvent("challenge_vote_click")}
              >
                <Link to="/fisique-challenge/vote">
                  Vote & Unlock ₹1,000 Off
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── SECTION 2: How It Works ── */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <div className="container-custom px-4">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="premium-card rounded-2xl p-5 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center mx-auto mb-3">
                    <s.icon className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-xs text-accent font-semibold mb-1">
                    Step {i + 1}
                  </p>
                  <p className="font-semibold text-sm text-foreground mb-1">
                    {s.title}
                  </p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 3: Leaderboard Preview ── */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <div className="container-custom px-4">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-8">
              Current Standings
            </h2>

            <div className="premium-card rounded-2xl max-w-2xl mx-auto overflow-hidden">
              <div className="p-8 text-center">
                <Trophy className="w-10 h-10 text-accent mx-auto mb-4 opacity-60" />
                <p className="text-muted-foreground text-sm">
                  Leaderboard coming soon. Be the first to claim the top spot.
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <Button
                asChild
                variant="outline"
                onClick={() => trackEvent("challenge_leaderboard_click")}
              >
                <Link to="/fisique-challenge/leaderboard">
                  View Full Leaderboard
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* ── SECTION 4: Vote & Unlock ── */}
        <section className="py-16 md:py-24 border-t border-border/50 premium-section">
          <div
            className="premium-glow-orb w-[250px] h-[250px] bottom-0 left-1/2 -translate-x-1/2 animate-glow-pulse"
            style={{ background: "hsl(186 68% 45% / 0.12)" }}
          />

          <div className="container-custom px-4 relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Support your friends. Unlock your reward.
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-8">
              Vote for a participant and unlock a flat ₹1,000 off Fisique
              membership.
            </p>

            <Button
              asChild
              size="lg"
              className="mb-6"
              onClick={() => trackEvent("challenge_vote_click")}
            >
              <Link to="/fisique-challenge/vote">
                Vote Now
                <Heart className="w-4 h-4 ml-2" />
              </Link>
            </Button>

            <div className="flex items-center justify-center gap-3">
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
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all"
              >
                <Copy className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </div>
        </section>

        {/* ── SECTION 5: Fisique Points ── */}
        <section className="py-16 md:py-24 border-t border-border/50">
          <div className="container-custom px-4">
            <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">
              Refer. Earn. Train Longer.
            </h2>
            <p className="text-center text-muted-foreground max-w-md mx-auto mb-10">
              Earn Fisique Points for every successful referral. Redeem them for
              free membership months.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {pointsCards.map((c, i) => (
                <div
                  key={i}
                  className="premium-card rounded-2xl p-6 text-center"
                >
                  <c.icon className="w-6 h-6 text-accent mx-auto mb-3" />
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {c.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECTION 6: Footer Positioning ── */}
        <section className="py-16 md:py-20 border-t border-border/50">
          <div className="container-custom px-4 text-center">
            <p className="text-muted-foreground max-w-lg mx-auto mb-6 text-sm leading-relaxed">
              Fisique Champions Challenge is a performance-based championship
              rewarding members who actively contribute to the Fisique
              community.
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
