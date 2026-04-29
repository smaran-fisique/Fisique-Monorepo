'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Car, Users, Clock, Thermometer, Dumbbell } from 'lucide-react';

const faqs = [
  { question: 'How far is Fisique Fitness from Manikonda?', answer: 'Fisique Fitness is approximately 10 minutes from Manikonda. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—easily accessible via ORR or the Narsingi road.' },
  { question: 'Why should I travel to Kokapet instead of joining a gym in Manikonda?', answer: 'Most gyms in Manikonda are large, crowded commercial facilities. Fisique offers a boutique personal training experience with 1:1 coaching, a private sauna, and certified trainers—worth the short 10-minute drive.' },
  { question: 'Do you offer morning batches for Manikonda residents?', answer: 'Yes! We open at 5:30 AM, so you can get a great workout before your commute. Our personal training sessions are flexible and scheduled around your convenience.' },
  { question: 'What\'s included in a personal training package?', answer: 'Every PT package includes 1:1 coaching sessions, customised nutrition plans, progress tracking, sauna access, and our signature 90-day transformation program structure.' },
  { question: 'Can I visit for a trial before signing up?', answer: 'Absolutely! We offer free consultation and trial sessions. Contact us at +91-9515469444 to book yours.' },
];

export default function GymManikondaContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Manikonda"
      badge="Just 10 mins from Manikonda"
      BadgeIcon={Car}
      h1Line1="Premium Gym Near"
      h1Highlight="Manikonda"
      description="Tired of impersonal gyms in Manikonda? Drive 10 minutes to experience boutique personal training with certified coaches, sauna recovery, and a focused environment built for results."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Manikonda%20and%20I%27m%20interested%20in%20a%20free%20trial"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions from Manikonda"
      whyTitle="Why Manikonda Residents Choose Fisique"
      whyBody={
        <>
          <p>Manikonda has plenty of gyms, but finding one with personalised coaching and a premium experience is a different story. Most gyms in the area are packed and impersonal.</p>
          <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> is just 10 minutes from Manikonda via ORR, offering what no gym nearby can: <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">certified personal trainers</a>, <a href="/gym-membership-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">flexible membership plans</a>, and a private sauna for recovery.</p>
          <p>Our Manikonda members say the short drive is worth it for the personalised attention and the results they've achieved with us.</p>
        </>
      }
      whyExtra={
        <div className="tile p-4 mt-2">
          <h3 className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-2 border-b hairline pb-2 mb-3"><Car className="h-3.5 w-3.5 text-accent" />Easy Access from Manikonda</h3>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li>• <strong>From Manikonda Main Road:</strong> 10 mins via ORR</li>
            <li>• <strong>From Puppalaguda:</strong> 6 mins via Narsingi Road</li>
            <li>• <strong>From Narsingi:</strong> 3 mins via Kokapet Junction</li>
            <li>• <strong>From Shaikpet:</strong> 12 mins via ORR</li>
          </ul>
        </div>
      }
      features={[
        { Icon: Users, title: '1:1 Coaching', desc: 'Dedicated trainers who customise every session.' },
        { Icon: Clock, title: 'Early Bird Slots', desc: 'Open at 5:30 AM—workout before your commute.' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'On-site sauna for post-workout muscle recovery.' },
        { Icon: Dumbbell, title: 'Premium Equipment', desc: 'Top-tier equipment, always available.' },
      ]}
      faqs={faqs}
      faqTitle="Questions from Manikonda Residents"
      faqSubtitle="Everything you need to know about joining Fisique"
      currentPath="/gym-manikonda"
      finalCtaTitle="Start Your Fitness Journey Today"
      finalCtaDesc="Join Manikonda residents who've already discovered Fisique Fitness."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Manikonda%20and%20want%20to%20book%20a%20free%20trial"
      finalCtaWhatsappLabel="Book Free Trial"
    />
  );
}
