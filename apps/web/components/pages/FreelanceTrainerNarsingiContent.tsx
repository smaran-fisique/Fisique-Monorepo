'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { NearbyLocationsSection } from '@/components/NearbyLocationsSection';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, UserCheck, CheckCircle2, Car } from 'lucide-react';
import { StickyBottomCTA } from '@/components/StickyBottomCTA';

const freelanceNarsingiFAQs = [
  {
    question: 'Where can freelance trainers in Narsingi train their clients?',
    answer: 'Fisique Fitness in Kokapet (just 3 mins from Narsingi) offers trainer access passes for freelance trainers and physiotherapists to bring their clients. Full equipment access in a boutique environment.',
  },
  {
    question: 'How far is Fisique from Narsingi for freelance training?',
    answer: "We're just 3-5 minutes from Narsingi via the main road to Kokapet. Located above Pulla Reddy Sweets in Avant Cedar—very convenient for Narsingi residents and trainers.",
  },
  {
    question: "What's included in the trainer access pass?",
    answer: 'Full access to strength equipment, free weights, cardio machines, and functional training areas. Sauna access for client recovery can be added. Flexible daily, weekly, or monthly passes available.',
  },
  {
    question: 'Can I train multiple clients at Fisique?',
    answer: "Yes! Trainer passes allow you to bring different clients throughout the day. It's a professional alternative to training clients at their homes or in parks.",
  },
  {
    question: 'Why choose Fisique over home or outdoor training?',
    answer: "Professional equipment your clients can't access at home, climate-controlled comfort, sauna for recovery, and a focused environment—all benefits that outdoor or home training can't match.",
  },
];

export default function FreelanceTrainerNarsingiContent() {
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
                <Car className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Just 3 mins from Narsingi</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Freelance Trainer Access Near{' '}
                <span className="text-primary">Narsingi</span>
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Freelance trainers and physiotherapists serving Narsingi clients:
                upgrade from outdoor sessions to a professional gym environment at
                Fisique Fitness, just minutes away.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20trainer%20in%20Narsingi%20interested%20in%20facility%20access">
                    <Phone className="w-5 h-5 mr-2" />Enquire About Trainer Access
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5 mr-2" />Get Directions from Narsingi
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
                  <span className="text-sm font-medium">BYOT Welcome</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">Mon-Sat: 5:30 AM - 10 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Narsingi Trainers Choose Us */}
        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Why Narsingi Trainers Choose Fisique</h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>As a freelance trainer in Narsingi, you know the challenges: training clients outdoors means weather cancellations, limited equipment, and no recovery options like sauna.</p>
                  <p>Fisique Fitness is just a 3-minute drive from Narsingi. Our trainer access program lets you bring your clients to a professional gym environment with everything you need for comprehensive training.</p>
                  <p>Many freelance trainers from Narsingi, Puppalaguda, and Neknampur now use Fisique as their primary training location. Their clients appreciate the upgrade in facilities and comfort.</p>
                </div>

                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />Quick Access from Narsingi Area
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Narsingi Main Road:</strong> 3 mins</li>
                    <li>• <strong>From Puppalaguda:</strong> 5 mins</li>
                    <li>• <strong>From Neknampur:</strong> 6 mins</li>
                    <li>• <strong>From Narsingi X Roads:</strong> 4 mins</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Dumbbell className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Full Equipment</h3>
                  <p className="text-sm text-muted-foreground">Strength, cardio, and functional training equipment for any program.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Users className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Multiple Clients</h3>
                  <p className="text-sm text-muted-foreground">Train different clients throughout the day with one pass.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Thermometer className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Sauna Add-On</h3>
                  <p className="text-sm text-muted-foreground">Offer clients recovery sessions they can't get elsewhere.</p>
                </div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl">
                  <Clock className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">Flexible Passes</h3>
                  <p className="text-sm text-muted-foreground">Daily, weekly, or monthly options to suit your schedule.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits for Clients */}
        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">What Your Narsingi Clients Get</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Upgrade your clients' training experience</p>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: 'Professional Equipment', desc: "Equipment they can't access at home or in parks" },
                { title: 'Climate Control', desc: 'Comfortable training year-round, no weather issues' },
                { title: 'Sauna Recovery', desc: 'Post-workout recovery option unavailable elsewhere' },
                { title: 'Privacy', desc: 'Boutique environment, not a crowded commercial gym' },
              ].map((item) => (
                <div key={item.title} className="p-6 bg-card border border-border/50 rounded-xl text-center">
                  <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ReviewsSection />
        <FAQSection title="Freelance Training Near Narsingi FAQs" subtitle="Questions about trainer access for the Narsingi area" faqs={freelanceNarsingiFAQs} includeSchema={false} />
        <NearbyLocationsSection currentPath="/freelance-trainer-narsingi" />

        {/* Final CTA */}
        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Upgrade Your Training Practice</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Freelance trainers in Narsingi: contact us for trainer access rates and start offering your clients a professional gym experience.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20freelance%20trainer%20near%20Narsingi%20interested%20in%20facility%20access">
                  <Phone className="w-5 h-5 mr-2" />Get Trainer Access
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
