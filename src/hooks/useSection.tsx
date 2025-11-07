import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useSection = <T,>(sectionKey: string, defaultData: T) => {
  const [data, setData] = useState<T>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchSection();

    // Subscribe to realtime updates
    const channel = supabase
      .channel(`section_${sectionKey}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sections',
          filter: `section_key=eq.${sectionKey}`,
        },
        () => {
          fetchSection();
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [sectionKey]);

  const fetchSection = async () => {
    try {
      const { data: sectionData, error: fetchError } = await supabase
        .from('sections')
        .select('content')
        .eq('section_key', sectionKey)
        .single();

      if (fetchError) {
        // If no data found, use default (fallback to hardcoded)
        if (fetchError.code === 'PGRST116') {
          console.log(`Section '${sectionKey}' not found in database, using default data`);
          setData(defaultData);
        } else {
          throw fetchError;
        }
      } else if (sectionData?.content) {
        // Use database content if available
        setData(sectionData.content as T);
      } else {
        // Fallback to default
        setData(defaultData);
      }
    } catch (err) {
      console.error(`Error fetching section '${sectionKey}':`, err);
      setError(err as Error);
      // Always fallback to default data on error
      setData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
};
