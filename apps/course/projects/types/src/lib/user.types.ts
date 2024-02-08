import { Timestamp } from 'firebase/firestore';

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
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};
