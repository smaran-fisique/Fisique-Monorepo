import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteSettings {
  whatsapp_number: string;
  ga4_measurement_id: string;
  site_name: string;
  site_tagline: string;
}

export const useSiteSettings = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    whatsapp_number: '919515469444',
    ga4_measurement_id: '',
    site_name: 'Fisique Fitness',
    site_tagline: 'Transform Your Body, Transform Your Life',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();

    // Subscribe to changes
    const channel = supabase
      .channel('site_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'site_settings',
        },
        () => {
          fetchSettings();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) throw error;

      if (data) {
        const settingsObj = data.reduce((acc, { key, value }) => {
          acc[key as keyof SiteSettings] = value;
          return acc;
        }, {} as SiteSettings);

        setSettings(settingsObj);
      }
    } catch (error) {
      console.error('Error fetching site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  return { settings, loading };
};
