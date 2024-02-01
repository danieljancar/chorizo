# Developer Setup

This document describes how to setup your development environment for the packages and projects in this repository. As
stated, this repository contains multiple projects, also called monorepo.

## Prerequisites

- [Angular CLI](https://angular.dev)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [FireCMS](https://firecms.co)
- [Node.js](https://nodejs.org/en/)
- [Git](https://git-scm.com/)

# Setup

1. Clone the repository

```bash
git clone https://github.com/danieljancar/chorizo.git
```

2. Install root dependencies

```bash
npm install
```

# Projects

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
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
};
```

> **Note:** You can also use the `ng g environments` command to generate the environment files in the `apps/course`
> project.

4. Run the application

```bash
npm run start
```

