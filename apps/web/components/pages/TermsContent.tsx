'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Terms &amp; Conditions</h1>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">
              These Terms and Conditions govern your use of Fisique Fitness' services including personal training, nutrition counseling, and sauna access.
            </p>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Service Agreement</h2>
              <p className="text-muted-foreground mb-3">
                By purchasing or using any of Fisique Fitness' services, you agree to these Terms and Conditions. These terms apply to all fitness services, including personal training, group sessions, nutrition counseling, and facility access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Membership &amp; Access</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Memberships are non-transferable and restricted to the named purchaser.</li>
                <li>Valid government-issued ID may be required for access to gym and sauna facilities.</li>
                <li>Members must follow all gym rules and safety guidelines.</li>
                <li>Fisique Fitness reserves the right to deny facility access for rule violations or inappropriate conduct.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Health &amp; Safety</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Members must disclose any medical conditions or injuries before beginning training.</li>
                <li>Fisique Fitness is not liable for injuries resulting from undisclosed health conditions or failure to follow trainer instructions.</li>
                <li>All equipment must be used properly and safely.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Payment &amp; Billing</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All fees are payable in advance unless otherwise agreed.</li>
                <li>Payments can be made via bank transfer, UPI, or card.</li>
                <li>Late payments may result in suspension of services.</li>
                <li>All prices are subject to change with 30 days' notice.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Cancellation &amp; Refunds</h2>
              <p className="text-muted-foreground mb-3">
                Please refer to our Cancellation &amp; Refund Policy for detailed information about cancellations, reschedules, and refunds.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-3">
                Fisique Fitness, its trainers, and staff are not liable for any injuries, losses, or damages arising from use of services or facilities. Members use all services at their own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Privacy</h2>
              <p className="text-muted-foreground mb-3">
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Modifications</h2>
              <p className="text-muted-foreground mb-3">
                Fisique Fitness reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of services constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Governing Law</h2>
              <p className="text-muted-foreground mb-3">
                These Terms and Conditions are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">
                For questions about these Terms and Conditions, please contact us at{' '}
                <a href="mailto:hello@fisique.fitness" className="text-accent hover:underline">hello@fisique.fitness</a>{' '}
                or call{' '}
                <a href="tel:+917671959610" className="text-accent hover:underline">+91 7671959610</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
