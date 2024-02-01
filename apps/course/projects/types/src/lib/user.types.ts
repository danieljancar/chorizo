export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  links?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
};
