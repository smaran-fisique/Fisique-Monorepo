'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Car, Users, Clock, Thermometer, Dumbbell } from 'lucide-react';

const faqs = [
  { question: 'How far is Fisique Fitness from Gachibowli?', answer: 'Fisique Fitness is approximately 8 minutes from Gachibowli and Nanakramguda. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via the Financial District road.' },
  { question: 'Is this gym suitable for IT professionals working in Gachibowli?', answer: 'Absolutely! Many of our members are IT professionals from Gachibowli and Financial District. We offer flexible scheduling from 5:30 AM to 10 PM, so you can work out before or after office hours.' },
  { question: 'What\'s different about Fisique compared to gyms in Gachibowli?', answer: 'Unlike large commercial gyms in Gachibowli, Fisique is a boutique personal training studio with limited membership. You get 1:1 coaching, no waiting for equipment, and certified trainers who create programs tailored to your goals.' },
  { question: 'Do you offer corporate wellness programs for Gachibowli companies?', answer: 'While we don\'t run corporate group programs, many teams from Gachibowli tech companies train with us individually. Our personal training approach delivers better results than generic group classes.' },
  { question: 'Is there parking at Fisique Fitness?', answer: 'Yes, Avant Cedar building has dedicated parking space for members. The gym is on the 4th floor with easy elevator access.' },
];

export default function GymGachibowliContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Gachibowli"
      badge="Just 8 mins from Gachibowli"
      BadgeIcon={Car}
      h1Line1="Premium Gym Near"
      h1Highlight="Gachibowli"
      description="Escape the crowded Gachibowli gyms. Experience boutique personal training with certified coaches, private sauna recovery, and a focused environment designed for results—just 8 minutes from your office."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Gachibowli%20and%20I%27m%20interested%20in%20a%20free%20trial"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions from Gachibowli"
      whyTitle="Why Gachibowli Professionals Choose Fisique"
      whyBody={
        <>
          <p>Working in Gachibowli's tech corridor means long hours and high stress. The last thing you need is a crowded gym where you wait 20 minutes for a squat rack.</p>
          <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> is just 8 minutes from Gachibowli, offering a boutique <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">personal training</a> experience with certified coaches who understand the demands of a corporate lifestyle.</p>
          <p>Many tech professionals from companies in Gachibowli and Nanakramguda have made Fisique their go-to gym. They value the personalised attention, flexible scheduling, and real results.</p>
        </>
      }
      whyExtra={
        <div className="tile p-4 mt-2">
          <h3 className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-2 border-b hairline pb-2 mb-3"><Car className="h-3.5 w-3.5 text-accent" />Easy Access from Gachibowli</h3>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li>• <strong>From Gachibowli IT Hub:</strong> 8 mins via Nanakramguda Road</li>
            <li>• <strong>From DLF Cyber City:</strong> 10 mins via ORR</li>
            <li>• <strong>From Nanakramguda:</strong> 6 mins via Kokapet Road</li>
            <li>• <strong>From Botanical Garden:</strong> 7 mins direct route</li>
          </ul>
        </div>
      }
      features={[
        { Icon: Users, title: '1:1 Coaching', desc: 'Personal trainers who know your name, goals, and schedule.' },
        { Icon: Clock, title: 'Flexible Hours', desc: '5:30 AM start for early risers, open till 10 PM for after-work sessions.' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'De-stress after work with on-site sauna therapy.' },
        { Icon: Dumbbell, title: 'No Crowds', desc: 'Boutique environment—never wait for equipment.' },
      ]}
      services={{
        title: 'Services for Gachibowli Residents',
        items: [
          { Icon: Users, title: 'Personal Training', desc: 'Transform your body with our 90-day programs. 1:1 coaching, nutrition guidance, and accountability.', href: '/personal-training-kokapet', price: 'From ₹15,000–22,000/month' },
          { Icon: Dumbbell, title: 'Gym Membership', desc: 'Access premium equipment in a boutique setting. Perfect for self-motivated individuals.', href: '/gym-membership-kokapet', price: 'From ₹5,000/month' },
          { Icon: Thermometer, title: 'Sauna & Recovery', desc: 'Complete your fitness routine with sauna therapy. Great for muscle recovery and stress relief.', price: 'Included with PT packages' },
        ],
      }}
      faqs={faqs}
      faqTitle="Questions from Gachibowli Professionals"
      faqSubtitle="Everything you need to know about joining Fisique"
      currentPath="/gym-gachibowli"
      finalCtaTitle="Start Your Fitness Journey Today"
      finalCtaDesc="Join Gachibowli professionals who've already discovered Fisique Fitness. Book a free trial and see why we're the area's most trusted gym."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Gachibowli%20and%20want%20to%20book%20a%20free%20trial"
      finalCtaWhatsappLabel="Book Free Trial"
    />
  );
}
