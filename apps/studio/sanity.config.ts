import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'fisique-studio',
  title: 'Fisique Fitness',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET ?? 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singletons
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Announcement Banner')
              .id('announcement')
              .child(S.document().schemaType('announcement').documentId('announcement')),
            S.listItem()
              .title('Challenge Settings')
              .id('challenge')
              .child(S.document().schemaType('challenge').documentId('challenge')),
            S.divider(),
            // Collections
            S.listItem().title('Blog Posts').schemaType('post').child(S.documentTypeList('post')),
            S.listItem().title('Blog Categories').schemaType('category').child(S.documentTypeList('category')),
            S.divider(),
            S.listItem().title('Gym Locations').schemaType('gymLocation').child(S.documentTypeList('gymLocation')),
            S.listItem().title('Trainers').schemaType('trainer').child(S.documentTypeList('trainer')),
            S.listItem().title('Programs').schemaType('program').child(S.documentTypeList('program')),
            S.divider(),
            S.listItem().title('Testimonials').schemaType('testimonial').child(S.documentTypeList('testimonial')),
            S.listItem().title('Offers & Campaigns').schemaType('offer').child(S.documentTypeList('offer')),
            S.listItem().title('Legal Pages').schemaType('legalPage').child(S.documentTypeList('legalPage')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
