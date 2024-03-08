# Developer Setup

This document describes how to setup your development environment for the packages and projects in this repository. As
stated, this repository contains multiple projects, also called monorepo.

# Prerequisites

- [Angular CLI](https://angular.dev)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [FireCMS](https://firecms.co)
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Yarn](https://yarnpkg.com/)

# Table of Contents

- [Setup](#setup)
- [Packages](#packages)
  - [Course](#course)
  - [AdminUI](#adminui)

# Setup

1. Clone the repository

```bash
git clone https://github.com/danieljancar/chorizo.git
```

2. Install root dependencies

```bash
npm install
```

# Packages

## Course

This Angular 17 project is the main application. It is a course management system that allows course creators to
successfully manage courses, invite students, provide course content, and more.

### Setup

1. Install dependencies

```bash
cd apps/course
npm install
```

2. Connect to Firebase

If you're an internal developer, you will get the credentials provided by the team. If you're an external developer,
you'll need to create your own Firebase project and connect it to the application.

3. Provide the environment variables

In `apps/course/src/environments`, create a file called `environment.ts` and `environment.development.ts` with the
following content:

```ts
export const environment = {
  production: false,
  metaConfig: {
    title: 'Chorizo Dev',
    description:
      'A versatile, open-source platform for interactive course management and learning experiences. Tailored for small-group instruction across various disciplines.',
  },
  firebaseConfig: {
    apiKey: 'your-api-key',
    authDomain: 'your-auth-domain',
    projectId: 'your-project-id',
    storageBucket: 'your-storage-bucket',
    messagingSenderId: 'your-messaging-sender-id',
    appId: 'your-app-id',
    measurementId: 'your-measurement-id',
  },
};
```

> **Note:** You can also use the `ng g environments` command to generate the environment files in the `apps/course`
> project.

4. Run the application

```bash
npm run start
```

## AdminUI

The AdminUI is made with FireCMS, a headless CMS for Firebase. It allows the team to manage the content of the website.

### Setup

> **Note:** The AdminUI uses **Yarn** as the package manager.

1. Install dependencies

```bash
cd apps/admin-ui
yarn
```

2. Connect to Firebase

If you're an internal developer, you will get the credentials provided by the team. If you're an external developer,
you'll need to create your own Firebase project and connect it to the application.

3. Provide the environment variables

In `apps/admin-ui/src`, create a `config.ts` file, you can copy the `config-example.ts` file and fill in your Firebase
credentials.

4. Run the application

```bash
yarn dev
```
