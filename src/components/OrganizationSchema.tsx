import { Helmet } from "react-helmet-async";

export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://fisiquefitness.com/#organization",
    "name": "Fisique Fitness",
    "alternateName": "Fisique",
    "url": "https://fisiquefitness.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://fisiquefitness.com/fisique-logo.webp",
      "width": 157,
      "height": 40
    },
    "description": "Premium personal training gym in Kokapet, Hyderabad offering one-on-one coaching, customized nutrition plans, and sauna recovery.",
    "email": "hello@fisique.fitness",
    "telephone": "+91-9515469444",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Above Pulla Reddy Sweets, Avant Cedar",
      "addressLocality": "Kokapet",
      "addressRegion": "Hyderabad",
      "postalCode": "500075",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3871",
      "longitude": "78.3401"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Kokapet"
      },
      {
        "@type": "City", 
        "name": "Financial District"
      },
      {
        "@type": "City",
        "name": "Narsingi"
      },
      {
        "@type": "City",
        "name": "Gandipet"
      },
      {
        "@type": "City",
        "name": "Gachibowli"
      }
    ],
    "sameAs": [
      "https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-9515469444",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Telugu"],
        "areaServed": "IN"
      },
      {
        "@type": "ContactPoint",
        "telephone": "+91-7671959610",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi", "Telugu"],
        "areaServed": "IN"
      }
    ],
    "foundingLocation": {
      "@type": "Place",
      "name": "Kokapet, Hyderabad"
    },
    "slogan": "It's never generic. It's always personal."
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
