interface ArticleSchemaProps {
  headline: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
}

export const ArticleSchema = ({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  image = 'https://fisique.fitness/hero-gym.webp',
}: ArticleSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    image,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://fisique.fitness/#organization',
      name: 'Fisique Fitness',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fisique.fitness/fisique-logo.webp',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
