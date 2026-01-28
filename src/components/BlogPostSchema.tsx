import { Helmet } from "react-helmet-async";

interface BlogPostSchemaProps {
  title: string;
  excerpt: string;
  slug: string;
  featuredImage?: string;
  publishedAt: string;
  updatedAt?: string;
}

export const BlogPostSchema = ({
  title,
  excerpt,
  slug,
  featuredImage,
  publishedAt,
  updatedAt
}: BlogPostSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://fisique.fitness/blog/${slug}`
    },
    "headline": title,
    "description": excerpt,
    "image": featuredImage || "https://fisique.fitness/fisique-logo.webp",
    "datePublished": publishedAt,
    "dateModified": updatedAt || publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Fisique Fitness",
      "@id": "https://fisique.fitness/#organization"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fisique Fitness",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fisique.fitness/fisique-logo.webp",
        "width": 157,
        "height": 40
      }
    },
    "isPartOf": {
      "@id": "https://fisique.fitness/#website"
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
