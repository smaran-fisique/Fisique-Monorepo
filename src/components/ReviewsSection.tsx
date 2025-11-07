import { Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { Skeleton } from "@/components/ui/skeleton";

export const ReviewsSection = () => {
  const { data: reviews, isLoading, error } = useGoogleReviews();

  return (
    <section className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-end justify-between gap-5 mb-7">
          <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold tracking-tight">
            What Clients Say
          </h2>
          <p className="text-muted-foreground max-w-[60ch] md:text-right">
            Minimal, honest reviews pulled from client feedback. Full list available on Google.
          </p>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[160px] rounded-[16px]" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Unable to load reviews at the moment.
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${import.meta.env.VITE_GOOGLE_PLACE_ID || ''}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View reviews on Google →
            </a>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {reviews?.map((review) => (
              <article
                key={review.id}
                className="border border-border rounded-[16px] p-4.5 bg-[hsl(220_23%_8%)]"
              >
                <div className="flex items-center gap-2.5 mb-1.5">
                  {review.profile_photo_url ? (
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-b from-[hsl(220_23%_12%)] to-[hsl(220_28%_10%)] border border-border" />
                  )}
                  <div className="flex-1 min-w-0">
                    <strong className="text-sm block truncate">{review.author_name}</strong>
                    <span className="text-xs text-muted-foreground">{review.relative_time_description}</span>
                  </div>
                </div>
                
                <div className="flex gap-0.5 mb-2 text-[#ffd166]">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : 'fill-none stroke-current opacity-30'}`}
                    />
                  ))}
                </div>
                
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {review.text}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
