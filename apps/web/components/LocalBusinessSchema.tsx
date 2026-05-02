/**
 * LocalBusinessSchema - Single source for aggregate ratings
 * This is the ONLY schema that should contain aggregateRating
 * to prevent "multiple aggregate ratings" errors in Google Search Console
 *
 * IMPORTANT: Only the homepage should use includeRating={true} (default)
 * All other pages should pass includeRating={false}
 */

interface LocalBusinessSchemaProps {
  includeRating?: boolean;
  ratingValue?: string;
  reviewCount?: string;
}

export const LocalBusinessSchema = ({
  includeRating = true,
  ratingValue = '5.0',
  reviewCount = '81',
}: LocalBusinessSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthClub", "SportsActivityLocation"],
    "@id": "https://fisique.fitness/#localbusiness",
    "additionalType": "https://schema.org/ExerciseGym",
    "name": "Fisique Fitness",
    "identifier": [
      {
        "@type": "PropertyValue",
        "propertyID": "GooglePlaceId",
        "value": "ChIJCVGCTtmVyzsRcoYr31T3p2s"
      }
    ],
    "description": "Premium personal training gym in Kokapet, Hyderabad offering one-on-one coaching, nutrition guidance, and sauna recovery.",
    "url": "https://fisique.fitness",
    "telephone": ["+91-9515469444", "+91-7671959610"],
    "email": "hello@fisique.fitness",
    "image": [
      "https://fisique.fitness/fisique-logo.webp"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4th Floor, Advant Cedar, Osman Sagar Rd, above Pulla Reddy Sweets",
      "addressLocality": "Kokapet",
      "addressRegion": "Hyderabad",
      "postalCode": "500075",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "17.3871076",
      "longitude": "78.3400906"
    },
    "priceRange": "₹₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, Credit Card, UPI, Bank Transfer",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "05:30",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "07:00",
        "closes": "12:00",
        "description": "Self-training only, no personal trainers on site"
      }
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Personal Training",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Sauna",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Nutrition Counseling",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Strength Training Equipment",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Cardio Equipment",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Locker Rooms",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air Conditioning",
        "value": true
      }
    ],
    ...(includeRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": ratingValue,
        "reviewCount": reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    }),
    "sameAs": [
      "https://www.wikidata.org/wiki/Q139603536",
      "https://www.google.com/maps/place/?q=place_id:ChIJCVGCTtmVyzsRcoYr31T3p2s",
      "https://www.instagram.com/fisique.fitness/",
      "https://www.youtube.com/@fisiquefitness",
      "https://www.linkedin.com/company/fisique-fitness/",
      "https://www.facebook.com/fisique.fitness/"
    ],
    "knowsAbout": [
      "Personal Training",
      "Strength Training",
      "Nutrition Counseling",
      "Sauna Therapy",
      "Body Transformation",
      "Fitness Coaching"
    ],
    "areaServed": [
      { "@type": "City", "name": "Kokapet" },
      { "@type": "City", "name": "Financial District" },
      { "@type": "City", "name": "Narsingi" },
      { "@type": "City", "name": "Gandipet" },
      { "@type": "City", "name": "Gachibowli" },
      { "@type": "City", "name": "Manikonda" },
      { "@type": "City", "name": "Puppalaguda" },
      { "@type": "City", "name": "Tellapur" },
      { "@type": "City", "name": "Nallagandla" },
      { "@type": "City", "name": "Khajaguda" },
      { "@type": "City", "name": "Nanakramguda" }
    ],
    "isAccessibleForFree": false,
    "publicAccess": true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
