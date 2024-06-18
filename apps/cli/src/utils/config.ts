import fs from 'fs';
import path from 'path';
import { ChorizoConfig } from '../types/config.types';

const CONFIG_FILE_NAME = 'chorizo.json';

/**
 * Chorizo configuration setup
 * @param config
 * @param projectDir
 * @returns void
 */
export function saveConfig(config: ChorizoConfig, projectDir: string) {
  const configPath = path.join(projectDir, 'chorizo.json');
  const configJSON = JSON.stringify(config, null, 2);
  fs.writeFileSync(configPath, configJSON, 'utf-8');
}

/**
 * Check if the current directory is a project instance
 * @returns boolean
 */
export function isProjectInstance(): boolean {
  const projectConfigPath = path.join(process.cwd(), CONFIG_FILE_NAME);
  return fs.existsSync(projectConfigPath);
}

/**
 * Get the project instance directory
 * @returns string
 */
export function getProjectInstanceDir(): string {
  return path.join(process.cwd());
}
