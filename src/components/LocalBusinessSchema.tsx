import { Helmet } from "react-helmet-async";

export const LocalBusinessSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://fisique.fitness",
    "name": "Fisique Fitness",
    "description": "Premium personal training gym in Kokapet, Hyderabad offering one-on-one coaching, nutrition guidance, and sauna recovery.",
    "url": "https://fisique.fitness",
    "telephone": ["+91-9515847444", "+91-7671959610"],
    "email": "hello@fisique.fitness",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Above Pulla reddy Sweets, Avant Cedar",
      "addressLocality": "Kokapet",
      "addressRegion": "Hyderabad",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.4156",
      "longitude": "78.3558"
    },
    "image": "https://fisique.fitness/fisique-logo.webp",
    "priceRange": "₹₹₹",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "06:00",
        "closes": "22:00"
      }
    ],
    "sameAs": [
      "https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Fitness Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Personal Training",
            "description": "One-on-one coaching with customized nutrition plans"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gym Membership",
            "description": "Premium equipment access with sauna facilities"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
