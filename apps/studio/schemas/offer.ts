import { defineField, defineType } from 'sanity'

export const offer = defineType({
  name: 'offer',
  title: 'Offer / Campaign',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'image', title: 'Banner Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'datetime' }),
    defineField({ name: 'endDate', title: 'End Date', type: 'datetime' }),
    defineField({ name: 'isActive', title: 'Active', type: 'boolean', initialValue: true }),
    defineField({
      name: 'captureLeads',
      title: 'Capture Leads (show form)',
      type: 'boolean',
      initialValue: false,
      description: 'If true, show a name+phone form instead of just a CTA link.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'isActive', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle ? '🟢 Active' : '⚫ Inactive', media }
    },
  },
})
