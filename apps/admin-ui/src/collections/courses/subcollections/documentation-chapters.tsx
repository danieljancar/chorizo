import { buildCollection } from 'firecms';
import { courseDocumentationDocumentsCollection } from './documentation-documents.tsx';

type DocumentationChapter = {
  title: string;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export const courseDocumentationChapterCollection =
  buildCollection<DocumentationChapter>({
    name: 'Documentation',
    singularName: 'Chapter',
    path: 'documentation',
    icon: 'MenuBook',
    defaultSize: 'm',
    initialSort: ['order', 'asc'],
    permissions: () => ({
      read: true,
      edit: true,
      create: true,
      delete: true,
    }),
    subcollections: [courseDocumentationDocumentsCollection],
    properties: {
      title: {
        name: 'Title',
        validation: { required: true },
        dataType: 'string',
      },
      content: {
        name: 'Content',
        validation: { required: true, min: 10, max: 100000 },
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
