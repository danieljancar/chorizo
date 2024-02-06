export type Course = {
  id: string;
  published: boolean;
  title: string;
  about: string;
  tags?: string[];
  links?: {
    homepage?: string;
    repository?: string;
    npm?: string;
  };
  settings: {
    showSections: {
      agenda: boolean;
      tasks: boolean;
      documentation: boolean;
      resources: boolean;
    };
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
