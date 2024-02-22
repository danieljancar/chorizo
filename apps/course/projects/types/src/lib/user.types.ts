import { Timestamp } from 'firebase/firestore';

export type User = {
  id: string;
  email: string;
  username: string;
  password?: string;
  name?: string;
  avatar?: string;
  bio?: string;
  links?: string[];
  tags?: string[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
};
