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
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, UserCheck, CheckCircle2, Building2 } from "lucide-react";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";
import { useSEO } from "@/hooks/useSEO";

const freelanceFDFAQs = [
  {
    question: "Where can freelance trainers near Financial District train clients?",
    answer: "Fisique Fitness in Kokapet (5 mins from FD) offers trainer access passes. Bring your IT professional clients to a premium gym with professional equipment, AC, and sauna—a major upgrade from outdoor or building gym training."
  },
  {
    question: "What are the timings for trainer access?",
    answer: "We're open 5:30 AM to 10 PM, Monday to Saturday. Perfect for training FD professionals before or after work hours."
  },
  {
    question: "How does this benefit my IT professional clients?",
    answer: "Your clients get professional equipment, climate control (important for Hyderabad weather), and sauna for stress relief—things not available in apartment gyms or outdoor training. It helps you deliver better results."
  },
  {
    question: "What's the cost for trainer access?",
    answer: "We offer flexible daily, weekly, and monthly passes for trainers. Contact us at +91-9515469444 for current rates and to discuss your needs."
  },
  {
    question: "Can I train corporate groups at Fisique?",
    answer: "Yes! We accommodate trainers running small group sessions for corporate clients. Our boutique environment ensures privacy and focus. Contact us for group training arrangements."
  }
];

const FreelanceTrainerFinancialDistrict = () => {
  const { seo } = useSEO('/freelance-trainer-financial-district');
  
  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Freelance Trainer Access Near Financial District' }
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title || "Freelance Trainer Access Near Financial District | BYOT Gym | Fisique Fitness"}</title>
        <meta name="description" content={seo.description || "Freelance trainers near Financial District Hyderabad: bring your IT professional clients to Fisique Fitness. Premium equipment, AC, sauna. Just 5 mins from FD."} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <link rel="canonical" href={seo.canonicalUrl || "https://fisique.fitness/freelance-trainer-financial-district"} />
        <meta property="og:title" content={seo.title || "Freelance Trainer Access Near Financial District | Fisique Fitness"} />
        <meta property="og:description" content={seo.description || "Freelance trainers near Financial District: bring your clients to Fisique Fitness. Premium equipment, AC, sauna."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/freelance-trainer-financial-district" />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      </Helmet>
      <LocalBusinessSchema includeRating={false} />
      <ServiceSchema />
      <FAQSchema faqs={freelanceFDFAQs} />
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
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">5 mins from Financial District</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Freelance Trainer Access Near{" "}
                <span className="text-primary">Financial District</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Train your IT professional clients in a premium environment. 
                Fisique Fitness offers trainer access passes with professional 
                equipment, AC, and sauna—just 5 minutes from Financial District.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20trainer%20serving%20Financial%20District%20clients%20and%20interested%20in%20facility%20access">
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
                    Get Directions from FD
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
                  <span className="text-sm font-medium">Corporate-Friendly</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">5:30 AM - 10 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why FD Trainers Choose Us */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Perfect for Training IT Professionals
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    IT professionals in Financial District have demanding schedules 
                    and high stress. They need efficient workouts in a comfortable 
                    environment—not outdoor training in Hyderabad's heat or cramped 
                    apartment gyms.
                  </p>
                  <p>
                    Fisique Fitness gives you the facilities to deliver professional 
                    training. Our premium equipment, climate control, and sauna 
                    allow you to offer comprehensive programs that get real results.
                  </p>
                  <p>
                    Many trainers serving FD clients have made Fisique their home 
                    base. The 5-minute commute from major tech parks makes it 
                    convenient for both early morning and evening sessions.
                  </p>
                </div>

                {/* Commute Info */}
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-primary" />
                    Quick Access from FD Offices
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Raheja Mindspace:</strong> 5 mins</li>
                    <li>• <strong>From Salarpuria Sattva:</strong> 6 mins</li>
                    <li>• <strong>From Phoenix Arena:</strong> 4 mins</li>
                    <li>• <strong>From Laxmi Cyber City:</strong> 7 mins</li>
                  </ul>
                </div>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Premium Equipment</h3>
                  <p className="text-sm text-muted-foreground">
                    Professional gear for strength, cardio, and functional training.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Stress-Relief Sauna</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for high-stress IT clients needing recovery.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Small Groups OK</h3>
                  <p className="text-sm text-muted-foreground">
                    Can accommodate small corporate group sessions.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">IT-Friendly Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Open 5:30 AM - 10 PM to fit any work schedule.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value for Corporate Clients */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Upgrade Your FD Clients' Experience
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              What your IT professional clients get when you train them at Fisique
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Air-Conditioned</h3>
                <p className="text-sm text-muted-foreground">
                  Comfortable year-round, no heat fatigue
                </p>
              </div>
              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Pro Equipment</h3>
                <p className="text-sm text-muted-foreground">
                  Better than apartment or office gyms
                </p>
              </div>
              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Sauna Recovery</h3>
                <p className="text-sm text-muted-foreground">
                  Stress relief for high-pressure jobs
                </p>
              </div>
              <div className="p-6 bg-card border border-border/50 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Not Crowded</h3>
                <p className="text-sm text-muted-foreground">
                  Boutique environment, focused sessions
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FAQSection 
          title="Freelance Training Near Financial District FAQs"
          subtitle="Questions about trainer access for FD professionals"
          faqs={freelanceFDFAQs}
          includeSchema={false}
        />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Elevate Your Training Business
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Trainers serving Financial District: upgrade your clients' experience 
              with professional facilities. Contact us for trainer access rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20trainer%20serving%20FD%20clients%20and%20interested%20in%20facility%20access">
                  <Phone className="w-5 h-5 mr-2" />
                  Get Trainer Access
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

export default FreelanceTrainerFinancialDistrict;
