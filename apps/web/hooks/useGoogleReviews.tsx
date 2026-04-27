import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GoogleReview {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string | null;
  relative_time_description: string;
}

export const useGoogleReviews = () => {
  return useQuery({
    queryKey: ['google-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('google_reviews')
        .select('id, author_name, rating, text, profile_photo_url, relative_time_description, time')
        .order('time', { ascending: false });

      if (error) throw error;

      return (data ?? [])
        .filter((r) => (r.text ?? '').trim().length > 0)
        .map((r) => ({
          id: r.id,
          author_name: r.author_name,
          rating: r.rating,
          text: r.text,
          profile_photo_url: r.profile_photo_url,
          relative_time_description: r.relative_time_description ?? '',
        })) satisfies GoogleReview[];
    },
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  });
};
