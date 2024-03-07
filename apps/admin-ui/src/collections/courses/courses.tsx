import { buildCollection, buildProperty } from 'firecms';
import { courseTaskCollection } from './subcollections/tasks.tsx';
import { courseDocumentationChapterCollection } from './subcollections/documentation-chapters.tsx';

type Course = {
  title: string;
  about: string;
  content: string;
  tags: string[];
  banner: string;
  published: boolean;
  settings: {
    showSections: {
      agenda: boolean;
      documentation: boolean;
      resources: boolean;
      tasks: boolean;
    };
  };
  createdAt: Date;
  updatedAt: Date;
};

export const coursesCollection = buildCollection<Course>({
  name: 'Courses',
  singularName: 'Course',
  path: 'courses',
  icon: 'School',
  defaultSize: 'm',
  permissions: () => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  subcollections: [courseTaskCollection, courseDocumentationChapterCollection],
  properties: {
    title: {
      name: 'Title',
      validation: { required: true, min: 3, max: 100 },
      dataType: 'string',
    },
    about: {
      name: 'About',
      validation: { required: true, min: 3, max: 1000 },
      dataType: 'string',
      multiline: true,
    },
    content: {
      name: 'Content',
      validation: { required: false, min: 3, max: 100000 },
      dataType: 'string',
      markdown: true,
    },
    tags: {
      name: 'Tags',
      validation: { required: false, min: 0, max: 10 },
      dataType: 'array',
      of: {
        dataType: 'string',
      },
    },
    banner: buildProperty({
      name: 'Banner',
      dataType: 'string',
      storage: {
        mediaType: 'image/*',
        storagePath: 'images/courses/banners/',
      },
    }),
    published: {
      name: 'Published',
      validation: { required: true },
      dataType: 'boolean',
    },
    settings: {
      name: 'Settings',
      dataType: 'map',
      properties: {
        showSections: {
          name: 'Show sections',
          dataType: 'map',
          properties: {
            agenda: {
              name: 'Agenda',
              dataType: 'boolean',
            },
            documentation: {
              name: 'Documentation',
              dataType: 'boolean',
            },
            resources: {
              name: 'Resources',
              dataType: 'boolean',
            },
            tasks: {
              name: 'Tasks',
              dataType: 'boolean',
            },
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
