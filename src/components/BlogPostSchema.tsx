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
      "@id": `https://fisiquefitness.com/blog/${slug}`
    },
    "headline": title,
    "description": excerpt,
    "image": featuredImage || "https://fisiquefitness.com/fisique-logo.webp",
    "datePublished": publishedAt,
    "dateModified": updatedAt || publishedAt,
    "author": {
      "@type": "Organization",
      "name": "Fisique Fitness",
      "@id": "https://fisiquefitness.com/#organization"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Fisique Fitness",
      "logo": {
        "@type": "ImageObject",
        "url": "https://fisiquefitness.com/fisique-logo.webp",
        "width": 157,
        "height": 40
      }
    },
    "isPartOf": {
      "@id": "https://fisiquefitness.com/#website"
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
