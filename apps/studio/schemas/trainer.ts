import { defineField, defineType } from 'sanity'

export const trainer = defineType({
  name: 'trainer',
  title: 'Trainer',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio', title: 'Bio', type: 'text', rows: 4 }),
    defineField({ name: 'experience', title: 'Years of Experience', type: 'number' }),
    defineField({
      name: 'credentials',
      title: 'Credentials / Certifications',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'specialties',
      title: 'Specialties',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'locations',
      title: 'Locations',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'gymLocation' }] }],
    }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'bio', media: 'photo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle?.slice(0, 60), media }
    },
  },
})
