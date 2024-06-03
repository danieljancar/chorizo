type FirebaseConfig = {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
};

type ChorizoConfig = {
  title: string;
  description: string;
  firebase: FirebaseConfig;
};
