import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";

const IPhoneOffer = () => {
  return (
    <>
      <Helmet>
        <title>Win iPhone 16 | 3 Month Training Offer | Fisique Fitness Kokapet</title>
        <meta
          name="description"
          content="Join Fisique Fitness Kokapet for 3 months of personal training and get a chance to win an iPhone 16. Limited spots available. Offer ends Feb 28, 2026."
        />
        <link rel="canonical" href="https://fisique.fitness/offers/iphone" />
        <meta property="og:title" content="Win iPhone 16 | Fisique Fitness Kokapet" />
        <meta property="og:description" content="Train for 3 months and win an iPhone 16!" />
        <meta property="og:url" content="https://fisique.fitness/offers/iphone" />
        <meta property="og:type" content="website" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-16">
        <iframe 
          src="https://drawfis.lovable.app" 
          className="w-full border-none"
          style={{ height: 'calc(100vh - 64px)' }}
          title="iPhone Offer"
        />
      </main>
    </>
  );
};

export default IPhoneOffer;
