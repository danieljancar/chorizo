#!/bin/bash

# Install Dependencies
npm install && npm run install:all

# Run Lint
npm run lint

# Prepare Config for AdminUI
cp ./apps/admin-ui/src/config-example.ts ./apps/admin-ui/src/config.ts
sed -i "s|'your-api-key'|'$FIREBASE_API_KEY'|g" ./apps/admin-ui/src/config.ts
sed -i "s|'your-auth-domain.firebaseapp.com'|'$FIREBASE_AUTH_DOMAIN'|g" ./apps/admin-ui/src/config.ts
sed -i "s|'your-project-id'|'$FIREBASE_PROJECT_ID'|g" ./apps/admin-ui/src/config.ts
sed -i "s|'your-storage-bucket.appspot.com'|'$FIREBASE_STORAGE_BUCKET'|g" ./apps/admin-ui/src/config.ts
sed -i "s|'your-messaging-sender-id'|'$FIREBASE_MESSAGING_SENDER_ID'|g" ./apps/admin-ui/src/config.ts
sed -i "s|'your-app-id'|'$FIREBASE_APP_ID'|g" ./apps/admin-ui/src/config.ts

# Build AdminUI
npm run build:adminui:dev

# Create Environment Directory for Course App
mkdir -p ./apps/course/src/environments

# Populate environment.development.ts for Course App
cat <<EOF > ./apps/course/src/environments/environment.development.ts
export const environment = {
  production: false,
  metaConfig: {
    title: 'Chorizo Dev',
    description: 'A versatile, open-source platform for interactive course management and learning experiences. Tailored for small-group instruction across various disciplines.',
  },
  firebaseConfig: {
    apiKey: '$FIREBASE_API_KEY',
    authDomain: '$FIREBASE_AUTH_DOMAIN',
    projectId: '$FIREBASE_PROJECT_ID',
    storageBucket: '$FIREBASE_STORAGE_BUCKET',
    messagingSenderId: '$FIREBASE_MESSAGING_SENDER_ID',
    appId: '$FIREBASE_APP_ID',
    measurementId: '$FIREBASE_MEASUREMENT_ID'
  },
};
EOF

# Build Course App - Development
(cd ./apps/course && npm run build && cd ../..)

# Prepare Firebase Preview - Development
npm run preview:prepare:dev

# Deploy to Firebase - Development
npm run preview:deploy:dev
