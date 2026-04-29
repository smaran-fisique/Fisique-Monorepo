'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Car, Users, Clock, Thermometer, Dumbbell } from 'lucide-react';

const faqs = [
  { question: 'How far is Fisique Fitness from Tellapur?', answer: 'Fisique Fitness is approximately 12 minutes from Tellapur and Nallagandla. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—accessible via ORR or the Kokapet-Tellapur road.' },
  { question: 'Is the drive from Tellapur worth it?', answer: 'Absolutely. Our Tellapur members consistently say the 12-minute drive is worth it for the quality of coaching, the boutique atmosphere, and the real results they achieve. You won\'t find this level of personalisation closer to home.' },
  { question: 'Do you serve Nallagandla residents too?', answer: 'Yes! Nallagandla is even closer at about 10 minutes. Many of our members come from both Tellapur and Nallagandla.' },
  { question: 'What\'s the best route from Tellapur?', answer: 'The quickest route is via ORR towards Financial District, then exit at Kokapet. It\'s a smooth 12-minute drive with minimal traffic, especially during early morning or evening hours.' },
  { question: 'Do you offer a free trial?', answer: 'Yes! We offer a free consultation and trial session for all prospective members. Contact us at +91-9515469444 to schedule yours.' },
];

export default function GymTellапурContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Tellapur"
      badge="Just 12 mins from Tellapur"
      BadgeIcon={Car}
      h1Line1="Premium Gym Near"
      h1Highlight="Tellapur"
      description="Looking for a gym that's worth the drive? Fisique Fitness offers boutique personal training, certified coaches, and sauna recovery—a 12-minute drive from Tellapur that delivers real results."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Tellapur%20and%20I%27m%20interested%20in%20a%20free%20trial"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions from Tellapur"
      whyTitle="Why Tellapur Residents Choose Fisique"
      whyBody={
        <>
          <p>Tellapur and Nallagandla are growing rapidly, but quality fitness options with expert coaching are still scarce. Most gyms in the area offer equipment access without the guidance you need.</p>
          <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> is just 12 minutes via ORR, offering <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">certified personal trainers</a> who create customised programs, nutrition counseling, and an on-site sauna—a complete fitness ecosystem.</p>
          <p>Our members from Tellapur treat the short drive as part of their fitness routine. They arrive, train with focus, recover in the sauna, and leave transformed.</p>
        </>
      }
      whyExtra={
        <div className="tile p-4 mt-2">
          <h3 className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-2 border-b hairline pb-2 mb-3"><Car className="h-3.5 w-3.5 text-accent" />Easy Access from Tellapur</h3>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li>• <strong>From Tellapur:</strong> 12 mins via ORR</li>
            <li>• <strong>From Nallagandla:</strong> 10 mins via ORR</li>
            <li>• <strong>From Gachibowli:</strong> 8 mins via FD Road</li>
            <li>• <strong>From Financial District:</strong> 5 mins direct</li>
          </ul>
        </div>
      }
      features={[
        { Icon: Users, title: 'Expert Coaching', desc: 'Certified trainers who customise every program.' },
        { Icon: Clock, title: 'Flexible Schedule', desc: 'Train early morning or late evening.' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'Relax and recover with on-site sauna.' },
        { Icon: Dumbbell, title: 'Boutique Space', desc: 'Uncrowded, premium, always available.' },
      ]}
      faqs={faqs}
      faqTitle="Questions from Tellapur Residents"
      faqSubtitle="Everything you need to know about joining Fisique"
      currentPath="/gym-tellapur"
      finalCtaTitle="Start Your Fitness Journey Today"
      finalCtaDesc="Join Tellapur residents who've made Fisique Fitness their gym of choice."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Tellapur%20and%20want%20to%20book%20a%20free%20trial"
      finalCtaWhatsappLabel="Book Free Trial"
    />
  );
}
