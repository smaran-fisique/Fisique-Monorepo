import { Helmet } from "react-helmet-async";

export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://fisiquefitness.com/#website",
    "name": "Fisique Fitness",
    "url": "https://fisiquefitness.com",
    "description": "Premium personal training gym in Kokapet, Hyderabad",
    "publisher": {
      "@id": "https://fisiquefitness.com/#organization"
    },
    "inLanguage": "en-IN"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
