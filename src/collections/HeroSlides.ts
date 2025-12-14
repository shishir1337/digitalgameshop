import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/adminOnly'
import { adminOrPublishedStatus } from '@/access/adminOrPublishedStatus'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: adminOrPublishedStatus,
    update: adminOnly,
  },
  admin: {
    group: 'Content',
    defaultColumns: ['title', 'order', 'publishedAt', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal title for this slide (not displayed on frontend)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The hero image for this slide',
      },
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for the image (for accessibility and SEO)',
      },
    },
    {
      name: 'link',
      type: 'text',
      required: true,
      admin: {
        description: 'URL where the slide should link to (e.g., /products, /shop)',
      },
    },
    {
      name: 'color',
      type: 'text',
      required: true,
      admin: {
        description: 'Hex color code for the gradient background (e.g., #66190d)',
      },
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Order in which this slide appears (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
  ],
  versions: {
    drafts: {
      autosave: true,
    },
  },
}

