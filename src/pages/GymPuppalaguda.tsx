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
    question: "How far is Fisique Fitness from Puppalaguda?",
    answer: "Fisique Fitness is just 6 minutes from Puppalaguda. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via the Narsingi road."
  },
  {
    question: "What makes Fisique different from Puppalaguda gyms?",
    answer: "Fisique is a boutique personal training studio with limited membership. Unlike commercial gyms, you get 1:1 coaching, certified trainers, customised nutrition, and a private sauna—all in a focused, uncrowded environment."
  },
  {
    question: "Do you have flexible timing for working professionals?",
    answer: "Absolutely! We're open 5:30 AM to 10 PM, Monday to Saturday. Personal training sessions are scheduled around your convenience—early morning, midday, or evening."
  },
  {
    question: "Is sauna included with membership?",
    answer: "Sauna is included with all personal training packages. For gym-only members, sauna access is available as an add-on."
  },
  {
    question: "Can I get a free trial?",
    answer: "Yes! We offer a free consultation and trial session. Contact us at +91-9515469444 to book."
  }
];

const GymPuppalaguda = () => {
  const { seo } = useSEO('/gym-puppalaguda');

  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Gym Near Puppalaguda' }
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <link rel="canonical" href={seo.canonicalUrl || "https://fisique.fitness/gym-puppalaguda"} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/gym-puppalaguda" />
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
                <span className="text-sm font-medium text-primary">Just 6 mins from Puppalaguda</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Gym Near{" "}
                <span className="text-primary">Puppalaguda</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Your closest premium fitness destination. Experience 1:1 personal training, nutrition counseling, and sauna recovery—all just 6 minutes from Puppalaguda.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Puppalaguda%20and%20I%27m%20interested%20in%20a%20free%20trial">
                    <Phone className="w-5 h-5 mr-2" />
                    Book Free Trial
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5 mr-2" />
                    Get Directions from Puppalaguda
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
                  <span className="text-sm font-medium">Trusted by Puppalaguda Residents</span>
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
                  Why Puppalaguda Residents Choose Fisique
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Puppalaguda is one of the closest neighbourhoods to Fisique Fitness. At just 6 minutes away, it's practically your neighbourhood gym—but with a premium experience you won't find elsewhere.
                  </p>
                  <p>
                    Our Puppalaguda members love that they can get world-class personal training without driving across the city. With certified coaches, nutrition guidance, and sauna recovery, every session is productive.
                  </p>
                  <p>
                    Whether you're a working professional, a homemaker, or a student, our personalised approach ensures you get the attention and results you deserve.
                  </p>
                </div>

                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    Easy Access from Puppalaguda
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Puppalaguda Main Road:</strong> 6 mins via Narsingi Road</li>
                    <li>• <strong>From Narsingi:</strong> 3 mins via Kokapet Junction</li>
                    <li>• <strong>From Manikonda:</strong> 10 mins via ORR</li>
                    <li>• <strong>From Gandipet:</strong> 7 mins via Kokapet Road</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">1:1 Coaching</h3>
                  <p className="text-sm text-muted-foreground">Dedicated trainers for personalised attention.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Hours</h3>
                  <p className="text-sm text-muted-foreground">5:30 AM to 10 PM, six days a week.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Sauna Recovery</h3>
                  <p className="text-sm text-muted-foreground">Private sauna for post-workout relaxation.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">No Crowds</h3>
                  <p className="text-sm text-muted-foreground">Boutique environment, equipment always free.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />

        <FAQSection title="Questions from Puppalaguda Residents" subtitle="Everything you need to know about joining Fisique" faqs={faqs} includeSchema={false} />

        <NearbyLocationsSection currentPath="/gym-puppalaguda" />

        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start Your Fitness Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join Puppalaguda residents who train at Fisique Fitness.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Puppalaguda%20and%20want%20to%20book%20a%20free%20trial">
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

export default GymPuppalaguda;
