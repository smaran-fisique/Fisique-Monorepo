/**
 * TrainerCredentialsSchema
 * E-E-A-T signal for Google: establishes that Fisique employs certified professionals.
 * Add named trainer Persons here as the team grows to strengthen expertise signals.
 */
export const TrainerCredentialsSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EmployerAggregateRating",
    "@id": "https://fisique.fitness/#trainers",
    "about": {
      "@type": "Organization",
      "@id": "https://fisique.fitness/#localbusiness",
      "name": "Fisique Fitness",
      "url": "https://fisique.fitness",
      "employee": [
        {
          "@type": "Person",
          "jobTitle": "Head Personal Trainer",
          "worksFor": {
            "@type": "Organization",
            "name": "Fisique Fitness"
          },
          "knowsAbout": [
            "Strength Training",
            "Body Composition",
            "Nutrition Coaching",
            "Injury Prevention",
            "Sauna Recovery Protocols"
          ],
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Professional Certification",
            "name": "Certified Personal Trainer",
            "description": "Certified fitness professional specializing in 1:1 personal training, body transformation, and nutrition guidance for busy professionals."
          }
        },
        {
          "@type": "Person",
          "jobTitle": "Certified Personal Trainer",
          "worksFor": {
            "@type": "Organization",
            "name": "Fisique Fitness"
          },
          "knowsAbout": [
            "Resistance Training",
            "Mobility and Flexibility",
            "Weight Management",
            "Sports Nutrition"
          ],
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Professional Certification",
            "name": "Certified Personal Trainer",
            "description": "Specialist in resistance training and mobility programming for working professionals seeking sustainable fitness results."
          }
        }
      ]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
