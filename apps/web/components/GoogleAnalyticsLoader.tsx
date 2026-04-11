'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const GoogleAnalyticsLoader = () => {
  const [measurementId, setMeasurementId] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'ga4_measurement_id')
      .maybeSingle()
      .then(({ data }) => {
        const id = data?.value?.trim();
        if (id?.startsWith('G-')) setMeasurementId(id);
      });
  }, []);

  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
};
