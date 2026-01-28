import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSection } from "@/components/FAQSection";
import { FAQSchema, defaultFAQs } from "@/components/FAQSchema";
import { ReviewsSection } from "@/components/ReviewsSection";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock } from "lucide-react";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";

const KokapetGym = () => {
  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisiquefitness.com/' },
    { name: 'Kokapet Gym' }
  ];

  return (
    <>
      <Helmet>
        <title>Premium Personal Gym Kokapet | Fisique Fitness Hyderabad</title>
        <meta
          name="description"
          content="Discover 1:1 personal training + private sauna recovery at Fisique Fitness Kokapet. Located above Pulla Reddy Sweets, Avant Cedar. 4.9★ rated. Book free trial."
        />
        <meta
          name="keywords"
          content="gym kokapet, personal gym kokapet, fitness center kokapet, gym near me kokapet, personal training hyderabad, sauna gym kokapet"
        />
        <link rel="canonical" href="https://fisiquefitness.com/kokapet-gym" />
        <meta property="og:title" content="Premium Personal Gym Kokapet | Fisique Fitness" />
        <meta
          property="og:description"
          content="Kokapet's premier personal training studio with sauna recovery. 4.9★ rated."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisiquefitness.com/kokapet-gym" />
      </Helmet>
      <LocalBusinessSchema />
      <FAQSchema faqs={defaultFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="text-sm font-medium text-accent">4.9★ Rating on Google</span>
                <span className="text-muted-foreground text-sm">• 91+ Reviews</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Personal Gym{" "}
                <span className="text-primary">Kokapet</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Experience 1:1 personal training with certified coaches, private sauna recovery, 
                and customized nutrition plans—all in Kokapet's most exclusive fitness studio.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20a%20free%20trial%20at%20Fisique%20Kokapet">
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
                    Get Directions
                  </a>
                </Button>
              </div>

              {/* Location Info */}
              <div className="flex items-start gap-3 p-4 bg-card/50 border border-border/50 rounded-xl">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-foreground">
                    4th Floor, Above Pulla Reddy Sweets, Avant Cedar
                  </p>
                  <p className="text-muted-foreground">
                    Kokapet, Hyderabad • Near Financial District
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Kokapet Location */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Kokapet's Premier Personal Training Studio
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    Located in the heart of Kokapet, Fisique Fitness isn't your typical gym. 
                    We're a boutique personal training studio designed for busy professionals 
                    who want real results without the crowded gym experience.
                  </p>
                  <p>
                    Our 4th-floor location above Pulla Reddy Sweets in Avant Cedar offers 
                    a serene environment away from the noise, where you can focus entirely 
                    on your fitness journey. With easy access from Financial District, 
                    Narsingi, and Gandipet, we're perfectly positioned for Kokapet residents 
                    and professionals working in the area.
                  </p>
                  <p>
                    What sets us apart is our commitment to personalized attention. Unlike 
                    commercial gyms with hundreds of members, we maintain limited membership 
                    to ensure every client receives one-on-one coaching from certified trainers. 
                    Whether you're looking to lose weight, build strength, improve mobility, 
                    or enhance your overall wellness, our holistic approach combines customized 
                    training programs with nutrition guidance and sauna recovery.
                  </p>
                  <p>
                    Our trainers specialize in working with busy professionals who need 
                    flexible scheduling and efficient workouts. We understand that your time 
                    is valuable, which is why every session is optimized for maximum results.
                  </p>
                </div>
              </div>
              
              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Premium Equipment</h3>
                  <p className="text-sm text-muted-foreground">
                    Top-tier strength training and cardio equipment
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">1:1 Training</h3>
                  <p className="text-sm text-muted-foreground">
                    Personal attention from certified coaches
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Sauna Recovery</h3>
                  <p className="text-sm text-muted-foreground">
                    On-site sauna for post-workout recovery
                  </p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Hours</h3>
                  <p className="text-sm text-muted-foreground">
                    5:30 AM - 10 PM, Mon-Sat
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Our Services in Kokapet
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Comprehensive fitness solutions tailored to your goals
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
                  1:1 coaching with customized programs, nutrition guidance, and progress tracking. 
                  Our signature 90-day transformation programs deliver real results.
                </p>
                <span className="text-primary font-medium">
                  Learn more →
                </span>
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
                  Access premium equipment in an uncrowded, boutique environment. 
                  Flexible 1, 3, 6, and 12-month plans available.
                </p>
                <span className="text-primary font-medium">
                  View plans →
                </span>
              </a>

              <div className="p-8 bg-card border border-border/50 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <Thermometer className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Sauna Recovery
                </h3>
                <p className="text-muted-foreground mb-4">
                  Included with PT packages or as an add-on. Sauna therapy aids muscle recovery, 
                  reduces stress, and enhances overall wellness.
                </p>
                <span className="text-muted-foreground">
                  Included with PT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FAQSection 
          title="Questions About Our Kokapet Gym?"
          subtitle="Find answers about membership, training, and our facilities"
          includeSchema={false}
        />

        {/* Google Maps Embed */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Find Us in Kokapet
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Conveniently located above Pulla Reddy Sweets in Avant Cedar
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
                title="Fisique Fitness Kokapet Location"
              />
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Start Your Fitness Journey in Kokapet?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a free consultation and experience what makes Fisique Fitness 
              Kokapet's most trusted personal training studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20a%20free%20consultation%20at%20Fisique%20Kokapet">
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Consultation
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

export default KokapetGym;
