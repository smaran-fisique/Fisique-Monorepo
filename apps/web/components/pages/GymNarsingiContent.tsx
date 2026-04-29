'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Car, Users, Home, Thermometer, Dumbbell } from 'lucide-react';

const faqs = [
  {
    question: 'How far is Fisique Fitness from Narsingi?',
    answer: 'Fisique Fitness is just 3-5 minutes from Narsingi. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—an easy drive via the main road connecting Narsingi to Kokapet.',
  },
  {
    question: 'What makes this gym different from others near Narsingi?',
    answer: 'Unlike crowded commercial gyms, Fisique is a boutique personal training studio. We offer 1:1 coaching, limited membership for personalized attention, private sauna, and certified trainers who create customized programs for your goals.',
  },
  {
    question: 'Do you offer morning and evening slots?',
    answer: 'Yes! We\'re open 5:30 AM to 10 PM, Monday to Saturday. We have slots that fit any schedule—early morning for those who prefer to workout before work, or evening for after-work sessions.',
  },
  {
    question: 'Is there parking available?',
    answer: 'Yes, Avant Cedar building has dedicated parking space for members. The gym is on the 4th floor with easy elevator access.',
  },
  {
    question: 'What services are available for Narsingi residents?',
    answer: 'We offer personal training packages (including our signature 90-day transformation), gym memberships, nutrition counseling, and sauna recovery. All services are designed for busy professionals and residents who want real results.',
  },
];

export default function GymNarsingiContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Narsingi"
      badge="Just 3 mins from Narsingi"
      BadgeIcon={Car}
      h1Line1="Premium Gym Near"
      h1Highlight="Narsingi"
      description="Your neighborhood's best-kept fitness secret. Experience boutique personal training with certified coaches, private sauna recovery, and a community that supports your goals—all just minutes from home."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Narsingi%20and%20I%27m%20interested%20in%20a%20free%20trial"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions from Narsingi"
      whyTitle="Why Narsingi Residents Choose Fisique"
      whyBody={
        <>
          <p>Living in Narsingi means you're part of one of Hyderabad's fastest-growing residential areas. But finding a quality gym nearby that isn't overcrowded or impersonal can be challenging.</p>
          <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness in Kokapet</a> is just a 3-minute drive from Narsingi, offering everything big gyms can't: <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">personal 1:1 training</a>, no waiting for equipment, and trainers who actually know your name and your goals.</p>
          <p>Many Narsingi families and professionals have made us their home gym. They appreciate our boutique atmosphere, the convenience of our location, and the real results our personalized approach delivers.</p>
        </>
      }
      whyExtra={
        <div className="tile p-4 mt-2">
          <h3 className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-2 border-b hairline pb-2 mb-3"><Car className="h-3.5 w-3.5 text-accent" />Easy Access from Narsingi</h3>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li>• <strong>From Narsingi Main Road:</strong> 3 mins via Kokapet Junction</li>
            <li>• <strong>From Narsingi X Roads:</strong> 5 mins via Outer Ring Road</li>
            <li>• <strong>From Puppalaguda:</strong> 6 mins via Narsingi Road</li>
            <li>• <strong>From Neknampur:</strong> 7 mins direct route</li>
          </ul>
        </div>
      }
      features={[
        { Icon: Users, title: 'Personal Attention', desc: '1:1 training with coaches who track your progress and adjust your program.' },
        { Icon: Home, title: 'Family-Friendly', desc: 'Safe, welcoming environment for all fitness levels and age groups.' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'On-site sauna for muscle recovery and relaxation after your workout.' },
        { Icon: Dumbbell, title: 'Premium Equipment', desc: 'Top-tier equipment that\'s always available—no waiting, no crowds.' },
      ]}
      services={{
        title: 'Services for Narsingi Residents',
        items: [
          { Icon: Users, title: 'Personal Training', desc: 'Transform your body with our 90-day programs. 1:1 coaching, nutrition guidance, and accountability to help you reach your goals.', href: '/personal-training-kokapet', price: 'From ₹15,000–22,000/month' },
          { Icon: Dumbbell, title: 'Gym Membership', desc: 'Access premium equipment in a boutique setting. Perfect for self-motivated individuals who want a quality workout space.', href: '/gym-membership-kokapet', price: 'From ₹5,000/month' },
          { Icon: Thermometer, title: 'Sauna & Recovery', desc: 'Complete your fitness routine with sauna therapy. Great for muscle recovery, stress relief, and overall wellness.', price: 'Included with PT packages' },
        ],
      }}
      faqs={faqs}
      faqTitle="Questions from Narsingi Residents"
      faqSubtitle="Everything you need to know about joining Fisique"
      currentPath="/gym-narsingi"
      finalCtaTitle="Start Your Fitness Journey Today"
      finalCtaDesc="Join your Narsingi neighbors who've already discovered Fisique Fitness. Book a free trial and see why we're the area's most trusted gym."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20live%20in%20Narsingi%20and%20want%20to%20book%20a%20free%20trial"
      finalCtaWhatsappLabel="Book Free Trial"
    />
  );
}
