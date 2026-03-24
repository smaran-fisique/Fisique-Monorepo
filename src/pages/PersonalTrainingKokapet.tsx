import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LocalBusinessSchema } from "@/components/LocalBusinessSchema";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";
import { FAQSection } from "@/components/FAQSection";
import { FAQSchema, personalTrainingFAQs } from "@/components/FAQSchema";
import { ReviewsSection } from "@/components/ReviewsSection";
import { NearbyLocationsSection } from "@/components/NearbyLocationsSection";
import { Button } from "@/components/ui/button";
import { Phone, Check, Target, Apple, Dumbbell, Thermometer, TrendingUp, Calendar } from "lucide-react";
import { StickyBottomCTA } from "@/components/StickyBottomCTA";
import { BlogPreviewSection } from "@/components/BlogPreviewSection";
import { useSEO } from "@/hooks/useSEO";

const PersonalTrainingKokapet = () => {
  const { seo } = useSEO('/personal-training-kokapet');
  
  const breadcrumbItems = [
    { name: 'Home', url: 'https://fisique.fitness/' },
    { name: 'Personal Training Kokapet' }
  ];

  const whatsIncluded = [
    { icon: Dumbbell, title: "1:1 Training Sessions", description: "Personalized workouts with certified trainers" },
    { icon: Target, title: "Custom Programs", description: "Tailored to your goals, fitness level, and schedule" },
    { icon: Apple, title: "Nutrition Guidance", description: "Personalized meal plans and dietary coaching" },
    { icon: Thermometer, title: "Sauna Recovery", description: "Post-workout sauna sessions included" },
    { icon: TrendingUp, title: "Progress Tracking", description: "Regular assessments and adjustments" },
    { icon: Calendar, title: "Flexible Scheduling", description: "Sessions that fit your busy lifestyle" },
  ];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <link rel="canonical" href={seo.canonicalUrl || "https://fisique.fitness/personal-training-kokapet"} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fisique.fitness/personal-training-kokapet" />
        {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}
      </Helmet>
      <LocalBusinessSchema includeRating={false} />
      <FAQSchema faqs={personalTrainingFAQs} />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-medium text-accent">90-Day Transformation Programs</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Personal Training{" "}
                <span className="text-primary">Kokapet</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Transform your body with expert one-on-one coaching. Customized programs, 
                nutrition guidance, and sauna recovery—all designed for busy professionals 
                who want real results.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20personal%20training%20at%20Fisique%20Kokapet">
                    <Phone className="w-5 h-5 mr-2" />
                    Start Free Trial
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+919515469444">
                    Call to Inquire
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              What's Included in Personal Training
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Comprehensive training packages designed for transformative results
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whatsIncluded.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-card/50 border border-border/50 rounded-xl hover:border-primary/30 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Our Science-Backed Approach
                </h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>
                    At Fisique, personal training isn't just about counting reps. Our certified 
                    coaches combine proven training methodologies with personalized nutrition 
                    and recovery protocols to deliver sustainable results.
                  </p>
                  <p>
                    We start with a comprehensive assessment of your current fitness level, 
                    lifestyle, and goals. From there, we build a customized 90-day program 
                    that progressively challenges you while respecting your body's need for 
                    recovery.
                  </p>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "Initial fitness assessment and goal setting",
                    "Customized strength and mobility programming",
                    "Weekly nutrition check-ins and meal planning",
                    "Progress tracking with regular body composition analysis",
                    "Sauna recovery sessions for muscle repair",
                    "Ongoing program adjustments based on results",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-accent" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 90-Day Transformation Card */}
              <div className="bg-card border border-border rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">90-Day Transformation</h3>
                  <p className="text-muted-foreground">
                    Our signature program for visible, lasting results
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Days 1-30: Foundation</h4>
                      <p className="text-sm text-muted-foreground">
                        Build proper form, establish habits, and start nutrition changes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Days 31-60: Progression</h4>
                      <p className="text-sm text-muted-foreground">
                        Increase intensity, refine nutrition, and build momentum
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold text-primary">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">Days 61-90: Transformation</h4>
                      <p className="text-sm text-muted-foreground">
                        Peak performance, visible results, and sustainable habits
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full mt-8 bg-accent hover:bg-accent/90 text-accent-foreground"
                  asChild
                >
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20the%2090-day%20transformation%20program">
                    <Phone className="w-5 h-5 mr-2" />
                    Start Your Transformation
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Placeholder */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">
              Real Transformations
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              See what our clients have achieved with dedicated personal training
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="aspect-square bg-muted/50 border border-border/50 rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center p-6">
                    <Target className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Client transformation story coming soon
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-muted-foreground mt-8">
              Want to be featured? Start your transformation today!
            </p>
          </div>
        </section>

        {/* Reviews */}
        <ReviewsSection />

        {/* From Our Blog */}
        <BlogPreviewSection />

        {/* FAQ */}
        <FAQSection
          title="Personal Training FAQs"
          subtitle="Common questions about our training programs"
          faqs={personalTrainingFAQs}
          includeSchema={false}
        />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Ready to Transform?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book a free consultation with our trainers and take the first step 
              toward your fitness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                asChild
              >
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20personal%20training%20at%20Fisique%20Kokapet">
                  <Phone className="w-5 h-5 mr-2" />
                  Book Free Consultation
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/kokapet-gym">
                  Learn About Our Gym
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

export default PersonalTrainingKokapet;
