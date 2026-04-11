'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function RefundContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background py-20">
        <div className="container-custom max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Cancellation &amp; Refund Policy</h1>

          <div className="prose prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Session Cancellation</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>24-Hour Notice:</strong> Sessions cancelled with at least 24 hours' notice can be rescheduled without penalty.</li>
                <li><strong>Late Cancellation:</strong> Sessions cancelled with less than 24 hours' notice may be forfeited.</li>
                <li><strong>No-Show:</strong> Failure to attend a scheduled session without notice will result in the session being charged/forfeited.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Membership Cancellation</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Monthly Memberships:</strong> Can be cancelled with 30 days' written notice. No refund will be provided for the current billing cycle.</li>
                <li><strong>Quarterly/Annual Plans:</strong> Non-refundable once purchased, but can be paused for medical emergencies with doctor's note (up to 2 months).</li>
                <li><strong>Package Plans:</strong> Unused sessions may be eligible for partial refund based on our discretion and circumstances.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Refund Eligibility</h2>
              <p className="text-muted-foreground mb-3">Refunds may be considered in the following cases:</p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li><strong>Medical Emergency:</strong> Verified by a medical certificate showing inability to continue training.</li>
                <li><strong>Relocation:</strong> Proof of permanent relocation more than 50 km from our facility.</li>
                <li><strong>Service Issues:</strong> Documented service quality concerns that couldn't be resolved.</li>
              </ul>
              <p className="text-muted-foreground mt-3">
                Refund requests must be submitted in writing to{' '}
                <a href="mailto:hello@fisique.fitness" className="text-accent hover:underline">hello@fisique.fitness</a>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Refund Process</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>All refund requests will be reviewed within 7-10 business days.</li>
                <li>Approved refunds will be processed within 14-21 business days.</li>
                <li>Refunds will be credited to the original payment method.</li>
                <li>Processing fees and administrative charges may be deducted from refunds.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Non-Refundable Items</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>Registration/enrollment fees</li>
                <li>Consultation fees</li>
                <li>Custom nutrition plans (once delivered)</li>
                <li>Merchandise and supplements</li>
                <li>Promotional or discounted packages</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Facility Closure</h2>
              <p className="text-muted-foreground mb-3">
                In the event of temporary facility closure due to unforeseen circumstances (natural disasters, government orders, etc.), memberships will be extended by the duration of closure. No refunds will be provided unless closure exceeds 30 consecutive days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">
                For cancellation or refund inquiries, please contact us at{' '}
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
