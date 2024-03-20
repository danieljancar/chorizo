import { buildCollection, buildProperty } from 'firecms';

type ResourcesDocument = {
  title: string;
  description?: string;
  source: string;
  group: string;
  createdAt: Date;
  updatedAt: Date;
};

export const courseResourcesCollection = buildCollection<ResourcesDocument>({
  name: 'Resources',
  singularName: 'Resource',
  path: 'resources',
  icon: 'Folder',
  defaultSize: 'm',
  selectionEnabled: true,
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    title: {
      name: 'Title',
      validation: { required: true },
      dataType: 'string',
    },
    description: {
      name: 'Description',
      validation: { required: false, min: 3, max: 100000 },
      dataType: 'string',
      markdown: true,
    },
    source: buildProperty({
      name: 'Source',
      validation: { required: true },
      dataType: 'string',
      storage: {
        mediaType: 'file',
        storagePath: 'files/courses/resources/',
      },
    }),
    group: {
      name: 'Group',
      validation: { required: true },
      dataType: 'string',
    },
    createdAt: {
      name: 'Created at',
      dataType: 'date',
      readOnly: true,
      autoValue: 'on_create',
    },
    updatedAt: {
      name: 'Updated at',
      dataType: 'date',
      readOnly: true,
      autoValue: 'on_update',
    },
  },
});
