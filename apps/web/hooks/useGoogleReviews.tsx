import { useQuery } from "@tanstack/react-query";
import { sanityClient, urlFor } from "@/lib/sanity";

export interface GoogleReview {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url: string | null;
  relative_time_description: string;
}

const QUERY = `*[_type == "testimonial"] | order(order asc, _createdAt desc) {
  _id,
  "author_name": memberName,
  rating,
  "text": quote,
  afterPhoto,
  "relative_time_description": duration
}`;

export const useGoogleReviews = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const data = await sanityClient.fetch<Array<{
        _id: string;
        author_name: string;
        rating: number;
        text: string;
        afterPhoto: unknown | null;
        relative_time_description: string | null;
      }>>(QUERY);

      return data
        .filter((r) => r.text?.trim().length > 0)
        .map((r) => ({
          id: r._id,
          author_name: r.author_name,
          rating: r.rating,
          text: r.text,
          profile_photo_url: r.afterPhoto
            ? urlFor(r.afterPhoto as Parameters<typeof urlFor>[0]).width(100).height(100).url()
            : null,
          relative_time_description: r.relative_time_description ?? '',
        })) satisfies GoogleReview[];
    },
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnWindowFocus: false,
  });
};
