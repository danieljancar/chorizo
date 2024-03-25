export type CourseTask = {
  id: string;
  title: string;
  content?: string;
  order: number;
  workPhase: CourseTaskWorkPhase;
  isCompleted: boolean;
};

export type CourseTaskWorkPhase = 'individual' | 'pair' | 'group' | 'plenum';
