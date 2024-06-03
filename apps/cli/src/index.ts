#!/usr/bin/env ts-node

import { Command } from 'commander';
import { initProject } from './commands/init';

const program = new Command();

program.version('0.0.1').description('CLI for managing Chorizo instances');

program
  .command('init')
  .description('Initialize a new Chorizo project')
  .action(initProject);

program.parse(process.argv);
