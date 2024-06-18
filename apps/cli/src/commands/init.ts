import inquirer from 'inquirer';
import logger from '../utils/logger';
import { ChorizoConfig } from '../types/config.types';
import path from 'path';
import fs from 'fs';
import spacer from '../utils/spacer';
import { execSync } from 'child_process';
import { randomBytes } from 'crypto';
import { saveConfig } from '../utils/config';

export async function initProject() {
  if (isProjectInstance()) {
    spacer(0.5);
    console.warn(
      '⚠️ Warning: This directory already appears to be a project instance.',
    );
    spacer(0.5);
    logger.warn('Project already initialized, skipping init.');
    return;
  }

  if (!isFirebaseCLIInstalled()) {
    console.error(
      'Firebase CLI is not installed. Please install it before running this command.',
    );
    logger.error('Firebase CLI is not installed.');
    return;
  }

  let answers;
  try {
    answers = await promptUserForProjectDetails();
  } catch (error) {
    console.error('Failed to get user input:', error);
    logger.error('Failed to get user input.');
    return;
  }

  const config: ChorizoConfig = {
    title: answers.title,
    description: answers.description,
    projectName: answers.projectName,
    firebase: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    },
  };

  try {
    await initializeFirebaseProject(config);

    const projectDir = path.join(
      process.cwd(),
      `chorizo-${config.projectName.toLowerCase().replace(/\s+/g, '-')}`,
    );
    if (!fs.existsSync(projectDir)) {
      fs.mkdirSync(projectDir, { recursive: true });
    }

    process.chdir(projectDir);

    saveConfig(config, projectDir); // Pass projectDir to saveConfig
    spacer(0.5);
    console.log('🎉 Project initialized successfully.');
    spacer(0.5);
    logger.info('Project initialized successfully.');
  } catch (error) {
    console.error('Failed to initialize project:', error);
    logger.error('Failed to initialize project.');
    logger.error(error instanceof Error ? error.message : String(error));
  }
}

function isProjectInstance(): boolean {
  const projectConfigPath = path.join(process.cwd(), 'chorizo.json');
  return fs.existsSync(projectConfigPath);
}

function isFirebaseCLIInstalled(): boolean {
  try {
    execSync('firebase --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

async function promptUserForProjectDetails() {
  const questions = [
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the project:',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description:',
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the project name (used for directory):',
    },
  ];

  return inquirer.prompt(questions);
}

async function initializeFirebaseProject(config: ChorizoConfig) {
  try {
    console.log('🔑 Logging into Firebase...');
    execSync('firebase login', { stdio: 'inherit' });

    console.log('🚀 Creating Firebase project...');
    const projectId = await createFirebaseProject(config.projectName);
    config.firebase.projectId = projectId; // Assign projectId here

    const { appId } = await createFirebaseWebApp(projectId, config.projectName);
    config.firebase.appId = appId; // Assign appId

    const firebaseConfig = await retrieveFirebaseConfig(projectId);
    config.firebase = { ...config.firebase, ...firebaseConfig }; // Merge configs

    await promptUserToActivateServices(projectId);

    saveConfig(config, process.cwd()); // Save the complete configuration

    spacer(0.5);
    console.log('🎉 Firebase project initialized successfully.');
    spacer(0.5);
    logger.info('Firebase project initialized successfully.');
  } catch (error) {
    console.error('❌ Failed to initialize Firebase project:', error);
    logger.error('Failed to initialize Firebase project.');
    logger.error(error instanceof Error ? error.message : String(error));
  }
}

async function createFirebaseProject(projectName: string): Promise<string> {
  const projectId = generateRandomProjectId();
  const createProjectCmd = `firebase projects:create ${projectId} --display-name="${projectName}"`;
  execSync(createProjectCmd, { stdio: 'inherit' });
  return projectId;
}

async function promptUserToActivateServices(projectId: string) {
  spacer(0.5);
  console.log(
    'Before continuing, please manually activate the following Firebase services:',
  );
  console.log(
    `1. Firestore: Visit https://console.firebase.google.com/project/${projectId}/firestore and create the Firestore database.`,
  );
  console.log(
    `2. Hosting: Visit https://console.firebase.google.com/project/${projectId}/hosting and set up Firebase Hosting.`,
  );
  console.log(
    `3. Storage: Visit https://console.firebase.google.com/project/${projectId}/storage and set up Firebase Storage.`,
  );
  console.log(
    `4. Authentication: Visit https://console.firebase.google.com/project/${projectId}/authentication and set up Firebase Authentication. Please enable only Email/Password authentication.`,
  );

  await waitForUserConfirmation();
}

function waitForUserConfirmation() {
  return new Promise<void>((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'continue',
          message:
            'Once Firestore, Hosting, Storage, and Authentication are set up, press Enter to continue.',
        },
      ])
      .then((answers) => {
        if (answers.continue) {
          resolve();
        } else {
          console.log(
            'Please activate Firestore, Hosting, Storage, and Authentication.',
          );
          waitForUserConfirmation().then(resolve);
        }
      })
      .catch(reject);
  });
}

async function retrieveFirebaseConfig(projectId: string): Promise<any> {
  console.log('🔍 Retrieving Firebase configuration...');
  const appListCmd = `firebase apps:list --project ${projectId} --json`;

  try {
    const appListOutput = execSync(appListCmd, { stdio: 'pipe' }).toString();
    const appList = JSON.parse(appListOutput);

    if (appList.result.length > 0) {
      const firebaseApp = appList.result[0];
      return {
        apiKey: firebaseApp.apiKey,
        authDomain: firebaseApp.authDomain,
        projectId: firebaseApp.projectId,
        storageBucket: firebaseApp.storageBucket,
        messagingSenderId: firebaseApp.messagingSenderId,
        appId: firebaseApp.appId,
      };
    } else {
      throw new Error('Firebase app configuration not found.');
    }
  } catch (error) {
    console.error('Error retrieving Firebase configuration:', error);
    throw new Error('Failed to retrieve Firebase configuration.');
  }
}

async function createFirebaseWebApp(
  projectId: string,
  appName: string,
): Promise<{ appId: string }> {
  console.log(`📱 Creating Firebase Web App for project ${projectId}...`);
  const createAppCmd = `firebase apps:create web --project ${projectId} ${appName}`;
  execSync(createAppCmd, { stdio: 'inherit' });

  const appListCmd = `firebase apps:list --project ${projectId} --json`;
  const appListOutput = execSync(appListCmd, { stdio: 'pipe' }).toString();
  const appList = JSON.parse(appListOutput);

  const appId = appList.result[0].appId;

  console.log(`📱 Firebase Web App symlinked with App ID: ${appId}`);

  return { appId };
}

function generateRandomProjectId(): string {
  const randomString = randomBytes(12).toString('hex');
  return `cli-${randomString}`;
}
