import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

const defaultSEO: SEOData = {
  title: 'Fisique Fitness - Premium Personal Training Gym in Kokapet, Hyderabad',
  description: 'Premium personal training gym in Kokapet, Hyderabad offering one-on-one coaching, nutrition guidance, and sauna recovery. Start your transformation journey today.',
  keywords: 'fitness, gym, personal training, kokapet, hyderabad, workout, health, wellness, sauna',
};

export const useSEO = (pagePath: string) => {
  const [seo, setSeo] = useState<SEOData>(defaultSEO);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSEO();
  }, [pagePath]);

  const fetchSEO = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_meta')
        .select('title, description, keywords, og_image, canonical_url')
        .eq('page_path', pagePath)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No SEO data found, use defaults
          setSeo(defaultSEO);
        } else {
          throw error;
        }
      } else if (data) {
        setSeo({
          title: data.title,
          description: data.description,
          keywords: data.keywords || undefined,
          ogImage: data.og_image || undefined,
          canonicalUrl: data.canonical_url || undefined,
        });
      }
    } catch (err) {
      console.error('Error fetching SEO data:', err);
      setSeo(defaultSEO);
    } finally {
      setLoading(false);
    }
  };

  return { seo, loading };
};
