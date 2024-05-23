import { buildCollection } from 'firecms';

type AgendaDocument = {
  entries: [title: string];
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export const courseAgendaCollection = buildCollection<AgendaDocument>({
  name: 'Agenda',
  path: 'agenda',
  singularName: 'Agenda entry',
  icon: 'Calendar',
  initialSort: ['order', 'asc'],
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    entries: {
      name: 'Entries',
      validation: { required: true },
      dataType: 'array',
      of: {
        dataType: 'string',
      },
    },
    order: {
      name: 'Order',
      dataType: 'number',
      validation: {
        required: true,
        unique: true,
        integer: true,
        min: 0,
        max: 100,
      },
    },
    updatedAt: {
      name: 'Updated at',
      dataType: 'date',
      readOnly: true,
      autoValue: 'on_update',
    },
    createdAt: {
      name: 'Created at',
      dataType: 'date',
      readOnly: true,
      autoValue: 'on_create',
    },
  },
});
