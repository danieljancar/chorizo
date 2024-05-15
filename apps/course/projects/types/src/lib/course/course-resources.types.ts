import { Timestamp } from 'firebase/firestore';

export type CourseResource = {
  id: string;
  title: string;
  source: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
