import { Helmet } from "react-helmet-async";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export const FAQSchema = ({ faqs }: FAQSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

// Default FAQs for Fisique Fitness
export const defaultFAQs: FAQItem[] = [
  {
    question: "What makes Fisique different from other gyms in Kokapet?",
    answer: "Fisique Fitness offers premium 1-on-1 personal training with certified coaches, an on-site sauna for recovery, customized nutrition plans, and a boutique atmosphere with limited membership for personalized attention. Located above Pulla Reddy Sweets in Avant Cedar, we're Kokapet's only truly holistic fitness studio.",
  },
  {
    question: "Do you offer personal training in Kokapet?",
    answer: "Yes! Personal training is our specialty. Our certified trainers create customized 90-day transformation programs that include strength training, mobility work, nutrition guidance, and sauna recovery sessions. Each session is tailored to your fitness goals.",
  },
  {
    question: "What are your gym membership options?",
    answer: "We offer flexible membership plans: 1-month, 3-month, 6-month, and 12-month options. All memberships include access to premium equipment and facilities. Personal training packages and sauna access can be added to any membership.",
  },
  {
    question: "Does Fisique Fitness have a sauna?",
    answer: "Yes! We have an on-site sauna exclusively for our members. Sauna therapy aids muscle recovery, reduces stress, improves circulation, and enhances overall wellness. It's included with personal training packages or available as an add-on.",
  },
  {
    question: "Where is Fisique Fitness located in Kokapet?",
    answer: "We're located at 4th Floor, Above Pulla Reddy Sweets, Avant Cedar, Kokapet, Hyderabad. We're easily accessible from Financial District, Narsingi, and Gandipet areas with ample parking available.",
  },
  {
    question: "Can I bring my own personal trainer to Fisique?",
    answer: "Yes, freelance trainers and physiotherapists are welcome to train their clients at Fisique. We offer trainer access passes. Contact us on WhatsApp at +91-9515847444 for trainer access options and pricing.",
  },
  {
    question: "Do you offer nutrition counseling?",
    answer: "Absolutely! All our personal training packages include personalized diet counseling. Our trainers work with you to create sustainable nutrition plans that complement your training goals, whether it's fat loss, muscle gain, or improved energy.",
  },
  {
    question: "What are your operating hours?",
    answer: "Fisique Fitness is open Monday to Saturday from 5:30 AM to 10:00 PM. We offer flexible scheduling for personal training sessions to accommodate busy professionals' schedules.",
  },
];

// PT-specific FAQs
export const personalTrainingFAQs: FAQItem[] = [
  {
    question: "What's included in personal training at Fisique Kokapet?",
    answer: "Our personal training packages include: 1-on-1 sessions with certified trainers, customized workout programs, nutrition guidance and meal planning, progress tracking, sauna recovery sessions, and access to premium equipment. We focus on strength training, mobility, and sustainable results.",
  },
  {
    question: "How long does a typical transformation take?",
    answer: "Our signature 90-day transformation program is designed for visible, sustainable results. Most clients see significant changes in body composition, strength, and energy levels within the first month, with transformative results by day 90.",
  },
  {
    question: "What qualifications do your trainers have?",
    answer: "All Fisique trainers are certified professionals with expertise in strength training, nutrition, and injury prevention. They specialize in working with busy professionals and understand the unique challenges of balancing fitness with demanding careers.",
  },
  {
    question: "Can I try a session before committing?",
    answer: "Yes! We offer a free consultation and trial session so you can experience our training approach firsthand. Contact us at +91-9515847444 to book your complimentary session.",
  },
  {
    question: "Do you provide diet plans with personal training?",
    answer: "Yes, all personal training packages include personalized nutrition guidance. We create practical, sustainable meal plans that fit your lifestyle, preferences, and fitness goals—no extreme dieting required.",
  },
];

// Membership-specific FAQs
export const membershipFAQs: FAQItem[] = [
  {
    question: "What gym membership plans do you offer in Kokapet?",
    answer: "We offer flexible plans: 1-month (₹X), 3-month, 6-month, and 12-month memberships. Longer commitments come with better rates. All plans include full access to our premium equipment and facilities.",
  },
  {
    question: "Is there a joining fee?",
    answer: "We keep things simple with transparent pricing. Contact us for current membership rates and any ongoing offers. We frequently run promotions for new members.",
  },
  {
    question: "Can I upgrade my membership to include personal training?",
    answer: "Absolutely! You can add personal training sessions to any membership at any time. Many members start with gym-only access and upgrade to PT packages once they experience our facilities.",
  },
  {
    question: "What equipment does Fisique have?",
    answer: "Our studio features premium strength training equipment, free weights, cable machines, cardio equipment, and functional training areas. Our equipment is regularly maintained and replaced to ensure the best training experience.",
  },
  {
    question: "Is Fisique crowded like other gyms?",
    answer: "No! We maintain limited membership to ensure a boutique, uncrowded experience. You'll never have to wait for equipment or feel rushed during your workout.",
  },
];
