import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Trophy, Users, ArrowLeft, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const IPHONE_OFFER_ID = "bfe67087-50ed-4977-99be-f000628608ec"; // From network request

const useLeaderboard = () => {
  return useQuery({
    queryKey: ["iphone-leaderboard"],
    queryFn: async () => {
      // First try to get the iPhone offer by slug
      let offerId = IPHONE_OFFER_ID;

      const { data: offer } = await supabase.from("offers").select("id").eq("slug", "iphone").single();

      if (offer) {
        offerId = offer.id;
      }

      const { data, error } = await supabase
        .from("offer_entrants")
        .select("id, name, created_at")
        .eq("offer_id", offerId)
        .order("created_at", { ascending: true });

      if (error) throw error;
      return data || [];
    },
  });
};

const IPhoneLeaderboard = () => {
  const { data: entrants = [], isLoading } = useLeaderboard();
  const probability = entrants.length > 0 ? (100 / entrants.length).toFixed(1) : "0";

  return (
    <>
      <Helmet>
        <title>iPhone Draw Leaderboard | Fisique Fitness Kokapet</title>
        <meta
          name="description"
          content="See who's in the running to win an iPhone at Fisique Fitness Kokapet. Join our 3-month training program to enter the draw!"
        />
        <link rel="canonical" href="https://fisique.fitness/offers/iphone/leaderboard" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container-custom px-4">
          {/* Back Link */}
          <Link
            to="/offers/iphone"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Offer Details
          </Link>

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm mb-6">
              <Trophy className="w-4 h-4" />
              iPhone Draw
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Qualified Entrants</h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Everyone listed below has qualified for the iPhone draw by enrolling in our 3-month personal training
              program.
            </p>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-accent mb-2">
                <Users className="w-8 h-8" />
                {entrants.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Entrants</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent mb-2">{probability}%</div>
              <p className="text-sm text-muted-foreground">Win Probability Each</p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          )}

          {/* Leaderboard Table */}
          {!isLoading && entrants.length > 0 && (
            <div className="max-w-2xl mx-auto">
              <div className="premium-card rounded-2xl overflow-hidden">
                <div className="bg-accent/10 px-6 py-4 border-b border-border">
                  <div className="grid grid-cols-3 text-sm font-medium text-muted-foreground">
                    <span>#</span>
                    <span>Name</span>
                    <span className="text-right">Win Chance</span>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {entrants.map((entrant, index) => (
                    <div key={entrant.id} className="px-6 py-4 hover:bg-accent/5 transition-colors">
                      <div className="grid grid-cols-3 items-center">
                        <span className="text-lg font-semibold text-accent">{index + 1}</span>
                        <span className="font-medium text-foreground">{entrant.name}</span>
                        <span className="text-right text-accent font-semibold">{probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && entrants.length === 0 && (
            <div className="text-center py-16">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-foreground mb-2">No Entrants Yet</h2>
              <p className="text-muted-foreground mb-6">
                Be the first to join! Sign up for our 3-month personal training program.
              </p>
              <Button asChild>
                <Link to="/offers/iphone">Learn More & Enter</Link>
              </Button>
            </div>
          )}

          {/* CTA */}
          {!isLoading && entrants.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Want to join the draw? Sign up for 3 months of personal training!
              </p>
              <Button asChild size="lg">
                <Link to="/offers/iphone">Enter the Draw</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default IPhoneLeaderboard;
