'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Car, Users, Clock, Thermometer, Dumbbell } from 'lucide-react';

const faqs = [
  { question: 'How far is Fisique Fitness from Puppalaguda?', answer: 'Fisique Fitness is just 6 minutes from Puppalaguda. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via the Narsingi road.' },
  { question: 'What makes Fisique different from Puppalaguda gyms?', answer: 'Fisique is a boutique personal training studio with limited membership. Unlike commercial gyms, you get 1:1 coaching, certified trainers, customised nutrition, and a private sauna—all in a focused, uncrowded environment.' },
  { question: 'Do you have flexible timing for working professionals?', answer: 'Absolutely! We\'re open 5:30 AM to 10 PM, Monday to Saturday. Personal training sessions are scheduled around your convenience—early morning, midday, or evening.' },
  { question: 'Is sauna included with membership?', answer: 'Sauna is included with all personal training packages. For gym-only members, sauna access is available as an add-on.' },
  { question: 'Can I get a free trial?', answer: 'Yes! We offer a free consultation and trial session. Contact us at +91-9515469444 to book.' },
];

export default function GymPuppalagudaContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Puppalaguda"
      badge="Just 6 mins from Puppalaguda"
      BadgeIcon={Car}
      h1Line1="Premium Gym Near"
      h1Highlight="Puppalaguda"
      description="Your closest premium fitness destination. Experience 1:1 personal training, nutrition counseling, and sauna recovery—all just 6 minutes from Puppalaguda."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Puppalaguda%20and%20I%27m%20interested%20in%20a%20free%20trial"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions from Puppalaguda"
      whyTitle="Why Puppalaguda Residents Choose Fisique"
      whyBody={
        <>
          <p>Puppalaguda is one of the closest neighbourhoods to Fisique Fitness. At just 6 minutes away, it's practically your neighbourhood gym—but with a premium experience you won't find elsewhere.</p>
          <p>Our Puppalaguda members love that they can get world-class <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">personal training</a> without driving across the city. With certified coaches, nutrition guidance, and sauna recovery, every session is productive. Prefer to train independently? Our <a href="/gym-membership-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">gym membership plans</a> give you full access at a flexible pace.</p>
          <p>Whether you're a working professional, a homemaker, or a student, our personalised approach ensures you get the attention and results you deserve.</p>
        </>
      }
      whyExtra={
        <div className="tile p-4 mt-2">
          <h3 className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-2 border-b hairline pb-2 mb-3"><Car className="h-3.5 w-3.5 text-accent" />Easy Access from Puppalaguda</h3>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li>• <strong>From Puppalaguda Main Road:</strong> 6 mins via Narsingi Road</li>
            <li>• <strong>From Narsingi:</strong> 3 mins via Kokapet Junction</li>
            <li>• <strong>From Manikonda:</strong> 10 mins via ORR</li>
            <li>• <strong>From Gandipet:</strong> 7 mins via Kokapet Road</li>
          </ul>
        </div>
      }
      features={[
        { Icon: Users, title: '1:1 Coaching', desc: 'Dedicated trainers for personalised attention.' },
        { Icon: Clock, title: 'Flexible Hours', desc: '5:30 AM to 10 PM, six days a week.' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'Private sauna for post-workout relaxation.' },
        { Icon: Dumbbell, title: 'No Crowds', desc: 'Boutique environment, equipment always free.' },
      ]}
      faqs={faqs}
      faqTitle="Questions from Puppalaguda Residents"
      faqSubtitle="Everything you need to know about joining Fisique"
      currentPath="/gym-puppalaguda"
      finalCtaTitle="Start Your Fitness Journey Today"
      finalCtaDesc="Join Puppalaguda residents who train at Fisique Fitness."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Puppalaguda%20and%20want%20to%20book%20a%20free%20trial"
      finalCtaWhatsappLabel="Book Free Trial"
    />
  );
}
