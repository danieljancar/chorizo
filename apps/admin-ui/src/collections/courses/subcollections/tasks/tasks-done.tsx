import { buildCollection } from 'firecms';

type TasksDone = {
  userId: undefined;
  done: boolean;
  firstDoneAt: Date;
  firstUndoneAt: Date;
  lastDoneAt: Date;
  lastUndoneAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const courseTasksDoneCollection = buildCollection<TasksDone>({
  name: 'Tasks done',
  singularName: 'Task done',
  path: 'tasks_done',
  icon: 'AssignmentTurnedIn',
  defaultSize: 'm',
  selectionEnabled: true,
  initialSort: ['lastDoneAt', 'desc'],
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    userId: {
      name: 'User',
      validation: { required: true },
      dataType: 'reference',
      path: 'users',
      previewProperties: ['username'],
    },
    done: {
      name: 'Done',
      validation: { required: true },
      dataType: 'boolean',
    },
    firstDoneAt: {
      name: 'First done at',
      dataType: 'date',
      readOnly: true,
    },
    firstUndoneAt: {
      name: 'First undone at',
      dataType: 'date',
      readOnly: true,
    },
    lastDoneAt: {
      name: 'Last done at',
      dataType: 'date',
      readOnly: true,
    },
    lastUndoneAt: {
      name: 'Last undone at',
      dataType: 'date',
      readOnly: true,
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
