import {FolderIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title', maxLength: 96 } }),
    defineField({ name: 'category', type: 'string' }),
    defineField({ name: 'client', type: 'string' }),
    defineField({ name: 'location', type: 'string' }),
    defineField({ name: 'year', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'challenge', type: 'text' }),
    defineField({ name: 'service', type: 'text' }),
    defineField({ name: 'results', type: 'text' }),
    defineField({ name: 'features', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'technologies', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'images', type: 'array', of: [defineArrayMember({ type: 'image' })] }),
    defineField({
      name: 'testimonial',
      type: 'object',
      fields: [
        defineField({ name: 'author', type: 'string' }),
        defineField({ name: 'position', type: 'string' }),
        defineField({ name: 'rating', type: 'number' }),
        defineField({ name: 'image', type: 'image' }),
        defineField({ name: 'text', type: 'text' }),
      ],
    }),
  ],
})



