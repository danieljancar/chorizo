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
