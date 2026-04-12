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
      const { data, error } = await supabase
        .schema('fisique_web' as any)
        .from("google_reviews")
        .select("*")
        .order("time", { ascending: false });

      if (error) {
        console.error("Error fetching reviews:", error);
        throw error;
      }

      return (data as GoogleReview[]).filter(
        review => review.text.trim().length > 0
      );
    },
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    refetchOnWindowFocus: false,
  });
};
