'use client';

import { Header } from '@/components/Header';

export default function IPhoneOfferContent() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background pt-16">
        <iframe
          src="https://drawfis.lovable.app"
          className="w-full border-none"
          style={{ height: 'calc(100vh - 64px)' }}
          title="iPhone Offer"
        />
      </main>
    </>
  );
}
