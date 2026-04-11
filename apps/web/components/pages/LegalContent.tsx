'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const sections = [
  { id: 'terms', label: 'Terms & Conditions' },
  { id: 'privacy', label: 'Privacy Policy' },
  { id: 'refund', label: 'Refund Policy' },
  { id: 'shipping', label: 'Shipping Policy' },
  { id: 'emi', label: 'EMI Terms' },
];

export default function LegalContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [searchParams]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-screen bg-background pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/20">
          <div className="container-custom px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Fisique Fitness – Legal &amp; Compliance
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All essential policies to protect your rights, ensure clarity, and deliver a premium experience.
            </p>

            {/* Quick Navigation */}
            <nav className="mt-8 flex flex-wrap justify-center gap-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="px-4 py-2 rounded-full bg-muted hover:bg-accent hover:text-accent-foreground transition-colors text-sm font-medium"
                >
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </section>

        <div className="container-custom px-4 md:px-6 py-12 max-w-4xl mx-auto">

          {/* Terms & Conditions */}
          <section id="terms" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 pb-3 border-b border-border">Terms &amp; Conditions</h2>
            <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>These Terms &amp; Conditions govern your use of Fisique Fitness' services including the gym, sauna, personal training, website, and mobile platforms. By engaging with our services, you agree to abide by the following:</p>
              <ul className="space-y-3 list-disc pl-6">
                <li><strong className="text-foreground">Membership Access:</strong> Provides unlimited access to gym and sauna during active hours.</li>
                <li><strong className="text-foreground">Training Plans:</strong> Choose from Transform (3 sessions/week), Transform+ (6 sessions/week), or Premier (for BMI &gt; 40 or medical supervision).</li>
                <li><strong className="text-foreground">Minimum Commitment:</strong> All packages require a 3-month minimum term. Pricing is inclusive of GST and onboarding services.</li>
                <li><strong className="text-foreground">EMI Authorization:</strong> By opting EMI, you authorize scheduled auto-debits in accordance with RBI regulations.</li>
                <li><strong className="text-foreground">Fair Use:</strong> We reserve the right to pause or cancel services for behavior disruptive to members, trainers, or operations.</li>
              </ul>
            </div>
          </section>

          {/* Privacy Policy */}
          <section id="privacy" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 pb-3 border-b border-border">Privacy Policy</h2>
            <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
              <p>Your privacy is important to us. This policy outlines how Fisique Fitness collects, uses, and protects your information when you interact with us online, at our facility, or through digital communication.</p>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">1. What We Collect</h3>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Personal info: name, contact details, DOB, emergency contact.</li>
                  <li>Fitness info: weight, goals, medical history, photos (if shared).</li>
                  <li>Billing data: Razorpay ID, payment mode, package details.</li>
                  <li>Device/browser data: collected only through app/website for analytics.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">2. How We Use It</h3>
                <ul className="space-y-2 list-disc pl-6">
                  <li>To personalize fitness and nutrition plans.</li>
                  <li>To deliver service updates via WhatsApp, email, or SMS.</li>
                  <li>To process payments and manage subscriptions.</li>
                  <li>To ensure safety, access control, and service enhancements.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">3. Data Protection</h3>
                <p>All data is securely stored using end-to-end encryption on trusted platforms. Only authorized staff can access sensitive information.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">4. Your Rights</h3>
                <p>You may request access, corrections, or deletion of your data by emailing{' '}
                  <a href="mailto:support@fisique.fitness" className="text-accent hover:underline">support@fisique.fitness</a>. Opt-outs are honored promptly.</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">5. Messaging Consent</h3>
                <p>You agree to receive communication regarding workouts, billing, or health support via WhatsApp and SMS. To unsubscribe, reply "STOP".</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">6. Data Retention</h3>
                <p>Data is retained for as long as needed by law or for tracking purposes.</p>
              </div>
            </div>
          </section>

          {/* Cancellation & Refund Policy */}
          <section id="refund" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 pb-3 border-b border-border">Cancellation &amp; Refund Policy</h2>
            <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
              <ul className="space-y-3 list-disc pl-6">
                <li><strong className="text-foreground">Strict No Refund:</strong> Once a membership or training plan begins, no refunds will be issued.</li>
                <li><strong className="text-foreground">Early Exit:</strong> If a 3-month package is terminated prematurely, full payment for the remaining term is due.</li>
                <li><strong className="text-foreground">Non-payment:</strong> Missed payments will result in temporary suspension until dues are cleared. Continuous default may lead to cancellation without refund.</li>
              </ul>
            </div>
          </section>

          {/* Shipping & Exchange Policy */}
          <section id="shipping" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 pb-3 border-b border-border">Shipping &amp; Exchange Policy</h2>
            <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>Fisique Fitness offers physical access-based and digital services only. No physical goods are shipped.</p>
              <ul className="space-y-3 list-disc pl-6">
                <li>PT plans and memberships are non-transferable.</li>
                <li>Any add-ons (e.g. diet plans, sauna usage) are strictly member-bound.</li>
              </ul>
            </div>
          </section>

          {/* No-Cost EMI */}
          <section id="emi" className="scroll-mt-24 mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 pb-3 border-b border-border">No-Cost EMI Available</h2>
            <div className="prose prose-invert max-w-none space-y-4 text-muted-foreground">
              <p>We make fitness accessible with zero-cost EMIs on major credit cards.</p>
              <ul className="space-y-3 list-disc pl-6">
                <li>Available tenures: 3 &amp; 6 months</li>
                <li>No interest or hidden charges — we absorb the cost</li>
                <li>Auto-debit setup required for recurring payments</li>
              </ul>
              <p className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                <strong className="text-foreground">Disclaimer:</strong> EMI approval is subject to your bank's eligibility criteria. If you cancel early, any remaining dues must be cleared immediately as per RBI norms.
              </p>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-16 p-8 bg-muted/30 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">Contact Us</h2>
            <p className="text-muted-foreground mb-6">
              <strong className="text-foreground">Fisique Fitness (Surya Narayana Enterprises LLP)</strong>
            </p>
            <div className="space-y-4">
              <a href="https://maps.app.goo.gl/GoiqDpnditiJBRmJ9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                <MapPin className="w-5 h-5" />4th Floor, Above Pulla reddy Sweets, Avant Cedar, Kokapet, Hyderabad
              </a>
              <a href="mailto:hello@fisique.fitness" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />hello@fisique.fitness
              </a>
              <a href="tel:+917671959610" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                <Phone className="w-5 h-5" />+91-7671959610
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
