// schemas/blogPost.ts
import { defineType, defineField } from 'sanity';
import { DocumentTextIcon } from '@sanity/icons';

export const postType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'UI/UX', value: 'UI/UX' },
          { title: 'Development', value: 'Development' },
          { title: 'WordPress', value: 'WordPress' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Saas', value: 'Saas' },
          { title: 'E-Commerce', value: 'E-Commerce' },
          { title: 'SEO', value: 'SEO' },
          { title: 'Hosting', value: 'Hosting' },
          { title: 'Networking', value: 'Networking' },
          { title: 'Template', value: 'Template' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'authorPosition',
      title: 'Author Position',
      type: 'string',
      description: 'e.g., "Senior Editor", "Content Writer", "Technical Lead"',
      placeholder: 'Senior Editor',
    }),
    defineField({
      name: 'authorQuote',
      title: 'Author Quote',
      type: 'text',
      rows: 3,
      description: 'A quote or bio from the author displayed at the end of the article',
      placeholder: 'Great products are built at the intersection of user needs and engineering excellence...',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g., "10 Min Read"',
    }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        { type: 'callout' },
      ],
      description: 'Portable Text content for the blog post',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'image',
    },
    prepare(selection) {
      const { title, author } = selection;
      return {
        ...selection,
        subtitle: author ? `by ${author}` : '',
      };
    },
  },
});
