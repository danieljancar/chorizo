import { buildCollection } from 'firecms';

type DocumentationDocuments = {
  title: string;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export const courseDocumentationDocumentsCollection =
  buildCollection<DocumentationDocuments>({
    name: 'Documentation',
    singularName: 'Document',
    path: 'documents',
    icon: 'MenuBook',
    defaultSize: 'm',
    selectionEnabled: true,
    initialSort: ['order', 'asc'],
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
      content: {
        name: 'Content',
        validation: { required: false, min: 3, max: 100000 },
        dataType: 'string',
        markdown: true,
      },
      order: {
        name: 'Order',
        validation: { required: true, unique: true, integer: true },
        dataType: 'number',
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
