import { Timestamp } from 'firebase/firestore';

export type User = {
  id: string;
  email: string;
  username: string;
  password?: string;
  role: 'user' | 'admin' | undefined;
  name?: string;
  avatar?: string;
  bio?: string;
  links?: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};
