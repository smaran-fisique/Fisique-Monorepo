import { Helmet } from "react-helmet-async";

export const WebSiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://fisique.fitness/#website",
    "name": "Fisique Fitness",
    "url": "https://fisique.fitness",
    "description": "Premium personal training gym in Kokapet, Hyderabad",
    "publisher": {
      "@id": "https://fisique.fitness/#organization"
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
