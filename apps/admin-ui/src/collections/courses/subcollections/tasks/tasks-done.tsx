import { buildCollection } from 'firecms';

type TasksDone = {
  status: boolean;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export const courseTasksDoneCollection = buildCollection<TasksDone>({
  name: 'Tasks done',
  singularName: 'Task done',
  path: 'done',
  icon: 'AssignmentTurnedIn',
  defaultSize: 'm',
  selectionEnabled: true,
  customId: true,
  initialSort: ['updatedAt', 'desc'],
  permissions: () => ({
    read: true,
    edit: false,
    create: false,
    delete: true,
  }),
  properties: {
    status: {
      name: 'Done',
      validation: { required: true },
      dataType: 'boolean',
    },
    email: {
      name: 'Email',
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
