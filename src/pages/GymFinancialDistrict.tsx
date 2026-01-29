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
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, Car, Building2 } from "lucide-react";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";

const financialDistrictFAQs = [
  {
    question: "How far is Fisique Fitness from Financial District?",
    answer: "Fisique Fitness is just 5 minutes (2.5 km) from Financial District. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—an easy commute before or after work."
  },
  {
    question: "What are the gym timings for IT professionals?",
    answer: "We're open from 5:30 AM to 10 PM, Monday to Saturday. Many Financial District professionals prefer early morning (5:30-8 AM) or evening (6-9 PM) slots that fit their work schedules."
  },
  {
    question: "Do you offer corporate wellness programs for Financial District companies?",
    answer: "Yes! We offer special corporate rates and group wellness programs for companies in Financial District. Contact us to discuss customized packages for your organization."
  },
  {
    question: "Is parking available near the gym?",
    answer: "Yes, Avant Cedar has ample parking space. The building is easily accessible with dedicated parking for gym members."
  },
  {
    question: "What makes Fisique different from gyms in Financial District?",
    answer: "Unlike crowded commercial gyms, we're a boutique personal training studio with limited membership. You get 1:1 attention, certified coaches, private sauna, and no waiting for equipment—perfect for time-conscious professionals."
  }
];

const GymFinancialDistrict = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Gym Near Financial District' }
  ];

  return (
    <>
      <Helmet>
        <title>Best Gym Near Financial District Hyderabad | Fisique Fitness Kokapet</title>
        <meta
          name="description"
          content="Premium gym just 5 mins from Financial District Hyderabad. 1:1 personal training, private sauna, flexible hours for IT professionals. 4.9★ rated. Book free trial."
        />
        <meta
          name="keywords"
          content="gym near financial district hyderabad, fitness center financial district, gym for IT professionals hyderabad, personal training financial district, gym kokapet near financial district"
        />
        <link rel="canonical" href="https://fisique.fitness/gym-financial-district" />
        <meta property="og:title" content="Best Gym Near Financial District Hyderabad | Fisique Fitness" />
        <meta
          property="og:description"
          content="Premium personal training gym just 5 mins from Financial District. Perfect for IT professionals."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/gym-financial-district" />
      </Helmet>
      <LocalBusinessSchema />
      <ServiceSchema />
      <FAQSchema faqs={financialDistrictFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Just 5 mins from Financial District</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Gym Near{" "}
                <span className="text-primary">Financial District</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                The perfect gym for IT professionals. Skip the crowded commercial gyms and experience 
                1:1 personal training, private sauna recovery, and flexible hours designed for your 
                busy schedule.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Financial%20District%20and%20I%27m%20interested%20in%20a%20free%20trial">
                    <Phone className="w-5 h-5 mr-2" />
                    Book Free Trial
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
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Mon-Sat: 5:30 AM - 10 PM</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Sun: 7 AM - 12 PM (Self-train)</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Free Parking</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why FD Professionals Choose Us */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Why Financial District Professionals Choose Fisique
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Working in Financial District means long hours, high stress, and little time 
                    for fitness. Commercial gyms are crowded during your only free hours, and 
                    finding consistent motivation is challenging.
                  </p>
                  <p>
                    That's why we built Fisique Fitness in Kokapet—just a 5-minute drive from 
                    your office. Our boutique studio offers what big gyms can't: personal attention, 
                    no waiting for equipment, and trainers who understand the demands of corporate life.
                  </p>
                  <p>
                    Many of our members are IT professionals, managers, and entrepreneurs from 
                    Financial District who've tried everything. They stay because our personalized 
                    approach delivers results they couldn't achieve elsewhere.
                  </p>
                </div>

                {/* Commute Info */}
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    Quick Commute from Financial District
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Raheja Mindspace:</strong> 5 mins via Kokapet Main Road</li>
                    <li>• <strong>From Salarpuria Sattva:</strong> 6 mins via Narsingi Road</li>
                    <li>• <strong>From Phoenix Arena:</strong> 4 mins direct route</li>
                    <li>• <strong>From Laxmi Cyber City:</strong> 7 mins via Kokapet Junction</li>
                  </ul>
                </div>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">1:1 Personal Training</h3>
                  <p className="text-sm text-muted-foreground">
                    No group classes, no distractions. Just you and your certified coach.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">IT-Friendly Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    Mon-Sat 5:30 AM - 10 PM. Sundays 7 AM - 12 PM (self-train only).
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Stress Relief Sauna</h3>
                  <p className="text-sm text-muted-foreground">
                    Decompress after a stressful day with our on-site sauna facility.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">No Waiting</h3>
                  <p className="text-sm text-muted-foreground">
                    Limited membership means equipment is always available when you need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Services for Busy Professionals
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Efficient workouts designed to maximize results in minimal time
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <a
                href="/personal-training-kokapet"
                className="group p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  Personal Training
                </h3>
                <p className="text-muted-foreground mb-4">
                  Our 90-day transformation programs are designed for professionals who need 
                  structured, efficient workouts that deliver visible results.
                </p>
                <div className="text-sm text-primary font-medium">
                  From ₹15,000–22,000/month →
                </div>
              </a>

              <a
                href="/gym-membership-kokapet"
                className="group p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Dumbbell className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  Gym Membership
                </h3>
                <p className="text-muted-foreground mb-4">
                  Premium equipment access in a boutique environment. No crowds, 
                  no waiting—just focused workouts when you need them.
                </p>
                <div className="text-sm text-primary font-medium">
                  From ₹5,000/month →
                </div>
              </a>

              <div className="p-8 bg-card border border-border/50 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Thermometer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Corporate Wellness
                </h3>
                <p className="text-muted-foreground mb-4">
                  Special rates for Financial District companies. Group wellness programs, 
                  team building sessions, and corporate discounts available.
                </p>
                <div className="text-sm text-muted-foreground">
                  Contact for pricing
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FAQSection 
          title="Questions from Financial District Professionals"
          subtitle="Common questions about our gym and services"
          faqs={financialDistrictFAQs}
          includeSchema={false}
        />

        {/* Google Maps */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              5 Minutes from Financial District
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—easy access from all FD offices
            </p>

            <div className="aspect-video rounded-2xl overflow-hidden border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.123456789!2d78.34009!3d17.3871076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb95d94e825109%3A0x6ba7f754df2b8672!2sFisique%20Fitness%20-%20Best%20Gym%20in%20Kokapet!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fisique Fitness - Near Financial District"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Transform Your Fitness Routine?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join other Financial District professionals who've made Fisique Fitness 
              their go-to gym. Book a free trial and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Financial%20District%20and%20want%20to%20book%20a%20free%20trial">
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Trial
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

export default GymFinancialDistrict;
