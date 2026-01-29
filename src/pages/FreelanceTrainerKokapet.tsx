import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSection } from "@/components/FAQSection";
import { FAQSchema } from "@/components/FAQSchema";
import { ServiceSchema } from "@/components/ServiceSchema";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, UserCheck, CheckCircle2 } from "lucide-react";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";
import { useSEO } from "@/hooks/useSEO";

const freelanceKokapetFAQs = [
  {
    question: "Can I bring my own personal trainer to Fisique Fitness?",
    answer: "Yes! We welcome freelance trainers and physiotherapists to train their clients at Fisique. We offer trainer access passes that allow you to use our premium equipment and facilities while working with your own coach."
  },
  {
    question: "How does the BYOT (Bring Your Own Trainer) program work?",
    answer: "Your trainer gets facility access to bring you in for sessions. You benefit from our premium equipment, boutique environment, and optional sauna access while continuing with your trusted coach."
  },
  {
    question: "What facilities are available for freelance training?",
    answer: "Full access to our strength training equipment, free weights, cable machines, cardio equipment, and functional training areas. Sauna access can be added for recovery sessions."
  },
  {
    question: "What are the costs for trainer access passes?",
    answer: "We offer flexible pricing for trainers—daily, weekly, and monthly passes. Contact us at +91-9515469444 for current rates and to discuss your training needs."
  },
  {
    question: "Why should I train at Fisique instead of at home or a park?",
    answer: "Our studio offers climate-controlled comfort, professional-grade equipment, a boutique non-crowded environment, and sauna for recovery—all things that aren't available for outdoor or home training."
  }
];

const FreelanceTrainerKokapet = () => {
  const { seo } = useSEO('/freelance-trainer-kokapet');
  
  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Freelance Trainer Access Kokapet' }
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title || "Freelance Trainer Access in Kokapet | BYOT Gym | Fisique Fitness"}</title>
        <meta name="description" content={seo.description || "Bring your own personal trainer to Fisique Fitness Kokapet. Premium gym access for freelance trainers, physiotherapists & their clients. Professional equipment, boutique environment."} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <link rel="canonical" href={seo.canonicalUrl || "https://fisique.fitness/freelance-trainer-kokapet"} />
        <meta property="og:title" content={seo.title || "Freelance Trainer Access in Kokapet | Fisique Fitness"} />
        <meta property="og:description" content={seo.description || "Bring your own personal trainer to Fisique Fitness Kokapet. Premium gym access for freelance trainers and their clients."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/freelance-trainer-kokapet" />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      </Helmet>
      <LocalBusinessSchema />
      <ServiceSchema />
      <FAQSchema faqs={freelanceKokapetFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <UserCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Bring Your Own Trainer (BYOT)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Freelance Trainer Access in{" "}
                <span className="text-primary">Kokapet</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Already have a personal trainer you love? Bring them to Fisique Fitness! 
                Our BYOT program gives freelance trainers and their clients access to 
                premium equipment in a boutique, uncrowded environment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20freelance%20trainer%20access%20at%20Fisique">
                    <Phone className="w-5 h-5 mr-2" />
                    Enquire About Trainer Access
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Get Directions
                  </a>
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">4.9★ on Google</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Trainer-Friendly Facility</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Mon-Sat: 5:30 AM - 10 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How BYOT Works */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              How Freelance Trainer Access Works
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Simple, flexible access for trainers and their clients
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Trainer Registers</h3>
                <p className="text-muted-foreground">
                  Your personal trainer contacts us to get a facility access pass. 
                  We verify their credentials and set up their account.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Book Your Sessions</h3>
                <p className="text-muted-foreground">
                  Schedule sessions with your trainer at times that work for you. 
                  Our flexible hours accommodate most schedules.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Train in Premium Space</h3>
                <p className="text-muted-foreground">
                  Enjoy our boutique gym environment with professional equipment, 
                  climate control, and optional sauna recovery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Why Train at Fisique with Your Own Trainer
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Premium Equipment</h3>
                      <p className="text-muted-foreground">
                        Professional-grade strength and cardio equipment that your trainer can utilize 
                        for comprehensive programming.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Boutique Environment</h3>
                      <p className="text-muted-foreground">
                        No crowds, no waiting for equipment. Train in a focused, 
                        distraction-free space.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Sauna Access</h3>
                      <p className="text-muted-foreground">
                        Add sauna sessions for enhanced recovery—something you can't 
                        get training outdoors or at home.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">Climate Controlled</h3>
                      <p className="text-muted-foreground">
                        Air-conditioned comfort year-round. No weather-related 
                        cancellations or discomfort.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Your Trainer</h3>
                  <p className="text-sm text-muted-foreground">
                    Keep working with the coach you trust and have built rapport with.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Our Equipment</h3>
                  <p className="text-sm text-muted-foreground">
                    Access to a full range of strength and cardio equipment.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Sauna Recovery</h3>
                  <p className="text-sm text-muted-foreground">
                    Optional add-on for post-workout muscle recovery.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    5:30 AM - 10 PM, Mon-Sat. Train when it suits you.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Trainers Section */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                For Freelance Trainers & Physiotherapists
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Looking for a professional space to train your clients in Kokapet?
              </p>
              <div className="bg-card border border-border/50 rounded-2xl p-8 text-left">
                <h3 className="text-xl font-semibold mb-4">Trainer Access Includes:</h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Full equipment access during operating hours</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Bring multiple clients throughout the day</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Flexible daily, weekly, or monthly passes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Sauna access options for client recovery</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Professional, boutique environment</span>
                  </li>
                </ul>
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20freelance%20trainer%20interested%20in%20facility%20access">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact for Trainer Rates
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FAQSection 
          title="Freelance Trainer Access FAQs"
          subtitle="Common questions about our BYOT program"
          faqs={freelanceKokapetFAQs}
          includeSchema={false}
        />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Train with Your Coach at Fisique?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us to learn about trainer access passes and get started with 
              premium gym access in Kokapet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20freelance%20trainer%20access">
                  <Phone className="w-5 h-5 mr-2" />
                  Enquire Now
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+919515469444">
                  Call +91-9515469444
                </a>
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

export default FreelanceTrainerKokapet;
