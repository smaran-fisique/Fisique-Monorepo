import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, Gift } from "lucide-react";

const offers = [
  {
    slug: "iphone",
    title: "Win an iPhone 16",
    description: "Train with us for 3 months and get a chance to win the latest iPhone 16. Limited time offer!",
    endDate: "Feb 28, 2026",
    badge: "Active",
  },
];

const OffersIndex = () => {
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

          {/* Offers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {offers.map((offer) => (
              <Link
                key={offer.slug}
                to={`/offers/${offer.slug}`}
                className="group premium-card rounded-2xl p-6 hover:border-accent/40 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Gift className="w-6 h-6 text-accent" />
                  </div>
                  <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full">
                    {offer.badge}
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {offer.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {offer.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Ends: {offer.endDate}</span>
                  <span className="text-accent flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Offer <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty state for when no offers */}
          {offers.length === 0 && (
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
