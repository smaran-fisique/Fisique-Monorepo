interface BlogPost {
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image_url: string | null;
  published_at: string;
}

interface BlogListSchemaProps {
  posts: BlogPost[];
}

export const BlogListSchema = ({ posts }: BlogListSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://fisique.fitness/blog-posts/#webpage",
    "url": "https://fisique.fitness/blog-posts/",
    "name": "Fitness Blog | Fisique Fitness",
    "description": "Tips, guides, and inspiration for your fitness journey from Fisique Fitness in Kokapet, Hyderabad.",
    "isPartOf": {
      "@id": "https://fisique.fitness/#website"
    },
    "about": {
      "@type": "Thing",
      "name": "Fitness and Personal Training"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": posts.map((post, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "BlogPosting",
          "@id": `https://fisique.fitness/blog/${post.slug}`,
          "url": `https://fisique.fitness/blog/${post.slug}`,
          "headline": post.title,
          "description": post.excerpt || post.title,
          "image": post.featured_image_url || "https://fisique.fitness/fisique-logo.webp",
          "datePublished": post.published_at,
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
              "url": "https://fisique.fitness/fisique-logo.webp"
            }
          }
        }
      }))
    },
    "inLanguage": "en-IN"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
