import { buildCollection } from 'firecms';
import { courseTasksDoneCollection } from './tasks-done.tsx';

type Task = {
  title: string;
  description: string;
  order: number;
  fileInput: boolean;
  relatedDocuments?: relatedDocument[];
  workPhase: WorkPhase;
  createdAt: Date;
  updatedAt: Date;
};

type WorkPhase = 'individual' | 'pair' | 'group' | 'plenum';
type relatedDocument = {
  title: string;
  url: string;
};

export const courseTaskCollection = buildCollection<Task>({
  name: 'Tasks',
  singularName: 'Task',
  path: 'tasks',
  icon: 'Assignment',
  defaultSize: 'm',
  selectionEnabled: true,
  initialSort: ['order', 'asc'],
  subcollections: [courseTasksDoneCollection],
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
      validation: { required: false, min: 3, max: 100000 },
      dataType: 'string',
      markdown: true,
    },
    order: {
      name: 'Order',
      validation: { required: true, unique: true, integer: true },
      dataType: 'number',
    },
    workPhase: {
      name: 'Work phase',
      validation: { required: true },
      dataType: 'string',
      enumValues: {
        individual: 'Individual',
        pair: 'Pair',
        group: 'Group',
        plenum: 'Plenum',
      },
    },
    fileInput: {
      name: 'File input',
      validation: { required: true },
      defaultValue: false,
      dataType: 'boolean',
      disabled: true,
    },
    relatedDocuments: {
      disabled: true,
      name: 'Related documents',
      validation: { required: false },
      dataType: 'array',
      of: {
        dataType: 'map',
        properties: {
          title: {
            name: 'Title',
            validation: { required: true },
            dataType: 'string',
          },
          url: {
            name: 'URL',
            validation: { required: true },
            dataType: 'reference',
            path: '',
            previewProperties: ['title'],
          },
        },
      },
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
