'use client';

import { Dumbbell, Users, Thermometer, Clock, Car } from 'lucide-react';
import FreelanceTrainerTemplate from '@/components/templates/FreelanceTrainerTemplate';

const freelanceNarsingiFAQs = [
  {
    question: 'Where can freelance trainers in Narsingi train their clients?',
    answer: 'Fisique Fitness in Kokapet (just 3 mins from Narsingi) offers trainer access passes for freelance trainers and physiotherapists to bring their clients. Full equipment access in a boutique environment.',
  },
  {
    question: 'How far is Fisique from Narsingi for freelance training?',
    answer: "We're just 3-5 minutes from Narsingi via the main road to Kokapet. Located above Pulla Reddy Sweets in Avant Cedar—very convenient for Narsingi residents and trainers.",
  },
  {
    question: "What's included in the trainer access pass?",
    answer: 'Full access to strength equipment, free weights, cardio machines, and functional training areas. Sauna access for client recovery can be added. Flexible daily, weekly, or monthly passes available.',
  },
  {
    question: 'Can I train multiple clients at Fisique?',
    answer: "Yes! Trainer passes allow you to bring different clients throughout the day. It's a professional alternative to training clients at their homes or in parks.",
  },
  {
    question: 'Why choose Fisique over home or outdoor training?',
    answer: "Professional equipment your clients can't access at home, climate-controlled comfort, sauna for recovery, and a focused environment—all benefits that outdoor or home training can't match.",
  },
];

export default function FreelanceTrainerNarsingiContent() {
  return (
    <FreelanceTrainerTemplate
      sectionLabel="Freelance Trainer Access"
      badge="Just 3 mins from Narsingi"
      BadgeIcon={Car}
      h1Line1="Freelance Trainer Access Near"
      h1Highlight="Narsingi"
      description="Freelance trainers and physiotherapists serving Narsingi clients: upgrade from outdoor sessions to a professional gym environment at Fisique Fitness, just minutes away."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20trainer%20in%20Narsingi%20interested%20in%20facility%20access"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      steps={[
        { num: '1', title: 'Trainer Registers', desc: 'Your personal trainer contacts us to get a facility access pass. We verify their credentials and set up their account.' },
        { num: '2', title: 'Book Your Sessions', desc: 'Schedule sessions with your trainer at times that work for you. Our flexible hours accommodate most schedules.' },
        { num: '3', title: 'Train in Premium Space', desc: 'Enjoy our boutique gym environment with professional equipment, climate control, and optional sauna recovery.' },
      ]}
      benefitsTitle="Why Narsingi Trainers Choose Fisique"
      benefitsBody={
        <>
          <p>As a freelance trainer in Narsingi, you know the challenges: training clients outdoors means weather cancellations, limited equipment, and no recovery options like sauna.</p>
          <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> is just a 3-minute drive from Narsingi. Our trainer access program lets you bring your clients to a professional gym environment with everything you need for comprehensive training. Clients looking for in-house coaching can also explore our <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">personal training packages</a>.</p>
          <p>Many freelance trainers from Narsingi, Puppalaguda, and Neknampur now use Fisique as their primary training location. Their clients appreciate the upgrade in facilities and comfort.</p>
        </>
      }
      features={[
        { Icon: Dumbbell, title: 'Full Equipment', desc: 'Strength, cardio, and functional training equipment for any program.' },
        { Icon: Users, title: 'Multiple Clients', desc: 'Train different clients throughout the day with one pass.' },
        { Icon: Thermometer, title: 'Sauna Add-On', desc: 'Offer clients recovery sessions they can\'t get elsewhere.' },
        { Icon: Clock, title: 'Flexible Passes', desc: 'Daily, weekly, or monthly options to suit your schedule.' },
      ]}
      trainerSectionTitle="For Freelance Trainers & Physiotherapists"
      trainerSectionDesc="Looking for a professional space to train your Narsingi clients?"
      trainerIncludes={[
        'Full equipment access during operating hours',
        'Bring multiple clients throughout the day',
        'Flexible daily, weekly, or monthly passes',
        'Sauna access options for client recovery',
        'Professional, boutique environment',
      ]}
      trainerWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20freelance%20trainer%20near%20Narsingi%20interested%20in%20facility%20access"
      trainerWhatsappLabel="Get Trainer Access"
      faqs={freelanceNarsingiFAQs}
      faqTitle="Freelance Training Near Narsingi FAQs"
      faqSubtitle="Questions about trainer access for the Narsingi area"
      currentPath="/freelance-trainer-narsingi"
      finalCtaTitle="Upgrade Your Training Practice"
      finalCtaDesc="Freelance trainers in Narsingi: contact us for trainer access rates and start offering your clients a professional gym experience."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20freelance%20trainer%20near%20Narsingi%20interested%20in%20facility%20access"
      finalCtaWhatsappLabel="Get Trainer Access"
    />
  );
}
