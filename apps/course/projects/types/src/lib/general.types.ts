export type General = {
  id: number;
  title: string;
  description: string;
  logo: string;
  banner: string;
  links?: {
    homepage?: string;
    github?: string;
    npm?: string;
    self?: string;
  };
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
};
