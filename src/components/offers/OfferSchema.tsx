import { Helmet } from "react-helmet-async";

interface OfferSchemaProps {
  name: string;
  description: string;
  url: string;
  validFrom: string;
  validThrough: string;
  eligibleRegion?: string;
}

export const OfferSchema = ({
  name,
  description,
  url,
  validFrom,
  validThrough,
  eligibleRegion = "IN",
}: OfferSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    description,
    url,
    validFrom,
    validThrough,
    eligibleRegion: {
      "@type": "Country",
      name: eligibleRegion,
    },
    offeredBy: {
      "@type": "LocalBusiness",
      name: "Fisique Fitness",
      url: "https://fisique.fitness",
      telephone: "+91-9515469444",
      address: {
        "@type": "PostalAddress",
        streetAddress: "4th Floor, Above Pulla Reddy Sweets, Avant Cedar",
        addressLocality: "Kokapet",
        addressRegion: "Telangana",
        postalCode: "500075",
        addressCountry: "IN",
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
