'use client';

import GymLocationTemplate from '@/components/templates/GymLocationTemplate';
import { Car, Users, Clock, Thermometer, Dumbbell } from 'lucide-react';

const faqs = [
  { question: 'How far is Fisique Fitness from Financial District?', answer: 'Fisique Fitness is just 5 minutes (2.5 km) from Financial District. We\'re located in Kokapet, above Pulla Reddy Sweets in Avant Cedar—an easy commute before or after work.' },
  { question: 'What are the gym timings for IT professionals?', answer: 'We\'re open from 5:30 AM to 10 PM, Monday to Saturday. Many Financial District professionals prefer early morning (5:30-8 AM) or evening (6-9 PM) slots that fit their work schedules.' },
  { question: 'Do you offer corporate wellness programs for Financial District companies?', answer: 'Yes! We offer special corporate rates and group wellness programs for companies in Financial District. Contact us to discuss customized packages for your organization.' },
  { question: 'Is parking available near the gym?', answer: 'Yes, Avant Cedar has ample parking space. The building is easily accessible with dedicated parking for gym members.' },
  { question: 'What makes Fisique different from gyms in Financial District?', answer: 'Unlike crowded commercial gyms, we\'re a boutique personal training studio with limited membership. You get 1:1 attention, certified coaches, private sauna, and no waiting for equipment—perfect for time-conscious professionals.' },
];

export default function GymFinancialDistrictContent() {
  return (
    <GymLocationTemplate
      sectionLabel="Gym · Financial District"
      badge="Just 5 mins from Financial District"
      BadgeIcon={Car}
      h1Line1="Premium Gym Near"
      h1Highlight="Financial District"
      description="The perfect gym for IT professionals. Skip the crowded commercial gyms and experience 1:1 personal training, private sauna recovery, and flexible hours designed for your busy schedule."
      whatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Financial%20District%20and%20I%27m%20interested%20in%20a%20free%20trial"
      directionsHref="https://maps.app.goo.gl/D1nMv22YD3yVSqUQ9"
      directionsLabel="Get Directions from FD"
      whyTitle="Why Financial District Professionals Choose Fisique"
      whyBody={
        <>
          <p>Working in Financial District means long hours, high stress, and little time for fitness. Commercial gyms are crowded during your only free hours, and finding consistent motivation is challenging.</p>
          <p>That's why we built <a href="/kokapet-gym" className="text-primary underline underline-offset-2 hover:text-primary/80">Fisique Fitness in Kokapet</a>—just a 5-minute drive from your office. Our boutique studio offers what big gyms can't: <a href="/personal-training-kokapet" className="text-primary underline underline-offset-2 hover:text-primary/80">1:1 personal training</a>, no waiting for equipment, and trainers who understand the demands of corporate life.</p>
          <p>Many of our members are IT professionals, managers, and entrepreneurs from Financial District who've tried everything. They stay because our personalized approach delivers results they couldn't achieve elsewhere.</p>
        </>
      }
      whyExtra={
        <div className="tile p-4 mt-2">
          <h3 className="font-mono-display text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-2 border-b hairline pb-2 mb-3"><Car className="h-3.5 w-3.5 text-accent" />Quick Commute from Financial District</h3>
          <ul className="space-y-1.5 text-[13px] text-muted-foreground">
            <li>• <strong>From Raheja Mindspace:</strong> 5 mins via Kokapet Main Road</li>
            <li>• <strong>From Salarpuria Sattva:</strong> 6 mins via Narsingi Road</li>
            <li>• <strong>From Phoenix Arena:</strong> 4 mins direct route</li>
            <li>• <strong>From Laxmi Cyber City:</strong> 7 mins via Kokapet Junction</li>
          </ul>
        </div>
      }
      features={[
        { Icon: Users, title: '1:1 Personal Training', desc: 'No group classes, no distractions. Just you and your certified coach.' },
        { Icon: Clock, title: 'IT-Friendly Hours', desc: 'Mon-Sat 5:30 AM - 10 PM. Sundays 7 AM - 12 PM (self-train only).' },
        { Icon: Thermometer, title: 'Stress Relief Sauna', desc: 'Decompress after a stressful day with our on-site sauna facility.' },
        { Icon: Dumbbell, title: 'No Waiting', desc: 'Limited membership means equipment is always available when you need it.' },
      ]}
      services={{
        title: 'Services for Busy Professionals',
        items: [
          { Icon: Users, title: 'Personal Training', desc: 'Our 90-day transformation programs are designed for professionals who need structured, efficient workouts that deliver visible results.', href: '/personal-training-kokapet', price: 'From ₹15,000–22,000/month' },
          { Icon: Dumbbell, title: 'Gym Membership', desc: 'Premium equipment access in a boutique environment. No crowds, no waiting—just focused workouts when you need them.', href: '/gym-membership-kokapet', price: 'From ₹5,000/month' },
          { Icon: Thermometer, title: 'Corporate Wellness', desc: 'Special rates for Financial District companies. Group wellness programs, team building sessions, and corporate discounts available.', price: 'Contact for pricing' },
        ],
      }}
      faqs={faqs}
      faqTitle="Questions from Financial District Professionals"
      faqSubtitle="Common questions about our gym and services"
      currentPath="/gym-financial-district"
      finalCtaTitle="Ready to Transform Your Fitness Routine?"
      finalCtaDesc="Join other Financial District professionals who've made Fisique Fitness their go-to gym. Book a free trial and experience the difference."
      finalCtaWhatsappHref="https://wa.me/919515469444?text=Hi%2C%20I%20work%20in%20Financial%20District%20and%20want%20to%20book%20a%20free%20trial"
      finalCtaWhatsappLabel="Book Free Trial"
    />
  );
}
