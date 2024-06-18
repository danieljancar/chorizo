export type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

export type ChorizoConfig = {
  title: string;
  description: string;
  projectName: string;
  firebase: FirebaseConfig;
};
