import { defineField, defineType } from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Site Announcement',
  type: 'document',
  // Singleton
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'text', title: 'Announcement Text', type: 'string' }),
    defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
    defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
    defineField({ name: 'isActive', title: 'Show Banner', type: 'boolean', initialValue: false }),
    defineField({ name: 'expiresAt', title: 'Hide After', type: 'datetime' }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: { list: ['default', 'urgent', 'festive'], layout: 'radio' },
      initialValue: 'default',
    }),
  ],
  preview: { select: { title: 'text', subtitle: 'isActive' } },
})
