import { Star } from "lucide-react";
import { useGoogleReviews } from "@/hooks/useGoogleReviews";
import { Skeleton } from "@/components/ui/skeleton";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
export const ReviewsSection = () => {
  const {
    data: reviews,
    isLoading,
    error
  } = useGoogleReviews();
  const plugin = useRef(Autoplay({
    delay: 5000,
    stopOnInteraction: true
  }));
  return <section className="py-20 border-t border-border">
      <div className="container-custom">
        <div className="mb-7">
          <h2 className="font-bold tracking-tight mb-3 text-5xl text-cyan-500">
            What Clients Say
          </h2>
          <p className="text-muted-foreground w-full max-w-none">
            Minimal, honest reviews pulled from client feedback. Full list available on Google.
          </p>
        </div>

        {isLoading ? <div className="grid md:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-[160px] rounded-[16px]" />)}
          </div> : error ? <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Unable to load reviews at the moment.
            </p>
            <a href={`https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${import.meta.env.VITE_GOOGLE_PLACE_ID || ''}`} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              View reviews on Google →
            </a>
          </div> : <Carousel opts={{
        align: "start",
        loop: true
      }} plugins={[plugin.current]} className="w-full" onMouseEnter={plugin.current.stop} onMouseLeave={plugin.current.reset}>
            <CarouselContent>
              {reviews?.map(review => <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3">
                  <article className="group relative h-full rounded-2xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-border/50 p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 hover:-translate-y-1">
                    {/* Rating stars - prominent at top */}
                    <div className="flex gap-1 mb-4 text-[#ffd166]">
                      {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 transition-transform group-hover:scale-110 ${i < review.rating ? 'fill-current' : 'fill-none stroke-current opacity-20'}`} style={{
                  transitionDelay: `${i * 50}ms`
                }} />)}
                    </div>

                    {/* Review text - larger and more prominent */}
                    <blockquote className="mb-6">
                      <p className="text-base leading-relaxed line-clamp-5 text-cyan-500">
                        "{review.text}"
                      </p>
                    </blockquote>
                    
                    {/* Author info - footer style */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                      {review.profile_photo_url ? <img src={review.profile_photo_url} alt={review.author_name} className="w-11 h-11 rounded-full object-cover ring-2 ring-border/50" /> : <div className="w-11 h-11 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {review.author_name.charAt(0)}
                          </span>
                        </div>}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm text-foreground truncate">
                          {review.author_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {review.relative_time_description}
                        </p>
                      </div>
                      {/* Google badge */}
                      <div className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all" />
            <CarouselNext className="hidden md:flex -right-12 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card hover:border-primary/50 transition-all" />
          </Carousel>}
      </div>
    </section>;
};