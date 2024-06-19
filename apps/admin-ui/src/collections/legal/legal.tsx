import { buildCollection } from 'firecms';

type Legal = {
  title: string;
  description: string;
  markdown?: string;
  url?: string;
  displayType: 'markdown' | 'url';
};

export const legalCollection = buildCollection<Legal>({
  name: 'Legal',
  singularName: 'Legal',
  path: 'legal',
  icon: 'Gavel',
  defaultSize: 's',
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    title: {
      name: 'Title',
      validation: { required: true, min: 3, max: 100 },
      dataType: 'string',
    },
    description: {
      name: 'Description',
      validation: { required: true, min: 3, max: 500 },
      dataType: 'string',
    },
    markdown: {
      name: 'Markdown',
      validation: {
        required: (values: Legal) => values.displayType === 'markdown',
        min: 3,
        max: 100000,
      },
      dataType: 'string',
      markdown: true,
    },
    url: {
      name: 'URL',
      validation: {
        required: (values: Legal) => values.displayType === 'url',
        url: true,
      },
      dataType: 'string',
    },
    displayType: {
      name: 'Display Type',
      validation: { required: true },
      dataType: 'string',
      enumValues: {
        markdown: 'Markdown',
        url: 'URL',
      },
    },
  },
});
