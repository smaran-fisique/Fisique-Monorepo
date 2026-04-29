'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Star, Dumbbell, Users, Thermometer, Clock } from 'lucide-react';

export default function KokapetGymContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Kokapet"
      badge="4.9★ Rating on Google · 91+ Reviews"
      BadgeIcon={Star}
      h1Line1="Premium Personal Gym"
      h1Highlight="Kokapet"
      description="Experience 1:1 personal training with certified coaches, private sauna recovery, and customized nutrition plans—all in Kokapet's most exclusive fitness studio."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20a%20free%20trial%20at%20Fisique%20Kokapet"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions"
      whyTitle="Kokapet's Premier Personal Training Studio"
      whyBody={
        <>
          <p>Located in the heart of Kokapet, Fisique Fitness isn't your typical gym. We're a boutique personal training studio designed for busy professionals who want real results without the crowded gym experience.</p>
          <p>Our 4th-floor location above Pulla Reddy Sweets in Avant Cedar offers a serene environment away from the noise, where you can focus entirely on your fitness journey. With easy access from Financial District, Narsingi, and Gandipet, we're perfectly positioned for Kokapet residents and professionals working in the area.</p>
          <p>What sets us apart is our commitment to personalized attention. Unlike commercial gyms with hundreds of members, we maintain limited membership to ensure every client receives one-on-one coaching from certified trainers. Whether you're looking to lose weight, build strength, improve mobility, or enhance your overall wellness, our holistic approach combines customized training programs with nutrition guidance and sauna recovery.</p>
          <p>Our trainers specialize in working with busy professionals who need flexible scheduling and efficient workouts. We understand that your time is valuable, which is why every session is optimized for maximum results.</p>
        </>
      }
      features={[
        { Icon: Dumbbell, title: 'Premium Equipment', desc: 'Top-tier strength training and cardio equipment' },
        { Icon: Users, title: '1:1 Training', desc: 'Personal attention from certified coaches' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'On-site sauna for post-workout recovery' },
        { Icon: Clock, title: 'Flexible Hours', desc: 'Mon-Sat: 5:30 AM - 10 PM, Sun: 7 AM - 12 PM (Self-train)' },
      ]}
      services={{
        title: 'Our Services in Kokapet',
        items: [
          { Icon: Users, title: 'Personal Training', desc: '1:1 coaching with customized programs, nutrition guidance, and progress tracking. Our signature 90-day transformation programs deliver real results.', href: '/personal-training-kokapet' },
          { Icon: Dumbbell, title: 'Gym Membership', desc: 'Access premium equipment in an uncrowded, boutique environment. Flexible 1, 3, 6, and 12-month plans available.', href: '/gym-membership-kokapet' },
          { Icon: Thermometer, title: 'Sauna Recovery', desc: 'Included with PT packages or as an add-on. Sauna therapy aids muscle recovery, reduces stress, and enhances overall wellness.', price: 'Included with PT' },
        ],
      }}
      currentPath="/kokapet-gym"
      finalCtaTitle="Ready to Start Your Fitness Journey in Kokapet?"
      finalCtaDesc="Book a free consultation and experience what makes Fisique Fitness Kokapet's most trusted personal training studio."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20a%20free%20consultation%20at%20Fisique%20Kokapet"
      finalCtaWhatsappLabel="Book Free Consultation"
    />
  );
}
