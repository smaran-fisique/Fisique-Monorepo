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
  { question: 'How far is Fisique Fitness from Tellapur?', answer: 'Fisique Fitness is approximately 12 minutes from Tellapur and Nallagandla. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—accessible via ORR or the Kokapet-Tellapur road.' },
  { question: 'Is the drive from Tellapur worth it?', answer: 'Absolutely. Our Tellapur members consistently say the 12-minute drive is worth it for the quality of coaching, the boutique atmosphere, and the real results they achieve. You won\'t find this level of personalisation closer to home.' },
  { question: 'Do you serve Nallagandla residents too?', answer: 'Yes! Nallagandla is even closer at about 10 minutes. Many of our members come from both Tellapur and Nallagandla.' },
  { question: 'What\'s the best route from Tellapur?', answer: 'The quickest route is via ORR towards Financial District, then exit at Kokapet. It\'s a smooth 12-minute drive with minimal traffic, especially during early morning or evening hours.' },
  { question: 'Do you offer a free trial?', answer: 'Yes! We offer a free consultation and trial session for all prospective members. Contact us at +91-9515469444 to schedule yours.' },
];

export default function GymTellапурContent() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Car className="w-4 h-4 text-primary" /><span className="text-sm font-medium text-primary">Just 12 mins from Tellapur</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Gym Near <span className="text-primary">Tellapur</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Looking for a gym that's worth the drive? Fisique Fitness offers boutique personal training, certified coaches, and sauna recovery—a 12-minute drive from Tellapur that delivers real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Tellapur%20and%20I%27m%20interested%20in%20a%20free%20trial"><Phone className="w-5 h-5 mr-2" />Book Free Trial</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9" target="_blank" rel="noopener noreferrer"><MapPin className="w-5 h-5 mr-2" />Get Directions from Tellapur</a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2"><Star className="w-4 h-4 fill-accent text-accent" /><span className="text-sm font-medium">4.9★ on Google</span></div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2"><Home className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Trusted by Tellapur Families</span></div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2"><Clock className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Mon-Sat: 5:30 AM - 10 PM</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Why Tellapur Residents Choose Fisique</h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>Tellapur and Nallagandla are growing rapidly, but quality fitness options with expert coaching are still scarce. Most gyms in the area offer equipment access without the guidance you need.</p>
                  <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> is just 12 minutes via ORR, offering <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">certified personal trainers</a> who create customised programs, nutrition counseling, and an on-site sauna—a complete fitness ecosystem.</p>
                  <p>Our members from Tellapur treat the short drive as part of their fitness routine. They arrive, train with focus, recover in the sauna, and leave transformed.</p>
                </div>
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Car className="w-5 h-5 text-primary" />Easy Access from Tellapur</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Tellapur:</strong> 12 mins via ORR</li>
                    <li>• <strong>From Nallagandla:</strong> 10 mins via ORR</li>
                    <li>• <strong>From Gachibowli:</strong> 8 mins via FD Road</li>
                    <li>• <strong>From Financial District:</strong> 5 mins direct</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Users className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Expert Coaching</h3><p className="text-sm text-muted-foreground">Certified trainers who customise every program.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Clock className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Flexible Schedule</h3><p className="text-sm text-muted-foreground">Train early morning or late evening.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Thermometer className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Sauna Recovery</h3><p className="text-sm text-muted-foreground">Relax and recover with on-site sauna.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Dumbbell className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Boutique Space</h3><p className="text-sm text-muted-foreground">Uncrowded, premium, always available.</p></div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
        <FAQSection title="Questions from Tellapur Residents" subtitle="Everything you need to know about joining Fisique" faqs={faqs} includeSchema={false} />
        <NearbyLocationsSection currentPath="/gym-tellapur" />

        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start Your Fitness Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join Tellapur residents who've made Fisique Fitness their gym of choice.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Tellapur%20and%20want%20to%20book%20a%20free%20trial"><Phone className="w-5 h-5 mr-2" />Book Free Trial</a>
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
