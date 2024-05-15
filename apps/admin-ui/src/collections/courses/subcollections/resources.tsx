import { buildCollection, buildProperty, getRandomId } from 'firecms';

type ResourcesDocument = {
  title: string;
  source: string;
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
    source: buildProperty({
      name: 'Source',
      validation: { required: true },
      dataType: 'string',
      storage: {
        mediaType: 'file',
        storagePath: 'files/courses/resources/',
        fileName: (context) => {
          const extension = context.file?.name.split('.').pop();
          return `${getRandomId()}.${extension}`;
        },
      },
    }),
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
