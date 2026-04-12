import { defineField, defineType } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one document of this type
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'branding',
      title: 'Branding',
      type: 'object',
      fields: [
        { name: 'siteName', title: 'Site Name', type: 'string' },
        { name: 'tagline', title: 'Tagline', type: 'string' },
        { name: 'logo', title: 'Logo', type: 'image' },
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      fields: [
        { name: 'whatsappNumber', title: 'WhatsApp Number', type: 'string' },
        { name: 'phone', title: 'Phone (display)', type: 'string' },
        { name: 'email', title: 'Email', type: 'string' },
        { name: 'address', title: 'Address', type: 'text', rows: 3 },
        { name: 'googleMapsEmbed', title: 'Google Maps Embed URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'hours',
      title: 'Business Hours',
      type: 'object',
      fields: [
        { name: 'weekdays', title: 'Weekdays', type: 'string' },
        { name: 'saturday', title: 'Saturday', type: 'string' },
        { name: 'sunday', title: 'Sunday', type: 'string' },
      ],
    }),
    defineField({
      name: 'socials',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram URL', type: 'url' },
        { name: 'facebook', title: 'Facebook URL', type: 'url' },
        { name: 'youtube', title: 'YouTube URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics & Integrations',
      type: 'object',
      fields: [
        { name: 'ga4MeasurementId', title: 'GA4 Measurement ID', type: 'string' },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        { name: 'defaultTitle', title: 'Default Title', type: 'string' },
        { name: 'defaultDescription', title: 'Default Description', type: 'text', rows: 2 },
        { name: 'defaultOgImage', title: 'Default OG Image', type: 'image' },
      ],
    }),
  ],
  preview: { select: { title: 'branding.siteName' } },
})
