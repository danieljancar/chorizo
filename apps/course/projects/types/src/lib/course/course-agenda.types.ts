import { Timestamp } from 'firebase/firestore';

export type CourseAgenda = {
  id: string;
  entries: string[];
  order: number;
  updatedAt: Timestamp;
  createdAt: Timestamp;
};
