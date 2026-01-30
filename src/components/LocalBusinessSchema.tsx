import { Helmet } from "react-helmet-async";
import { useSiteStats } from "@/hooks/useSiteStats";

/**
 * LocalBusinessSchema - Single source for aggregate ratings
 * This is the ONLY schema that should contain aggregateRating
 * to prevent "multiple aggregate ratings" errors in Google Search Console
 */
export const LocalBusinessSchema = () => {
  const { stats } = useSiteStats();

  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthClub", "SportsActivityLocation"],
    "@id": "https://fisique.fitness/#localbusiness",
    "additionalType": "https://schema.org/ExerciseGym",
    "name": "Fisique Fitness",
    "description": "Premium personal training gym in Kokapet, Hyderabad offering one-on-one coaching, nutrition guidance, and sauna recovery.",
    "url": "https://fisique.fitness",
    "telephone": ["+91-9515469444", "+91-7671959610"],
    "email": "hello@fisique.fitness",
    "image": [
      "https://fisique.fitness/fisique-logo.webp"
    ],
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
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": stats.avgRating,
      "reviewCount": stats.reviewCount,
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://maps.app.goo.gl/GoiqDpnditiJBRmJ9"
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
      }
    ],
    "isAccessibleForFree": false,
    "publicAccess": true
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
