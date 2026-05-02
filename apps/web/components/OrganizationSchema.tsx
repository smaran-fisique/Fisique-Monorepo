export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HealthClub", "SportsActivityLocation"],
    "@id": "https://fisique.fitness/#organization",
    "name": "Fisique Fitness",
    "alternateName": "Fisique",
    "url": "https://fisique.fitness",
    "identifier": [
      {
        "@type": "PropertyValue",
        "propertyID": "GooglePlaceId",
        "value": "ChIJCVGCTtmVyzsRcoYr31T3p2s"
      }
    ],
    "logo": {
      "@type": "ImageObject",
      "url": "https://fisique.fitness/fisique-logo.webp",
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
      "https://www.wikidata.org/wiki/Q139603536",
      "https://www.google.com/maps/place/?q=place_id:ChIJCVGCTtmVyzsRcoYr31T3p2s",
      "https://www.instagram.com/fisique.fitness/",
      "https://www.youtube.com/@fisiquefitness",
      "https://www.linkedin.com/company/fisique-fitness/",
      "https://www.facebook.com/fisique.fitness/"
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
