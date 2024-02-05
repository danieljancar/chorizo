export type User = {
  id: string;
  email: string;
  password: string;
  name?: string;
  username?: string;
  avatar?: string;
  bio?: string;
  links?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt?: Date;
};
