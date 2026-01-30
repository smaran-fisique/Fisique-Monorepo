import { Helmet } from "react-helmet-async";

interface ServiceSchemaProps {
  includePersonalTraining?: boolean;
  includeGymMembership?: boolean;
  includeSauna?: boolean;
  includeNutrition?: boolean;
}

/**
 * ServiceSchema - Uses Service type with proper Offer structure
 * Fixed: Added image, price, priceCurrency to all offers to prevent Google
 * from interpreting them as Events (which require performer field)
 */
export const ServiceSchema = ({
  includePersonalTraining = true,
  includeGymMembership = true,
  includeSauna = true,
  includeNutrition = true,
}: ServiceSchemaProps) => {
  const services = [];

  const providerRef = {
    "@id": "https://fisique.fitness/#organization"
  };

  const areaServed = {
    "@type": "City",
    "name": "Hyderabad"
  };

  const defaultImage = "https://fisique.fitness/fisique-logo.webp";

  if (includePersonalTraining) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#personal-training",
      "name": "Personal Training in Kokapet",
      "description": "1:1 personal training with certified coaches, customized nutrition plans, and 90-day transformation programs at Fisique Fitness Kokapet, Hyderabad.",
      "image": defaultImage,
      "provider": providerRef,
      "areaServed": areaServed,
      "offers": [
        {
          "@type": "Offer",
          "name": "Monthly Personal Training",
          "price": "15000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://fisique.fitness/personal-training-kokapet"
        },
        {
          "@type": "Offer",
          "name": "90-Day Transformation Program",
          "price": "45000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://fisique.fitness/personal-training-kokapet"
        }
      ]
    });
  }

  if (includeGymMembership) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#gym-membership",
      "name": "Gym Membership in Kokapet",
      "description": "Premium gym access with state-of-the-art equipment at Fisique Fitness Kokapet. Flexible 1, 3, 6, and 12-month plans available.",
      "image": defaultImage,
      "provider": providerRef,
      "areaServed": areaServed,
      "offers": [
        {
          "@type": "Offer",
          "name": "Monthly Gym Membership",
          "price": "5000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://fisique.fitness/kokapet-gym"
        },
        {
          "@type": "Offer",
          "name": "Quarterly Gym Membership",
          "price": "14000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://fisique.fitness/kokapet-gym"
        },
        {
          "@type": "Offer",
          "name": "Half-Yearly Gym Membership",
          "price": "20000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://fisique.fitness/kokapet-gym"
        },
        {
          "@type": "Offer",
          "name": "Annual Gym Membership",
          "price": "25000",
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "url": "https://fisique.fitness/kokapet-gym"
        }
      ]
    });
  }

  if (includeSauna) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#sauna",
      "name": "Sauna Recovery in Kokapet",
      "description": "On-site sauna therapy for post-workout muscle recovery, stress reduction, and overall wellness at Fisique Fitness Kokapet.",
      "image": defaultImage,
      "provider": providerRef,
      "areaServed": areaServed
    });
  }

  if (includeNutrition) {
    services.push({
      "@type": "Service",
      "@id": "https://fisique.fitness/#nutrition",
      "name": "Nutrition Counseling in Kokapet",
      "description": "Personalized diet plans and nutrition guidance to complement your fitness journey at Fisique Fitness Kokapet, Hyderabad.",
      "image": defaultImage,
      "provider": providerRef,
      "areaServed": areaServed
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
