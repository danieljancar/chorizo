import { Timestamp } from 'firebase/firestore';

export type CourseChapter = {
  id: string;
  title: string;
  order: number;
  documents: CourseDocument[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
export type CourseDocument = {
  id: string;
  title: string;
  content: string;
  order: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
