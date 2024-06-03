import { isProjectInstance, saveConfig } from '../utils/config';
import inquirer from 'inquirer';
import logger from '../utils/logger';

export async function initProject() {
  if (isProjectInstance()) {
    console.warn(
      'Warning: This directory already appears to be a project instance.',
    );
    logger.warn('Project already initialized, skipping init.');
    return;
  }

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
  ];

  const answers = await inquirer.prompt(questions);

  const config: ChorizoConfig = {
    title: answers.title,
    description: answers.description,
    firebase: {
      apiKey: '',
      authDomain: '',
      projectId: '',
      storageBucket: '',
      messagingSenderId: '',
      appId: '',
    },
  };

  saveConfig(config);
  logger.info('Project initialized with config');
}
