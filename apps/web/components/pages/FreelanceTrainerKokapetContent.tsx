'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { NearbyLocationsSection } from '@/components/NearbyLocationsSection';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, UserCheck, CheckCircle2 } from 'lucide-react';
import { StickyBottomCTA } from '@/components/StickyBottomCTA';

const freelanceKokapetFAQs = [
  {
    question: 'Can I bring my own personal trainer to Fisique Fitness?',
    answer: "Yes! We welcome freelance trainers and physiotherapists to train their clients at Fisique. We offer trainer access passes that allow you to use our premium equipment and facilities while working with your own coach.",
  },
  {
    question: 'How does the BYOT (Bring Your Own Trainer) program work?',
    answer: 'Your trainer gets facility access to bring you in for sessions. You benefit from our premium equipment, boutique environment, and optional sauna access while continuing with your trusted coach.',
  },
  {
    question: 'What facilities are available for freelance training?',
    answer: 'Full access to our strength training equipment, free weights, cable machines, cardio equipment, and functional training areas. Sauna access can be added for recovery sessions.',
  },
  {
    question: 'What are the costs for trainer access passes?',
    answer: 'We offer flexible pricing for trainers—daily, weekly, and monthly passes. Contact us at +91-9515469444 for current rates and to discuss your training needs.',
  },
  {
    question: 'Why should I train at Fisique instead of at home or a park?',
    answer: "Our studio offers climate-controlled comfort, professional-grade equipment, a boutique non-crowded environment, and sauna for recovery—all things that aren't available for outdoor or home training.",
  },
];

export default function FreelanceTrainerKokapetContent() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <UserCheck className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Bring Your Own Trainer (BYOT)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Freelance Trainer Access in{' '}
                <span className="text-primary">Kokapet</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Already have a personal trainer you love? Bring them to <a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a>!
                Our BYOT program gives freelance trainers and their clients access to
                premium equipment in a boutique, uncrowded environment. Prefer a structured program? See our <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">in-house personal training</a> options.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20freelance%20trainer%20access%20at%20Fisique">
                    <Phone className="w-5 h-5 mr-2" />Enquire About Trainer Access
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5 mr-2" />Get Directions
                  </a>
                </Button>
              </div>

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
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">How Freelance Trainer Access Works</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Simple, flexible access for trainers and their clients</p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { num: '1', title: 'Trainer Registers', desc: 'Your personal trainer contacts us to get a facility access pass. We verify their credentials and set up their account.' },
                { num: '2', title: 'Book Your Sessions', desc: 'Schedule sessions with your trainer at times that work for you. Our flexible hours accommodate most schedules.' },
                { num: '3', title: 'Train in Premium Space', desc: 'Enjoy our boutique gym environment with professional equipment, climate control, and optional sauna recovery.' },
              ].map((step) => (
                <div key={step.num} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-2xl font-bold text-primary">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Why Train at Fisique with Your Own Trainer</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Premium Equipment', desc: "Professional-grade strength and cardio equipment that your trainer can utilize for comprehensive programming." },
                    { title: 'Boutique Environment', desc: 'No crowds, no waiting for equipment. Train in a focused, distraction-free space.' },
                    { title: 'Sauna Access', desc: "Add sauna sessions for enhanced recovery—something you can't get training outdoors or at home." },
                    { title: 'Climate Controlled', desc: 'Air-conditioned comfort year-round. No weather-related cancellations or discomfort.' },
                  ].map((item) => (
                    <div key={item.title} className="flex gap-4">
                      <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Your Trainer</h3>
                  <p className="text-sm text-muted-foreground">Keep working with the coach you trust and have built rapport with.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Our Equipment</h3>
                  <p className="text-sm text-muted-foreground">Access to a full range of strength and cardio equipment.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Sauna Recovery</h3>
                  <p className="text-sm text-muted-foreground">Optional add-on for post-workout muscle recovery.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Hours</h3>
                  <p className="text-sm text-muted-foreground">5:30 AM - 10 PM, Mon-Sat. Train when it suits you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Trainers Section */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">For Freelance Trainers &amp; Physiotherapists</h2>
              <p className="text-xl text-muted-foreground mb-8">Looking for a professional space to train your clients in Kokapet?</p>
              <div className="bg-card border border-border/50 rounded-2xl p-8 text-left">
                <h3 className="text-xl font-semibold mb-4">Trainer Access Includes:</h3>
                <ul className="space-y-3 mb-6">
                  {[
                    'Full equipment access during operating hours',
                    'Bring multiple clients throughout the day',
                    'Flexible daily, weekly, or monthly passes',
                    'Sauna access options for client recovery',
                    'Professional, boutique environment',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20freelance%20trainer%20interested%20in%20facility%20access">
                    <Phone className="w-5 h-5 mr-2" />Contact for Trainer Rates
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
        <FAQSection title="Freelance Trainer Access FAQs" subtitle="Common questions about our BYOT program" faqs={freelanceKokapetFAQs} includeSchema={false} />
        <NearbyLocationsSection currentPath="/freelance-trainer-kokapet" />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Ready to Train with Your Coach at Fisique?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Contact us to learn about trainer access passes and get started with premium gym access in Kokapet.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20freelance%20trainer%20access">
                  <Phone className="w-5 h-5 mr-2" />Enquire Now
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
}
