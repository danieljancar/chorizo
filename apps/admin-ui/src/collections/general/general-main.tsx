import { buildCollection } from 'firecms';

type GeneralMain = {
  title: string;
  description: string;
  markdown: string;
  tags?: string[];
};

export const generalMainCollection = buildCollection<GeneralMain>({
  name: 'General',
  singularName: 'General',
  path: 'general',
  icon: 'Settings',
  defaultSize: 's',
  permissions: () => ({
    read: true,
    edit: true,
    create: false,
    delete: false,
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
      validation: { required: true, min: 3, max: 100000 },
      dataType: 'string',
      markdown: true,
    },
    tags: {
      name: 'Tags',
      validation: { required: false },
      dataType: 'array',
      of: {
        dataType: 'string',
      },
    },
  },
});
