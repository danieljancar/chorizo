export type CourseTask = {
  id: string;
  title: string;
  description: string;
  order: number;
  workPhase: CourseWorkPhase;
  createdAt: Date;
  updatedAt: Date;
  done?: boolean;
  doneMetadata?: CourseTasksDone | undefined;
};

type CourseWorkPhase = 'individual' | 'pair' | 'group' | 'plenum';

export type CourseTasksDone = {
  id: string;
  userId: string | undefined;
  done: boolean;
  firstDoneAt: Date;
  firstUndoneAt: Date;
  lastDoneAt: Date;
  lastUndoneAt: Date;
  createdAt: Date;
  updatedAt: Date;
};
