interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  description: string;
  url?: string;
  image?: string;
  credentials?: string[];
  sameAs?: string[];
}

export const PersonSchema = ({
  name,
  jobTitle,
  description,
  url,
  image,
  credentials = [],
  sameAs = [],
}: PersonSchemaProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    ...(url ? { url } : {}),
    ...(image ? { image } : {}),
    worksFor: {
      '@type': 'Organization',
      '@id': 'https://fisique.fitness/#organization',
      name: 'Fisique Fitness',
    },
    ...(credentials.length
      ? {
          hasCredential: credentials.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c,
          })),
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
