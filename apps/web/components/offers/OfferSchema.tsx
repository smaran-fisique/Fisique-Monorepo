interface OfferSchemaProps {
  name: string;
  description: string;
  url: string;
  validFrom: string;
  validThrough: string;
  price?: string;
  priceCurrency?: string;
  image?: string;
  eligibleRegion?: string;
}

/**
 * OfferSchema - Properly structured Offer with required fields
 * Fixed: Added price, priceCurrency, and image to prevent Google
 * from interpreting as Event (which requires performer field)
 */
export const OfferSchema = ({
  name,
  description,
  url,
  validFrom,
  validThrough,
  price = "0",
  priceCurrency = "INR",
  image = "https://fisique.fitness/fisique-logo.webp",
  eligibleRegion = "IN",
}: OfferSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Offer",
    name,
    description,
    url,
    image,
    price,
    priceCurrency,
    validFrom,
    validThrough,
    availability: "https://schema.org/InStock",
    eligibleRegion: {
      "@type": "Country",
      name: eligibleRegion,
    },
    offeredBy: {
      "@type": "LocalBusiness",
      "@id": "https://fisique.fitness/#localbusiness",
      name: "Fisique Fitness",
      url: "https://fisique.fitness",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
