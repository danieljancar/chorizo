import { Timestamp } from 'firebase/firestore';

export type CourseResource = {
  id: string;
  title: string;
  description?: string;
  source: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
