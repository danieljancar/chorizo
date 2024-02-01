export type Course = {
  id: string;
  published: boolean;
  name: string;
  about: string;
  banner?: string;
  category?: string;
  tags?: string[];
  links?: {
    homepage?: string;
    repository?: string;
    npm?: string;
  };
  agenda?: AgendaEntry[];
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
