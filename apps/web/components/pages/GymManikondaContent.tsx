'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FAQSection } from '@/components/FAQSection';
import { ReviewsSection } from '@/components/ReviewsSection';
import { NearbyLocationsSection } from '@/components/NearbyLocationsSection';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Star, Dumbbell, Users, Thermometer, Clock, Car, Home } from 'lucide-react';
import { StickyBottomCTA } from '@/components/StickyBottomCTA';

const faqs = [
  { question: 'How far is Fisique Fitness from Manikonda?', answer: 'Fisique Fitness is approximately 10 minutes from Manikonda. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—easily accessible via ORR or the Narsingi road.' },
  { question: 'Why should I travel to Kokapet instead of joining a gym in Manikonda?', answer: 'Most gyms in Manikonda are large, crowded commercial facilities. Fisique offers a boutique personal training experience with 1:1 coaching, a private sauna, and certified trainers—worth the short 10-minute drive.' },
  { question: 'Do you offer morning batches for Manikonda residents?', answer: 'Yes! We open at 5:30 AM, so you can get a great workout before your commute. Our personal training sessions are flexible and scheduled around your convenience.' },
  { question: 'What\'s included in a personal training package?', answer: 'Every PT package includes 1:1 coaching sessions, customised nutrition plans, progress tracking, sauna access, and our signature 90-day transformation program structure.' },
  { question: 'Can I visit for a trial before signing up?', answer: 'Absolutely! We offer free consultation and trial sessions. Contact us at +91-9515469444 to book yours.' },
];

export default function GymManikondaContent() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Car className="w-4 h-4 text-primary" /><span className="text-sm font-medium text-primary">Just 10 mins from Manikonda</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Gym Near <span className="text-primary">Manikonda</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Tired of impersonal gyms in Manikonda? Drive 10 minutes to experience boutique personal training with certified coaches, sauna recovery, and a focused environment built for results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Manikonda%20and%20I%27m%20interested%20in%20a%20free%20trial">
                    <Phone className="w-5 h-5 mr-2" />Book Free Trial
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5 mr-2" />Get Directions from Manikonda
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2"><Star className="w-4 h-4 fill-accent text-accent" /><span className="text-sm font-medium">4.9★ on Google</span></div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2"><Home className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Trusted by Manikonda Residents</span></div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2"><Clock className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Mon-Sat: 5:30 AM - 10 PM</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Why Manikonda Residents Choose Fisique</h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>Manikonda has plenty of gyms, but finding one with personalised coaching and a premium experience is a different story. Most gyms in the area are packed and impersonal.</p>
                  <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> is just 10 minutes from Manikonda via ORR, offering what no gym nearby can: <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">certified personal trainers</a>, <a href="/gym-membership-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">flexible membership plans</a>, and a private sauna for recovery.</p>
                  <p>Our Manikonda members say the short drive is worth it for the personalised attention and the results they've achieved with us.</p>
                </div>
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Car className="w-5 h-5 text-primary" />Easy Access from Manikonda</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Manikonda Main Road:</strong> 10 mins via ORR</li>
                    <li>• <strong>From Puppalaguda:</strong> 6 mins via Narsingi Road</li>
                    <li>• <strong>From Narsingi:</strong> 3 mins via Kokapet Junction</li>
                    <li>• <strong>From Shaikpet:</strong> 12 mins via ORR</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Users className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">1:1 Coaching</h3><p className="text-sm text-muted-foreground">Dedicated trainers who customise every session.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Clock className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Early Bird Slots</h3><p className="text-sm text-muted-foreground">Open at 5:30 AM—workout before your commute.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Thermometer className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Sauna Recovery</h3><p className="text-sm text-muted-foreground">On-site sauna for post-workout muscle recovery.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Dumbbell className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Premium Equipment</h3><p className="text-sm text-muted-foreground">Top-tier equipment, always available.</p></div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
        <FAQSection title="Questions from Manikonda Residents" subtitle="Everything you need to know about joining Fisique" faqs={faqs} includeSchema={false} />
        <NearbyLocationsSection currentPath="/gym-manikonda" />

        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start Your Fitness Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join Manikonda residents who've already discovered Fisique Fitness.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Manikonda%20and%20want%20to%20book%20a%20free%20trial"><Phone className="w-5 h-5 mr-2" />Book Free Trial</a>
              </Button>
              <Button size="lg" variant="outline" asChild><a href="tel:+919515469444">Call +91-9515469444</a></Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyBottomCTA />
    </>
  );
}
