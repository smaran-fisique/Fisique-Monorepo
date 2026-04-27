import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/Providers';
import { GoogleAnalyticsLoader } from '@/components/GoogleAnalyticsLoader';
import { MicrosoftClarityLoader } from '@/components/MicrosoftClarityLoader';

export const runtime = 'edge';

export const metadata: Metadata = {
  title: {
    default: 'Fisique Fitness - Best Gym in Kokapet | Personal Training Hyderabad',
    template: '%s | Fisique Fitness',
  },
  description:
    'Premium personal training gym in Kokapet, Hyderabad offering one-on-one coaching, nutrition guidance, and sauna recovery. Transform your body with expert trainers.',
  keywords: [
    'gym kokapet',
    'personal training hyderabad',
    'fisique fitness',
    'best gym kokapet',
    'personal trainer kokapet',
    'fitness studio hyderabad',
    'sauna hyderabad',
  ],
  metadataBase: new URL('https://fisique.fitness'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://fisique.fitness',
    siteName: 'Fisique Fitness',
    title: 'Fisique Fitness - Best Gym in Kokapet | Personal Training Hyderabad',
    description:
      'Premium personal training gym in Kokapet, Hyderabad offering one-on-one coaching, nutrition guidance, and sauna recovery.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fisique Fitness - Best Gym in Kokapet',
    description: 'Premium personal training gym in Kokapet, Hyderabad.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <GoogleAnalyticsLoader />
          <MicrosoftClarityLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
