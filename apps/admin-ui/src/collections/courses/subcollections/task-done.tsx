import { buildCollection } from 'firecms';

type TaskDone = {
  userId?: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export const courseTaskDoneCollection = buildCollection<TaskDone>({
  name: 'Done',
  singularName: 'Task Done',
  path: 'done',
  icon: 'AssignmentTurnedIn',
  defaultSize: 'm',
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    userId: {
      name: 'Related user',
      validation: { required: true },
      dataType: 'reference',
      path: 'users',
      previewProperties: ['username'],
    },
    status: {
      name: 'Status',
      validation: { required: true },
      dataType: 'boolean',
      defaultValue: false,
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
