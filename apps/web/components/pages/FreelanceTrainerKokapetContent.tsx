'use client';

import { Dumbbell, Users, Thermometer, Clock, UserCheck } from 'lucide-react';
import FreelanceTrainerTemplate from '@/components/templates/FreelanceTrainerTemplate';

const freelanceKokapetFAQs = [
  {
    question: 'Can I bring my own personal trainer to Fisique Fitness?',
    answer: "Yes! We welcome freelance trainers and physiotherapists to train their clients at Fisique. We offer trainer access passes that allow you to use our premium equipment and facilities while working with your own coach.",
  },
  {
    question: 'How does the BYOT (Bring Your Own Trainer) program work?',
    answer: 'Your trainer gets facility access to bring you in for sessions. You benefit from our premium equipment, boutique environment, and optional sauna access while continuing with your trusted coach.',
  },
  {
    question: 'What facilities are available for freelance training?',
    answer: 'Full access to our strength training equipment, free weights, cable machines, cardio equipment, and functional training areas. Sauna access can be added for recovery sessions.',
  },
  {
    question: 'What are the costs for trainer access passes?',
    answer: 'We offer flexible pricing for trainers—daily, weekly, and monthly passes. Contact us at +91-9515469444 for current rates and to discuss your training needs.',
  },
  {
    question: 'Why should I train at Fisique instead of at home or a park?',
    answer: "Our studio offers climate-controlled comfort, professional-grade equipment, a boutique non-crowded environment, and sauna for recovery—all things that aren't available for outdoor or home training.",
  },
];

export default function FreelanceTrainerKokapetContent() {
  return (
    <FreelanceTrainerTemplate
      sectionLabel="Freelance Trainer Access"
      badge="Bring Your Own Trainer (BYOT)"
      BadgeIcon={UserCheck}
      h1Line1="Freelance Trainer Access in"
      h1Highlight="Kokapet"
      description={
        <>
          Already have a personal trainer you love? Bring them to{' '}
          <a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a>!
          Our BYOT program gives freelance trainers and their clients access to
          premium equipment in a boutique, uncrowded environment. Prefer a structured program? See our{' '}
          <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">in-house personal training</a> options.
        </>
      }
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20freelance%20trainer%20access%20at%20Fisique"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      steps={[
        { num: '1', title: 'Trainer Registers', desc: 'Your personal trainer contacts us to get a facility access pass. We verify their credentials and set up their account.' },
        { num: '2', title: 'Book Your Sessions', desc: 'Schedule sessions with your trainer at times that work for you. Our flexible hours accommodate most schedules.' },
        { num: '3', title: 'Train in Premium Space', desc: 'Enjoy our boutique gym environment with professional equipment, climate control, and optional sauna recovery.' },
      ]}
      benefitsTitle="Why Train at Fisique with Your Own Trainer"
      benefitsBody={
        <>
          <p>Premium Equipment — Professional-grade strength and cardio equipment that your trainer can utilize for comprehensive programming.</p>
          <p>Boutique Environment — No crowds, no waiting for equipment. Train in a focused, distraction-free space.</p>
          <p>Sauna Access — Add sauna sessions for enhanced recovery—something you can't get training outdoors or at home.</p>
          <p>Climate Controlled — Air-conditioned comfort year-round. No weather-related cancellations or discomfort.</p>
        </>
      }
      features={[
        { Icon: Users, title: 'Your Trainer', desc: 'Keep working with the coach you trust and have built rapport with.' },
        { Icon: Dumbbell, title: 'Our Equipment', desc: 'Access to a full range of strength and cardio equipment.' },
        { Icon: Thermometer, title: 'Sauna Recovery', desc: 'Optional add-on for post-workout muscle recovery.' },
        { Icon: Clock, title: 'Flexible Hours', desc: '5:30 AM - 10 PM, Mon-Sat. Train when it suits you.' },
      ]}
      trainerSectionTitle="For Freelance Trainers & Physiotherapists"
      trainerSectionDesc="Looking for a professional space to train your clients in Kokapet?"
      trainerIncludes={[
        'Full equipment access during operating hours',
        'Bring multiple clients throughout the day',
        'Flexible daily, weekly, or monthly passes',
        'Sauna access options for client recovery',
        'Professional, boutique environment',
      ]}
      trainerWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20freelance%20trainer%20interested%20in%20facility%20access"
      trainerWhatsappLabel="Contact for Trainer Rates"
      faqs={freelanceKokapetFAQs}
      faqTitle="Freelance Trainer Access FAQs"
      faqSubtitle="Common questions about our BYOT program"
      currentPath="/freelance-trainer-kokapet"
      finalCtaTitle="Ready to Train with Your Coach at Fisique?"
      finalCtaDesc="Contact us to learn about trainer access passes and get started with premium gym access in Kokapet."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20interested%20in%20freelance%20trainer%20access"
      finalCtaWhatsappLabel="Enquire Now"
    />
  );
}
