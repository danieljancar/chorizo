import { useCallback } from 'react';
import { useDataEnhancementPlugin } from '@firecms/data_enhancement';
import { User as FirebaseUser } from 'firebase/auth';
import { Authenticator, FirebaseCMSApp } from 'firecms';
import 'typeface-rubik';
import '@fontsource/ibm-plex-mono';
import { firebaseConfig, metaConfig } from './config.ts';
import { usersCollection } from './collections/users/users.tsx';
import { coursesCollection } from './collections/courses/courses.tsx';
import { generalMainCollection } from './collections/general/general-main.tsx';
import { legalCollection } from './collections/legal/legal.tsx';

const rootCollections = [
  usersCollection,
  coursesCollection,
  generalMainCollection,
  legalCollection,
];

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, dataSource }) => {
      if (!user) {
        return false;
      }

      try {
        const userDocPath: string = `users/`;
        const [userDoc] = await Promise.all([
          dataSource.fetchEntity({
            path: userDocPath,
            entityId: user.uid,
            collection: usersCollection,
          }),
        ]);

        return !!(userDoc && userDoc.values.role === 'admin');
      } catch (error) {
        return false;
      }
    },
    [],
  );

  const dataEnhancementPlugin = useDataEnhancementPlugin({
    getConfigForPath: () => {
      return true;
    },
  });

  return (
    <FirebaseCMSApp
      logo={'/logo.png'}
      name={metaConfig.name}
      plugins={[dataEnhancementPlugin]}
      authentication={myAuthenticator}
      collections={rootCollections}
      firebaseConfig={firebaseConfig}
      signInOptions={['password']}
    />
  );
}
