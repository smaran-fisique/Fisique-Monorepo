import { Helmet } from "react-helmet-async";

interface ServiceSchemaProps {
  includePersonalTraining?: boolean;
  includeGymMembership?: boolean;
  includeSauna?: boolean;
  includeNutrition?: boolean;
}

export const ServiceSchema = ({
  includePersonalTraining = true,
  includeGymMembership = true,
  includeSauna = true,
  includeNutrition = true,
}: ServiceSchemaProps) => {
  const services = [];

  if (includePersonalTraining) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#personal-training",
      "name": "Personal Training in Kokapet",
      "description": "1:1 personal training with certified coaches, customized nutrition plans, and 90-day transformation programs at Fisique Fitness Kokapet, Hyderabad.",
      "provider": {
        "@id": "https://fisique.fitness/#organization"
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Personal Training Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "90-Day Transformation Program"
            },
            "priceSpecification": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "45000",
              "highPrice": "90000",
              "offerCount": "3"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Monthly Personal Training"
            },
            "priceSpecification": {
              "@type": "AggregateOffer",
              "priceCurrency": "INR",
              "lowPrice": "15000",
              "highPrice": "25000",
              "offerCount": "2"
            }
          }
        ]
      }
    });
  }

  if (includeGymMembership) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#gym-membership",
      "name": "Gym Membership in Kokapet",
      "description": "Premium gym access with state-of-the-art equipment at Fisique Fitness Kokapet. Flexible 1, 3, 6, and 12-month plans available.",
      "provider": {
        "@id": "https://fisique.fitness/#organization"
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Gym Membership Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Monthly Gym Membership"
            },
            "price": "3000",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Quarterly Gym Membership"
            },
            "price": "8000",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Half-Yearly Gym Membership"
            },
            "price": "15000",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Annual Gym Membership"
            },
            "price": "25000",
            "priceCurrency": "INR"
          }
        ]
      }
    });
  }

  if (includeSauna) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#sauna",
      "name": "Sauna Recovery in Kokapet",
      "description": "On-site sauna therapy for post-workout muscle recovery, stress reduction, and overall wellness at Fisique Fitness Kokapet.",
      "provider": {
        "@id": "https://fisique.fitness/#organization"
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      }
    });
  }

  if (includeNutrition) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#nutrition",
      "name": "Nutrition Counseling in Kokapet",
      "description": "Personalized diet plans and nutrition guidance to complement your fitness journey at Fisique Fitness Kokapet, Hyderabad.",
      "provider": {
        "@id": "https://fisique.fitness/#organization"
      },
      "areaServed": {
        "@type": "City",
        "name": "Hyderabad"
      }
    });
  }

  const schema = {
    "@context": "https://schema.org",
    "@graph": services
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
