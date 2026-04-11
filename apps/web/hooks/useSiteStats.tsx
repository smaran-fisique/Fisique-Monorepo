import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface SiteStats {
  reviewCount: string;
  avgRating: string;
}

const defaultStats: SiteStats = {
  reviewCount: '77',
  avgRating: '4.9',
};

export const useSiteStats = () => {
  const [stats, setStats] = useState<SiteStats>(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['review_count', 'avg_rating']);

      if (error) throw error;

      if (data) {
        const statsMap = data.reduce((acc, { key, value }) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, string>);

        setStats({
          reviewCount: statsMap['review_count'] || defaultStats.reviewCount,
          avgRating: statsMap['avg_rating'] || defaultStats.avgRating,
        });
      }
    } catch (error) {
      console.error('Error fetching site stats:', error);
      setStats(defaultStats);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, refetch: fetchStats };
};
