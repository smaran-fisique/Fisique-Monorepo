import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSection } from "@/components/FAQSection";
import { FAQSchema } from "@/components/FAQSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ReviewsSection } from "@/components/ReviewsSection";
import { NearbyLocationsSection } from "@/components/NearbyLocationsSection";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, Car, Home } from "lucide-react";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";
import { useSEO } from "@/hooks/useSEO";

const faqs = [
  {
    question: "How far is Fisique Fitness from Gandipet?",
    answer: "Fisique Fitness is just 7 minutes from Gandipet and Khajaguda. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via Gandipet Road."
  },
  {
    question: "What makes Fisique better than gyms closer to Gandipet?",
    answer: "Fisique is a boutique personal training studio, not a crowded commercial gym. You get 1:1 certified coaching, a private sauna, customised nutrition plans, and a community atmosphere that larger gyms simply can't offer."
  },
  {
    question: "Do you cater to residents of Khajaguda too?",
    answer: "Yes! Many of our members come from Khajaguda, which is just 5-6 minutes away. The drive to Fisique is short and easy via the Kokapet junction."
  },
  {
    question: "What are the membership options?",
    answer: "We offer personal training packages (including our signature 90-day transformation), gym memberships (1, 3, 6, and 12-month plans), nutrition counseling, and sauna recovery sessions."
  },
  {
    question: "Is there a trial session available?",
    answer: "Yes! We offer a free consultation and trial session for all new members. Contact us at +91-9515469444 to book yours."
  }
];

const GymGandipet = () => {
  const { seo } = useSEO('/gym-gandipet');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Gym Near Gandipet' }
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <link rel="canonical" href={seo.canonicalUrl || "https://fisique.fitness/gym-gandipet"} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/gym-gandipet" />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      </Helmet>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={faqs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      <main>
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Just 7 mins from Gandipet</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Gym Near{" "}
                <span className="text-primary">Gandipet</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Living near the lake but struggling to find a quality gym? Experience boutique personal training with certified coaches, sauna recovery, and a serene workout environment—just 7 minutes from Gandipet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20near%20Gandipet%20and%20I%27m%20interested%20in%20a%20free%20trial">
                    <Phone className="w-5 h-5 mr-2" />
                    Book Free Trial
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5 mr-2" />
                    Get Directions from Gandipet
                  </a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">4.9★ on Google</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Home className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Trusted by Gandipet Residents</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Mon-Sat: 5:30 AM - 10 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Why Gandipet Residents Choose Fisique
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Gandipet and Khajaguda are known for their peaceful lakeside living. But when it comes to fitness, options nearby are limited to basic gyms without expert guidance.
                  </p>
                  <p>
                    Fisique Fitness in Kokapet is just 7 minutes from Gandipet, offering certified personal trainers, customised nutrition plans, and an on-site sauna—everything you need for a complete fitness transformation.
                  </p>
                  <p>
                    Our members from Gandipet appreciate the boutique atmosphere, the short commute, and the fact that their workout time is always productive with a dedicated trainer.
                  </p>
                </div>

                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    Easy Access from Gandipet
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Gandipet Lake:</strong> 7 mins via Kokapet Road</li>
                    <li>• <strong>From Khajaguda:</strong> 5 mins via main road</li>
                    <li>• <strong>From Narsingi:</strong> 3 mins via Kokapet Junction</li>
                    <li>• <strong>From Rajendranagar:</strong> 12 mins via ORR</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Personal Attention</h3>
                  <p className="text-sm text-muted-foreground">1:1 training with coaches who track your progress.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Home className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Family-Friendly</h3>
                  <p className="text-sm text-muted-foreground">Safe, welcoming environment for all fitness levels.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Sauna Recovery</h3>
                  <p className="text-sm text-muted-foreground">On-site sauna for muscle recovery and relaxation.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Premium Equipment</h3>
                  <p className="text-sm text-muted-foreground">Top-tier equipment—no waiting, no crowds.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />

        <FAQSection title="Questions from Gandipet Residents" subtitle="Everything you need to know about joining Fisique" faqs={faqs} includeSchema={false} />

        <NearbyLocationsSection currentPath="/gym-gandipet" />

        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start Your Fitness Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join your Gandipet neighbours who've already discovered Fisique Fitness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20near%20Gandipet%20and%20want%20to%20book%20a%20free%20trial">
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Trial
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+919515469444">Call +91-9515469444</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <StickyBottomCTA />
    </>
  );
};

export default GymGandipet;
