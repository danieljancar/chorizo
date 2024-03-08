import { Timestamp } from 'firebase/firestore';

export type Course = {
  id: string;
  published: boolean;
  title: string;
  about: string;
  content: string;
  banner: string;
  tags?: string[];
  links?: {
    homepage?: string;
    repository?: string;
    npm?: string;
  };
  settings?: {
    showSections?: {
      agenda: boolean;
      tasks: boolean;
      documentation: boolean;
      resources: boolean;
    };
  };
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export type CourseChapter = {
  id: string;
  title: string;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CourseDocument = {
  id: string;
  title: string;
  content: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
};
