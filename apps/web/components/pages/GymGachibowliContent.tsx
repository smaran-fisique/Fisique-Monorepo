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
  { question: 'How far is Fisique Fitness from Gachibowli?', answer: 'Fisique Fitness is approximately 8 minutes from Gachibowli and Nanakramguda. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via the Financial District road.' },
  { question: 'Is this gym suitable for IT professionals working in Gachibowli?', answer: 'Absolutely! Many of our members are IT professionals from Gachibowli and Financial District. We offer flexible scheduling from 5:30 AM to 10 PM, so you can work out before or after office hours.' },
  { question: 'What\'s different about Fisique compared to gyms in Gachibowli?', answer: 'Unlike large commercial gyms in Gachibowli, Fisique is a boutique personal training studio with limited membership. You get 1:1 coaching, no waiting for equipment, and certified trainers who create programs tailored to your goals.' },
  { question: 'Do you offer corporate wellness programs for Gachibowli companies?', answer: 'While we don\'t run corporate group programs, many teams from Gachibowli tech companies train with us individually. Our personal training approach delivers better results than generic group classes.' },
  { question: 'Is there parking at Fisique Fitness?', answer: 'Yes, Avant Cedar building has dedicated parking space for members. The gym is on the 4th floor with easy elevator access.' },
];

export default function GymGachibowliContent() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 relative overflow-hidden px-4">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <div className="container-custom relative">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
                <Car className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Just 8 mins from Gachibowli</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Premium Gym Near <span className="text-primary">Gachibowli</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Escape the crowded Gachibowli gyms. Experience boutique personal training with certified coaches, private sauna recovery, and a focused environment designed for results—just 8 minutes from your office.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                  <a href="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Gachibowli%20and%20I%27m%20interested%20in%20a%20free%20trial">
                    <Phone className="w-5 h-5 mr-2" />Book Free Trial
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9" target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-5 h-5 mr-2" />Get Directions from Gachibowli
                  </a>
                </Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Star className="w-4 h-4 fill-accent text-accent" /><span className="text-sm font-medium">4.9★ on Google</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Home className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Trusted by Gachibowli Professionals</span>
                </div>
                <div className="flex items-center gap-2 bg-card/50 border border-border/50 rounded-lg px-4 py-2">
                  <Clock className="w-4 h-4 text-primary" /><span className="text-sm font-medium">Mon-Sat: 5:30 AM - 10 PM</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 border-t border-border px-4">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Why Gachibowli Professionals Choose Fisique</h2>
                <div className="prose prose-lg text-muted-foreground space-y-4">
                  <p>Working in Gachibowli's tech corridor means long hours and high stress. The last thing you need is a crowded gym where you wait 20 minutes for a squat rack.</p>
                  <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> is just 8 minutes from Gachibowli, offering a boutique <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">personal training</a> experience with certified coaches who understand the demands of a corporate lifestyle.</p>
                  <p>Many tech professionals from companies in Gachibowli and Nanakramguda have made Fisique their go-to gym. They value the personalised attention, flexible scheduling, and real results.</p>
                </div>
                <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <h3 className="font-semibold mb-3 flex items-center gap-2"><Car className="w-5 h-5 text-primary" />Easy Access from Gachibowli</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• <strong>From Gachibowli IT Hub:</strong> 8 mins via Nanakramguda Road</li>
                    <li>• <strong>From DLF Cyber City:</strong> 10 mins via ORR</li>
                    <li>• <strong>From Nanakramguda:</strong> 6 mins via Kokapet Road</li>
                    <li>• <strong>From Botanical Garden:</strong> 7 mins direct route</li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Users className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">1:1 Coaching</h3><p className="text-sm text-muted-foreground">Personal trainers who know your name, goals, and schedule.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Clock className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Flexible Hours</h3><p className="text-sm text-muted-foreground">5:30 AM start for early risers, open till 10 PM for after-work sessions.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Thermometer className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">Sauna Recovery</h3><p className="text-sm text-muted-foreground">De-stress after work with on-site sauna therapy.</p></div>
                <div className="p-6 bg-card/50 border border-border/50 rounded-xl"><Dumbbell className="w-8 h-8 text-primary mb-4" /><h3 className="font-semibold mb-2">No Crowds</h3><p className="text-sm text-muted-foreground">Boutique environment—never wait for equipment.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 bg-muted/30 border-t border-border px-4">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-4">Services for Gachibowli Residents</h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">Comprehensive fitness solutions for busy professionals</p>
            <div className="grid md:grid-cols-3 gap-8">
              <a href="/personal-training-kokapet" className="group p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6"><Users className="w-6 h-6 text-primary" /></div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Personal Training</h3>
                <p className="text-muted-foreground mb-4">Transform your body with our 90-day programs. 1:1 coaching, nutrition guidance, and accountability.</p>
                <div className="text-sm text-primary font-medium">From ₹15,000–22,000/month →</div>
              </a>
              <a href="/gym-membership-kokapet" className="group p-8 bg-card border border-border/50 rounded-2xl hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6"><Dumbbell className="w-6 h-6 text-primary" /></div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">Gym Membership</h3>
                <p className="text-muted-foreground mb-4">Access premium equipment in a boutique setting. Perfect for self-motivated individuals.</p>
                <div className="text-sm text-primary font-medium">From ₹5,000/month →</div>
              </a>
              <div className="p-8 bg-card border border-border/50 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6"><Thermometer className="w-6 h-6 text-primary" /></div>
                <h3 className="text-xl font-semibold mb-3">Sauna & Recovery</h3>
                <p className="text-muted-foreground mb-4">Complete your fitness routine with sauna therapy. Great for muscle recovery and stress relief.</p>
                <div className="text-sm text-muted-foreground">Included with PT packages</div>
              </div>
            </div>
          </div>
        </section>

        <ReviewsSection />
        <FAQSection title="Questions from Gachibowli Professionals" subtitle="Everything you need to know about joining Fisique" faqs={faqs} includeSchema={false} />
        <NearbyLocationsSection currentPath="/gym-gachibowli" />

        <section className="py-16 sm:py-20 bg-primary/5 border-t border-border px-4">
          <div className="container-custom text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Start Your Fitness Journey Today</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">Join Gachibowli professionals who've already discovered Fisique Fitness. Book a free trial and see why we're the area's most trusted gym.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground" asChild>
                <a href="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Gachibowli%20and%20want%20to%20book%20a%20free%20trial">
                  <Phone className="w-5 h-5 mr-2" />Book Free Trial
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
