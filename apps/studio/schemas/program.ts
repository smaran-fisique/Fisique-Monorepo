import { defineField, defineType } from 'sanity'

export const program = defineType({
  name: 'program',
  title: 'Fitness Program',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Program Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'targetAudience', title: 'Target Audience', type: 'string' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'description' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle?.slice(0, 60) }
    },
  },
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
})
