import { Timestamp } from 'firebase/firestore';
import { Reference } from '@angular/fire/compat/firestore';

export type CourseTask = {
  id: string;
  title: string;
  description: string;
  order: number;
  fileInput: boolean;
  relatedDocuments: relatedDocument[];
  workPhase: CourseWorkPhase;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  done?: CourseTasksDone | undefined;
};

export type CourseWorkPhase = 'individual' | 'pair' | 'group' | 'plenum';
export type relatedDocument = {
  title: string;
  url: Reference;
};

export type CourseTasksDone = {
  id?: string;
  status: boolean;
  fileInput?: string;
  createdAt?: Timestamp;
  updatedAt: Timestamp;
};
