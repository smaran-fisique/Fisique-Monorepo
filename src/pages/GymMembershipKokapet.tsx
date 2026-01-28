import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { FAQSection } from "@/components/FAQSection";
import { FAQSchema, membershipFAQs } from "@/components/FAQSchema";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Button } from "@/components/ui/button";
import { Phone, Check, Dumbbell, Users, Clock, Thermometer, X } from "lucide-react";

const GymMembershipKokapet = () => {
  const membershipTiers = [
    {
      name: "1 Month",
      description: "Try us out",
      features: [
        "Full equipment access",
        "Flexible hours (5:30 AM - 10 PM)",
        "Boutique environment",
        "Locker facilities",
      ],
      cta: "Get Pricing",
      popular: false,
    },
    {
      name: "6 Months",
      description: "Most popular choice",
      features: [
        "Full equipment access",
        "Flexible hours (5:30 AM - 10 PM)",
        "Boutique environment",
        "Locker facilities",
        "Better monthly rate",
        "Priority booking",
      ],
      cta: "Get Pricing",
      popular: true,
    },
    {
      name: "12 Months",
      description: "Best value",
      features: [
        "Full equipment access",
        "Flexible hours (5:30 AM - 10 PM)",
        "Boutique environment",
        "Locker facilities",
        "Best monthly rate",
        "Priority booking",
        "Guest passes included",
      ],
      cta: "Get Pricing",
      popular: false,
    },
  ];

  const comparisonFeatures = [
    { feature: "Overcrowded during peak hours", fisique: false, typical: true },
    { feature: "Premium equipment maintained", fisique: true, typical: false },
    { feature: "Certified trainers available", fisique: true, typical: false },
    { feature: "On-site sauna", fisique: true, typical: false },
    { feature: "Limited membership for space", fisique: true, typical: false },
    { feature: "Personalized attention", fisique: true, typical: false },
    { feature: "Nutrition guidance available", fisique: true, typical: false },
  ];

  return (
    <>
      <Helmet>
        <title>Gym Membership Kokapet | Flexible Plans | Fisique Fitness</title>
        <meta
          name="description"
          content="Premium gym membership in Kokapet with flexible 1, 3, 6, and 12-month plans. Boutique environment, premium equipment, optional sauna. No crowds."
        />
        <meta
          name="keywords"
          content="gym membership kokapet, fitness membership kokapet, gym plans kokapet, gym subscription hyderabad, boutique gym kokapet"
        />
        <link rel="canonical" href="https://fisique.fitness/gym-membership-kokapet" />
        <meta property="og:title" content="Gym Membership Kokapet | Fisique Fitness" />
        <meta
          property="og:description"
          content="Flexible gym membership plans in Kokapet. Premium equipment, boutique environment, no crowds."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/gym-membership-kokapet" />
      </Helmet>
      <LocalBusinessSchema />
      <FAQSchema faqs={membershipFAQs} />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium text-primary">Flexible Plans • No Lock-in</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Gym Membership{" "}
                <span className="text-primary">Kokapet</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Premium equipment, boutique environment, and zero crowds. 
                Experience fitness the way it should be at Kokapet's most 
                exclusive training facility.
              </p>

              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515847444?text=Hi%2C%20I%27m%20interested%20in%20gym%20membership%20at%20Fisique%20Kokapet">
                  <Phone className="w-5 h-5 mr-2" />
                  Request Pricing
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Choose Your Plan
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Flexible membership options to fit your commitment level
            </p>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {membershipTiers.map((tier, index) => (
                <div
                  key={index}
                  className={`relative p-8 rounded-2xl border ${
                    tier.popular
                      ? "bg-primary/5 border-primary shadow-lg"
                      : "bg-card border-border/50"
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold mb-1">{tier.name}</h3>
                    <p className="text-muted-foreground">{tier.description}</p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      tier.popular
                        ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                        : ""
                    }`}
                    variant={tier.popular ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={`https://wa.me/919515847444?text=Hi%2C%20I%27m%20interested%20in%20the%20${encodeURIComponent(
                        tier.name
                      )}%20gym%20membership`}
                    >
                      {tier.cta}
                    </a>
                  </Button>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-8">
              All memberships can be upgraded to include personal training at any time.
            </p>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              What's Included
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Every membership includes access to our premium facilities
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Dumbbell className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Premium Equipment</h3>
                <p className="text-sm text-muted-foreground">
                  Top-tier strength training and cardio machines, regularly maintained
                </p>
              </div>

              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Limited Membership</h3>
                <p className="text-sm text-muted-foreground">
                  We cap membership to ensure you never wait for equipment
                </p>
              </div>

              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Flexible Hours</h3>
                <p className="text-sm text-muted-foreground">
                  Open 5:30 AM to 10 PM, Monday through Saturday
                </p>
              </div>

              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Thermometer className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Sauna Add-on</h3>
                <p className="text-sm text-muted-foreground">
                  On-site sauna available as an add-on for recovery
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Why Fisique Over Typical Gyms
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              See the difference a boutique fitness experience makes
            </p>

            <div className="max-w-3xl mx-auto overflow-x-auto">
              <div className="bg-card border border-border rounded-2xl overflow-hidden min-w-[320px]">
                {/* Header */}
                <div className="grid grid-cols-[1fr_80px_80px] sm:grid-cols-3 bg-muted/50 p-3 sm:p-4 border-b border-border gap-2">
                  <div className="font-medium text-sm sm:text-base">Feature</div>
                  <div className="font-medium text-center text-primary text-sm sm:text-base">Fisique</div>
                  <div className="font-medium text-center text-muted-foreground text-xs sm:text-base">Typical</div>
                </div>

                {/* Rows */}
                {comparisonFeatures.map((item, index) => (
                  <div
                    key={index}
                    className={`grid grid-cols-[1fr_80px_80px] sm:grid-cols-3 p-3 sm:p-4 gap-2 ${
                      index !== comparisonFeatures.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="text-muted-foreground text-sm sm:text-base">{item.feature}</div>
                    <div className="flex justify-center">
                      {item.fisique ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-accent/20 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-destructive/20 rounded-full flex items-center justify-center">
                          <X className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                        </div>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {item.typical ? (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-destructive/20 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 sm:w-4 sm:h-4 text-destructive" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-muted rounded-full flex items-center justify-center">
                          <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <ReviewsSection />

        {/* FAQ */}
        <FAQSection
          title="Membership FAQs"
          subtitle="Everything you need to know about joining Fisique"
          faqs={membershipFAQs}
          includeSchema={false}
        />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us for current membership pricing and any ongoing offers. 
              Start your fitness journey at Kokapet's premier gym.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515847444?text=Hi%2C%20I%27m%20interested%20in%20gym%20membership%20at%20Fisique%20Kokapet">
                  <Phone className="w-5 h-5 mr-2" />
                  Request Pricing on WhatsApp
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/personal-training-kokapet">
                  Explore Personal Training
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default GymMembershipKokapet;
