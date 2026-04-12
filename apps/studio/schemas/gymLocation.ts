import { defineField, defineType } from 'sanity'

export const gymLocation = defineType({
  name: 'gymLocation',
  title: 'Gym Location',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Location Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (r) => r.required() }),
    defineField({ name: 'address', title: 'Address', type: 'text', rows: 2 }),
    defineField({ name: 'googleMapsUrl', title: 'Google Maps URL', type: 'url' }),
    defineField({ name: 'googleMapsEmbed', title: 'Google Maps Embed URL', type: 'url' }),
    defineField({
      name: 'hours',
      title: 'Opening Hours',
      type: 'object',
      fields: [
        { name: 'weekdays', title: 'Weekdays', type: 'string' },
        { name: 'saturday', title: 'Saturday', type: 'string' },
        { name: 'sunday', title: 'Sunday', type: 'string' },
      ],
    }),
    defineField({
      name: 'nearbyAreas',
      title: 'Nearby Areas',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'features',
      title: 'Features / Highlights',
      type: 'array',
      of: [
        defineField({
          name: 'feature',
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon (emoji or name)', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'faqs',
      title: 'Location FAQs',
      type: 'array',
      of: [
        defineField({
          name: 'faq',
          type: 'object',
          fields: [
            { name: 'question', title: 'Question', type: 'string' },
            { name: 'answer', title: 'Answer', type: 'text', rows: 3 },
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 2 },
        { name: 'ogImage', title: 'OG Image', type: 'image' },
      ],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'address' },
  },
})
