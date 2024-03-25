import { buildCollection } from 'firecms';
import { courseTaskDoneCollection } from './task-done.tsx';

type Task = {
  title: string;
  content?: string;
  order: number;
  workPhase: 'individual' | 'pair' | 'group' | 'plenum';
  createdAt: Date;
  updatedAt: Date;
};

export const courseTaskCollection = buildCollection<Task>({
  name: 'Tasks',
  singularName: 'Task',
  path: 'tasks',
  icon: 'Assignment',
  defaultSize: 'm',
  initialSort: ['order', 'asc'],
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  subcollections: [courseTaskDoneCollection],
  properties: {
    title: {
      name: 'Title',
      validation: { required: true, min: 3, max: 100 },
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
      validation: { required: true, unique: true },
      dataType: 'number',
    },
    workPhase: {
      name: 'Work phase',
      validation: { required: true },
      dataType: 'string',
      defaultValue: 'individual',
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
