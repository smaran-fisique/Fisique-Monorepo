import { defineField, defineType } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'memberName', title: 'Member Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'rating', title: 'Star Rating (1-5)', type: 'number', validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: 'quote', title: 'Quote / Review Text', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: { list: ['text', 'before_after', 'video'], layout: 'radio' },
      initialValue: 'text',
    }),
    defineField({ name: 'beforePhoto', title: 'Before Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'afterPhoto', title: 'After Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'videoUrl', title: 'Video URL (YouTube / Reel)', type: 'url' }),
    defineField({ name: 'duration', title: 'Duration (e.g. "3 months")', type: 'string' }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'string',
      options: { list: ['Personal Training', 'Fat-Loss', 'Strength', 'Body Recomposition', 'Mobility', 'Posture Fix', 'Transformation Journey'] },
    }),
    defineField({ name: 'featured', title: 'Featured on Homepage', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'memberName', subtitle: 'quote', media: 'afterPhoto' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle?.slice(0, 80), media }
    },
  },
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
