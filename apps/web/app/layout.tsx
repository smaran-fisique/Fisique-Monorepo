import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Providers } from '@/components/Providers';
import { GoogleAnalyticsLoader } from '@/components/GoogleAnalyticsLoader';
import { MicrosoftClarityLoader } from '@/components/MicrosoftClarityLoader';

export const runtime = 'edge';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '600', '700', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

const quantify = localFont({
  src: '../public/fonts/Quantify.ttf',
  display: 'swap',
  variable: '--font-quantify',
  weight: '400 900',
});

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
    <html lang="en" className={`${poppins.variable} ${quantify.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          as="image"
          href="/hero-gym-optimized.webp"
          fetchPriority="high"
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
