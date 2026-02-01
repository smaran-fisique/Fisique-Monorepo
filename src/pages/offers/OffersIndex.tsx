import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Gift, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

// Get slug from database, fallback to generated one
const getOfferSlug = (offer: { slug?: string | null; title: string }) => {
  if (offer.slug) return offer.slug;
  if (offer.title.toLowerCase().includes('iphone')) return 'iphone';
  return offer.title.toLowerCase().replace(/\s+/g, '-').slice(0, 20);
};

const useOffers = () => {
  return useQuery({
    queryKey: ['offers-list'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('offers')
        .select('*')
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString())
        .gte('end_date', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

const OffersIndex = () => {
  const { data: offers = [], isLoading } = useOffers();

  return (
    <>
      <Helmet>
        <title>Special Offers | Fisique Fitness Kokapet</title>
        <meta
          name="description"
          content="Exclusive fitness offers at Fisique Fitness Kokapet. Win prizes, get discounts on personal training and gym memberships."
        />
        <link rel="canonical" href="https://fisique.fitness/offers" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom px-4">
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm mb-6">
              <Gift className="w-4 h-4" />
              Exclusive Offers
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Special Offers
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Take advantage of our limited-time promotions and exclusive deals for Fisique members.
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          )}

          {/* Offers Grid */}
          {!isLoading && offers.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {offers.map((offer) => {
                const isExternal = offer.cta_link.startsWith('http');
                const href = isExternal ? offer.cta_link : `/offers/${getOfferSlug(offer)}`;
                const CardContent = (
                  <>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Gift className="w-6 h-6 text-accent" />
                      </div>
                      <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                        Active
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {offer.title}
                    </h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {offer.description}
                    </p>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Ends: {format(new Date(offer.end_date), 'MMM d, yyyy')}
                      </span>
                      <span className="text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                        {offer.cta_text} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </>
                );

                return isExternal ? (
                  <a
                    key={offer.id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group premium-card rounded-2xl p-6 hover:border-accent/40 transition-all"
                  >
                    {CardContent}
                  </a>
                ) : (
                  <Link
                    key={offer.id}
                    to={href}
                    className="group premium-card rounded-2xl p-6 hover:border-accent/40 transition-all"
                  >
                    {CardContent}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Empty state for when no offers */}
          {!isLoading && offers.length === 0 && (
            <div className="text-center py-16">
              <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Active Offers</h2>
              <p className="text-muted-foreground">
                Check back soon for exclusive deals and promotions!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default OffersIndex;
