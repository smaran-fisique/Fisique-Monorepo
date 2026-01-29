import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export const GoogleAnalytics = () => {
  const { settings, loading } = useSiteSettings();

  useEffect(() => {
    if (loading || !settings.ga4_measurement_id) return;

    const measurementId = settings.ga4_measurement_id.trim();
    if (!measurementId || !measurementId.startsWith('G-')) return;

    // Check if already loaded
    if (document.querySelector(`script[src*="${measurementId}"]`)) return;

    // Load gtag.js script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      page_path: window.location.pathname,
    });

    console.info(`Google Analytics initialized: ${measurementId}`);
  }, [settings.ga4_measurement_id, loading]);

  return null;
};
