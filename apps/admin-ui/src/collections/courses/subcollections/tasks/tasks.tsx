import { buildCollection } from 'firecms';
import { courseTasksDoneCollection } from './tasks-done.tsx';

type Task = {
  title: string;
  description: string;
  order: number;
  workPhase: WorkPhase;
  createdAt: Date;
  updatedAt: Date;
};

type WorkPhase = 'individual' | 'pair' | 'group' | 'plenum';

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
      validation: { required: true },
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
