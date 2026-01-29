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
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, Car, Home } from "lucide-react";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";

const narsingiFAQs = [
  {
    question: "How far is Fisique Fitness from Narsingi?",
    answer: "Fisique Fitness is just 3-5 minutes from Narsingi. We're located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—an easy drive via the main road connecting Narsingi to Kokapet."
  },
  {
    question: "What makes this gym different from others near Narsingi?",
    answer: "Unlike crowded commercial gyms, Fisique is a boutique personal training studio. We offer 1:1 coaching, limited membership for personalized attention, private sauna, and certified trainers who create customized programs for your goals."
  },
  {
    question: "Do you offer morning and evening slots?",
    answer: "Yes! We're open 5:30 AM to 10 PM, Monday to Saturday. We have slots that fit any schedule—early morning for those who prefer to workout before work, or evening for after-work sessions."
  },
  {
    question: "Is there parking available?",
    answer: "Yes, Avant Cedar building has dedicated parking space for members. The gym is on the 4th floor with easy elevator access."
  },
  {
    question: "What services are available for Narsingi residents?",
    answer: "We offer personal training packages (including our signature 90-day transformation), gym memberships, nutrition counseling, and sauna recovery. All services are designed for busy professionals and residents who want real results."
  }
];

const GymNarsingi = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Gym Near Narsingi' }
  ];

  return (
    <>
      <Helmet>
        <title>Best Gym Near Narsingi Hyderabad | Fisique Fitness Kokapet</title>
        <meta
          name="description"
          content="Premium personal training gym just 3 mins from Narsingi, Hyderabad. 1:1 coaching, private sauna, flexible hours. 4.9★ rated. Book your free trial today."
        />
        <meta
          name="keywords"
          content="gym near narsingi, fitness center narsingi hyderabad, personal trainer near narsingi, gym kokapet narsingi, best gym narsingi area"
        />
        <link rel="canonical" href="https://fisique.fitness/gym-narsingi" />
        <meta property="og:title" content="Best Gym Near Narsingi Hyderabad | Fisique Fitness" />
        <meta
          property="og:description"
          content="Premium personal training gym just 3 mins from Narsingi. 1:1 coaching and private sauna."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/gym-narsingi" />
      </Helmet>
      <LocalBusinessSchema />
      <ServiceSchema />
      <FAQSchema faqs={narsingiFAQs} />
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
                <span className="text-sm font-medium text-primary">Just 3 mins from Narsingi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Gym Near{" "}
                <span className="text-primary">Narsingi</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Your neighborhood's best-kept fitness secret. Experience boutique personal training 
                with certified coaches, private sauna recovery, and a community that supports your goals—all 
                just minutes from home.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Narsingi%20and%20I%27m%20interested%20in%20a%20free%20trial">
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
                    Get Directions from Narsingi
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
                  <Home className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Trusted by Narsingi Residents</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">5:30 AM - 10 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Narsingi Residents Choose Us */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Why Narsingi Residents Choose Fisique
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Living in Narsingi means you're part of one of Hyderabad's fastest-growing 
                    residential areas. But finding a quality gym nearby that isn't overcrowded 
                    or impersonal can be challenging.
                  </p>
                  <p>
                    Fisique Fitness in Kokapet is just a 3-minute drive from Narsingi, offering 
                    everything big gyms can't: personal attention, no waiting for equipment, 
                    and trainers who actually know your name and your goals.
                  </p>
                  <p>
                    Many Narsingi families and professionals have made us their home gym. 
                    They appreciate our boutique atmosphere, the convenience of our location, 
                    and the real results our personalized approach delivers.
                  </p>
                </div>

                {/* Commute Info */}
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    Easy Access from Narsingi
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Narsingi Main Road:</strong> 3 mins via Kokapet Junction</li>
                    <li>• <strong>From Narsingi X Roads:</strong> 5 mins via Outer Ring Road</li>
                    <li>• <strong>From Puppalaguda:</strong> 6 mins via Narsingi Road</li>
                    <li>• <strong>From Neknampur:</strong> 7 mins direct route</li>
                  </ul>
                </div>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Personal Attention</h3>
                  <p className="text-sm text-muted-foreground">
                    1:1 training with coaches who track your progress and adjust your program.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Home className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Family-Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Safe, welcoming environment for all fitness levels and age groups.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Sauna Recovery</h3>
                  <p className="text-sm text-muted-foreground">
                    On-site sauna for muscle recovery and relaxation after your workout.
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Premium Equipment</h3>
                  <p className="text-sm text-muted-foreground">
                    Top-tier equipment that's always available—no waiting, no crowds.
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
              Services for Narsingi Residents
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Comprehensive fitness solutions close to home
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
                  Transform your body with our 90-day programs. 1:1 coaching, nutrition 
                  guidance, and accountability to help you reach your goals.
                </p>
                <div className="text-sm text-primary font-medium">
                  From ₹15,000/month →
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
                  Access premium equipment in a boutique setting. Perfect for 
                  self-motivated individuals who want a quality workout space.
                </p>
                <div className="text-sm text-primary font-medium">
                  From ₹3,000/month →
                </div>
              </a>

              <div className="p-8 bg-card border border-border/50 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Thermometer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Sauna & Recovery
                </h3>
                <p className="text-muted-foreground mb-4">
                  Complete your fitness routine with sauna therapy. Great for 
                  muscle recovery, stress relief, and overall wellness.
                </p>
                <div className="text-sm text-muted-foreground">
                  Included with PT packages
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FAQSection 
          title="Questions from Narsingi Residents"
          subtitle="Everything you need to know about joining Fisique"
          faqs={narsingiFAQs}
          includeSchema={false}
        />

        {/* Google Maps */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Just 3 Minutes from Narsingi
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Located in Kokapet, above Pulla Reddy Sweets in Avant Cedar
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
                title="Fisique Fitness - Near Narsingi"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Start Your Fitness Journey Today
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join your Narsingi neighbors who've already discovered Fisique Fitness. 
              Book a free trial and see why we're the area's most trusted gym.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Narsingi%20and%20want%20to%20book%20a%20free%20trial">
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

export default GymNarsingi;
