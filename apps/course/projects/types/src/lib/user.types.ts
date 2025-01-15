import { Timestamp } from 'firebase/firestore';

export type User = {
  id: string;
  email: string;
  username: string;
  password?: string;
  role: UserRole | undefined;
  name?: string;
  avatar?: string;
  bio?: string;
  links?: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
