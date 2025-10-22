import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Menu Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'menuId',
      title: 'Menu ID',
      type: 'string',
      description: 'Unique identifier for this menu (e.g., "main", "footer")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'Menu Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'menuItem',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
            },
            {
              name: 'page',
              title: 'Link to Page',
              type: 'reference',
              to: [{ type: 'page' }],
            },
            {
              name: 'color',
              title: 'Color',
              type: 'string',
              description: 'Optional color for this menu item',
            },
            {
              name: 'submenu',
              title: 'Submenu',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    },
                    {
                      name: 'page',
                      title: 'Link to Page',
                      type: 'reference',
                      to: [{ type: 'page' }],
                    },
                    {
                      name: 'description',
                      title: 'Description',
                      type: 'text',
                      rows: 2,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
  ],
})

