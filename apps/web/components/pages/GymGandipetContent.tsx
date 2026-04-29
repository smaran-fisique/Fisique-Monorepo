'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Car, Users, Home, Thermometer, Dumbbell } from 'lucide-react';

const faqs = [
  { question: 'How far is Fisique Fitness from Gandipet?', answer: 'Fisique Fitness is just 7 minutes from Gandipet and Khajaguda. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—a quick drive via Gandipet Road.' },
  { question: 'What makes Fisique better than gyms closer to Gandipet?', answer: 'Fisique is a boutique personal training studio, not a crowded commercial gym. You get 1:1 certified coaching, a private sauna, customised nutrition plans, and a community atmosphere that larger gyms simply can\'t offer.' },
  { question: 'Do you cater to residents of Khajaguda too?', answer: 'Yes! Many of our members come from Khajaguda, which is just 5-6 minutes away. The drive to Fisique is short and easy via the Kokapet junction.' },
  { question: 'What are the membership options?', answer: 'We offer personal training packages (including our signature 90-day transformation), gym memberships (1, 3, 6, and 12-month plans), nutrition counseling, and sauna recovery sessions.' },
  { question: 'Is there a trial session available?', answer: 'Yes! We offer a free consultation and trial session for all new members. Contact us at +91-9515469444 to book yours.' },
];

export default function GymGandipetContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Gandipet"
      badge="Just 7 mins from Gandipet"
      BadgeIcon={Car}
      h1Line1="Premium Gym Near"
      h1Highlight="Gandipet"
      description="Living near the lake but struggling to find a quality gym? Experience boutique personal training with certified coaches, sauna recovery, and a serene workout environment—just 7 minutes from Gandipet."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20near%20Gandipet%20and%20I%27m%20interested%20in%20a%20free%20trial"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions from Gandipet"
      whyTitle="Why Gandipet Residents Choose Fisique"
      whyBody={
        <>
          <p>Gandipet and Khajaguda are known for their peaceful lakeside living. But when it comes to fitness, options nearby are limited to basic gyms without expert guidance.</p>
          <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness in Kokapet</a> is just 7 minutes from Gandipet, offering <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">certified personal trainers</a>, customised nutrition plans, and an on-site sauna—everything you need for a complete fitness transformation.</p>
          <p>Our members from Gandipet appreciate the boutique atmosphere, the short commute, and the fact that their workout time is always productive with a dedicated trainer.</p>
        </>
      }
      whyExtra={
        <div className="tile p-4 mt-2">
          <h3 className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-2 border-b hairline pb-2 mb-3"><Car className="h-3.5 w-3.5 text-accent" />Easy Access from Gandipet</h3>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li>• <strong>From Gandipet Lake:</strong> 7 mins via Kokapet Road</li>
            <li>• <strong>From Khajaguda:</strong> 5 mins via main road</li>
            <li>• <strong>From Narsingi:</strong> 3 mins via Kokapet Junction</li>
            <li>• <strong>From Rajendranagar:</strong> 12 mins via ORR</li>
          </ul>
        </div>
      }
      features={[
        { Icon: Users, title: 'Personal Attention', desc: '1:1 training with coaches who track your progress.' },
        { Icon: Home, title: 'Family-Friendly', desc: 'Safe, welcoming environment for all fitness levels.' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'On-site sauna for muscle recovery and relaxation.' },
        { Icon: Dumbbell, title: 'Premium Equipment', desc: 'Top-tier equipment—no waiting, no crowds.' },
      ]}
      faqs={faqs}
      faqTitle="Questions from Gandipet Residents"
      faqSubtitle="Everything you need to know about joining Fisique"
      currentPath="/gym-gandipet"
      finalCtaTitle="Start Your Fitness Journey Today"
      finalCtaDesc="Join your Gandipet neighbours who've already discovered Fisique Fitness."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20near%20Gandipet%20and%20want%20to%20book%20a%20free%20trial"
      finalCtaWhatsappLabel="Book Free Trial"
    />
  );
}
