import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface GoogleReview {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  time: string;
  profile_photo_url: string | null;
  relative_time_description: string;
  fetched_at: string;
}

export const useGoogleReviews = () => {
  return useQuery({
    queryKey: ["google-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-google-reviews");

      if (error) {
        console.error("Error fetching reviews:", error);
        throw error;
      }

      const allReviews = data.reviews as GoogleReview[];
      
      // Return all reviews for the carousel to cycle through
      return allReviews;
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    refetchOnWindowFocus: false,
  });
};
