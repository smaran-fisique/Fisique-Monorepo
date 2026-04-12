import { defineField, defineType } from 'sanity'

export const challenge = defineType({
  name: 'challenge',
  title: 'Challenge Settings',
  type: 'document',
  // Singleton
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({ name: 'title', title: 'Challenge Title', type: 'string' }),
    defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
    defineField({ name: 'endDate', title: 'End Date', type: 'datetime' }),
    defineField({ name: 'isActive', title: 'Challenge Active', type: 'boolean', initialValue: true }),
    defineField({
      name: 'prizes',
      title: 'Prize List',
      type: 'array',
      of: [
        defineField({
          name: 'prize',
          type: 'object',
          fields: [
            { name: 'rank', title: 'Rank (1st, 2nd, etc.)', type: 'string' },
            { name: 'prize', title: 'Prize Description', type: 'string' },
          ],
          preview: { select: { title: 'rank', subtitle: 'prize' } },
        }),
      ],
    }),
    defineField({
      name: 'pointValues',
      title: 'Point Values',
      type: 'object',
      fields: [
        { name: 'referralPT', title: 'Referral → PT (points)', type: 'number' },
        { name: 'referralMembership', title: 'Referral → Membership (points)', type: 'number' },
        { name: 'socialPost', title: 'Social Post (points)', type: 'number' },
        { name: 'voteReceived', title: 'Vote Received (points)', type: 'number' },
        { name: 'maxVotePoints', title: 'Max Points from Votes', type: 'number' },
      ],
    }),
    defineField({
      name: 'rules',
      title: 'Rules',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'steps',
      title: 'How to Participate (Steps)',
      type: 'array',
      of: [
        defineField({
          name: 'step',
          type: 'object',
          fields: [
            { name: 'title', title: 'Step Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'title' } },
})
