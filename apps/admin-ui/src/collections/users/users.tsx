import { buildCollection, buildProperty } from 'firecms';

type User = {
  username: string;
  name?: string;
  email: string;
  role: 'admin' | 'user';
  bio?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export const usersCollection = buildCollection<User>({
  name: 'Accounts',
  singularName: 'Account',
  path: 'users',
  icon: 'Person',
  defaultSize: 's',
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    username: {
      name: 'Username',
      validation: { required: true, min: 3, max: 100 },
      dataType: 'string',
      readOnly: true,
    },
    name: {
      name: 'Name',
      validation: { required: false, min: 3, max: 100 },
      dataType: 'string',
      readOnly: true,
    },
    email: {
      name: 'Email',
      validation: { required: true, min: 3, max: 100 },
      dataType: 'string',
      email: true,
      readOnly: true,
    },
    role: {
      name: 'Role',
      validation: { required: true },
      dataType: 'string',
      enumValues: {
        admin: 'Admin',
        user: 'User',
      },
    },
    bio: {
      name: 'Bio',
      validation: { required: false, min: 0, max: 1000 },
      dataType: 'string',
      multiline: true,
      readOnly: true,
    },
    avatar: buildProperty({
      name: 'Avatar',
      dataType: 'string',
      storage: {
        storagePath: '',
        acceptedFiles: ['image/*'],
      },
      readOnly: true,
    }),
    createdAt: {
      name: 'Created At',
      dataType: 'date',
      readOnly: true,
      autoValue: 'on_create',
    },
    updatedAt: {
      name: 'Updated At',
      dataType: 'date',
      readOnly: true,
      autoValue: 'on_update',
    },
  },
});
