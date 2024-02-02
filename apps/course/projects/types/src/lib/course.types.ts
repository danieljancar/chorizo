export type Course = {
  id: string;
  published: boolean;
  title: string;
  about: string;
  banner?: string;
  category?: string;
  tags?: string[];
  links?: {
    homepage?: string;
    repository?: string;
    npm?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
};

export type AgendaEntry = {
  id: string;
  name: string;
  description?: string;
  start: Date;
  icon?: string;
  createdAt: Date;
  updatedAt?: Date;
};
