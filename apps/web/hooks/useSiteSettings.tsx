import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';

interface SiteSettings {
  whatsapp_number: string;
  ga4_measurement_id: string;
  site_name: string;
  site_tagline: string;
}

const DEFAULTS: SiteSettings = {
  whatsapp_number: '919515469444',
  ga4_measurement_id: '',
  site_name: 'Fisique Fitness',
  site_tagline: 'Transform Your Body, Transform Your Life',
};

const QUERY = `*[_type == "siteSettings" && _id == "siteSettings"][0]{
  "whatsapp_number": contact.whatsappNumber,
  "ga4_measurement_id": analytics.ga4MeasurementId,
  "site_name": branding.siteName,
  "site_tagline": branding.tagline
}`;

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sanityClient.fetch<Partial<SiteSettings>>(QUERY)
      .then((data) => {
        if (data) {
          setSettings({ ...DEFAULTS, ...Object.fromEntries(Object.entries(data).filter(([, v]) => v != null)) });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { settings, loading };
};
