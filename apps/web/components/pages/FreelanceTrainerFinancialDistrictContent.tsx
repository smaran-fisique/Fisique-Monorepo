'use client';

import { Dumbbell, Users, Thermometer, Clock, Building2 } from 'lucide-react';
import FreelanceTrainerTemplate from '@/components/templates/FreelanceTrainerTemplate';

const freelanceFDFAQs = [
  {
    question: 'Where can freelance trainers near Financial District train clients?',
    answer: 'Fisique Fitness in Kokapet (5 mins from FD) offers trainer access passes. Bring your IT professional clients to a premium gym with professional equipment, AC, and sauna—a major upgrade from outdoor or building gym training.',
  },
  {
    question: 'What are the timings for trainer access?',
    answer: "We're open 5:30 AM to 10 PM, Monday to Saturday. Perfect for training FD professionals before or after work hours.",
  },
  {
    question: 'How does this benefit my IT professional clients?',
    answer: "Your clients get professional equipment, climate control (important for Hyderabad weather), and sauna for stress relief—things not available in apartment gyms or outdoor training. It helps you deliver better results.",
  },
  {
    question: "What's the cost for trainer access?",
    answer: 'We offer flexible daily, weekly, and monthly passes for trainers. Contact us at +91-9515469444 for current rates and to discuss your needs.',
  },
  {
    question: 'Can I train corporate groups at Fisique?',
    answer: 'Yes! We accommodate trainers running small group sessions for corporate clients. Our boutique environment ensures privacy and focus. Contact us for group training arrangements.',
  },
];

export default function FreelanceTrainerFinancialDistrictContent() {
  return (
    <FreelanceTrainerTemplate
      sectionLabel="Freelance Trainer Access"
      badge="5 mins from Financial District"
      BadgeIcon={Building2}
      h1Line1="Freelance Trainer Access Near"
      h1Highlight="Financial District"
      description="Train your IT professional clients in a premium environment. Fisique Fitness offers trainer access passes with professional equipment, AC, and sauna—just 5 minutes from Financial District."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20trainer%20serving%20Financial%20District%20clients%20and%20interested%20in%20facility%20access"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      steps={[
        { num: '1', title: 'Trainer Registers', desc: 'Your personal trainer contacts us to get a facility access pass. We verify their credentials and set up their account.' },
        { num: '2', title: 'Book Your Sessions', desc: 'Schedule sessions with your trainer at times that work for you. Our flexible hours accommodate most schedules.' },
        { num: '3', title: 'Train in Premium Space', desc: 'Enjoy our boutique gym environment with professional equipment, climate control, and optional sauna recovery.' },
      ]}
      benefitsTitle="Perfect for Training IT Professionals"
      benefitsBody={
        <>
          <p>IT professionals in Financial District have demanding schedules and high stress. They need efficient workouts in a comfortable environment—not outdoor training in Hyderabad's heat or cramped apartment gyms.</p>
          <p><a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness</a> gives you the facilities to deliver professional training. Our premium equipment, climate control, and sauna allow you to offer comprehensive programs that get real results. Your clients can also enquire directly about our <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">in-house personal training</a> for a fully managed experience.</p>
          <p>Many trainers serving FD clients have made Fisique their home base. The 5-minute commute from major tech parks makes it convenient for both early morning and evening sessions.</p>
        </>
      }
      features={[
        { Icon: Dumbbell, title: 'Premium Equipment', desc: 'Professional gear for strength, cardio, and functional training.' },
        { Icon: Thermometer, title: 'Stress-Relief Sauna', desc: 'Perfect for high-stress IT clients needing recovery.' },
        { Icon: Users, title: 'Small Groups OK', desc: 'Can accommodate small corporate group sessions.' },
        { Icon: Clock, title: 'IT-Friendly Hours', desc: 'Open 5:30 AM - 10 PM to fit any work schedule.' },
      ]}
      trainerSectionTitle="For Freelance Trainers & Physiotherapists"
      trainerSectionDesc="Looking for a professional space to train your Financial District clients?"
      trainerIncludes={[
        'Full equipment access during operating hours',
        'Bring multiple clients throughout the day',
        'Flexible daily, weekly, or monthly passes',
        'Sauna access options for client recovery',
        'Professional, boutique environment',
      ]}
      trainerWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20trainer%20serving%20FD%20clients%20and%20interested%20in%20facility%20access"
      trainerWhatsappLabel="Get Trainer Access"
      faqs={freelanceFDFAQs}
      faqTitle="Freelance Training Near Financial District FAQs"
      faqSubtitle="Questions about trainer access for FD professionals"
      currentPath="/freelance-trainer-financial-district"
      finalCtaTitle="Elevate Your Training Business"
      finalCtaDesc="Trainers serving Financial District: upgrade your clients' experience with professional facilities. Contact us for trainer access rates."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%27m%20a%20trainer%20serving%20FD%20clients%20and%20interested%20in%20facility%20access"
      finalCtaWhatsappLabel="Get Trainer Access"
    />
  );
}
