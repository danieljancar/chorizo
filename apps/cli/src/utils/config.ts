import fs from 'fs';
import path from 'path';

const CONFIG_FILE_NAME = 'chorizo.json';
const configPath = path.join(process.cwd(), CONFIG_FILE_NAME);

/**
 * Chorizo configuration setup
 * @param config
 * @returns void
 */
export function saveConfig(config: ChorizoConfig) {
  const configData = JSON.stringify(config, null, 2);
  fs.writeFileSync(configPath, configData);
  return;
}

/**
 * Check if the current directory is a project instance
 * @returns boolean
 */
export function isProjectInstance(): boolean {
  const projectConfigPath = path.join(process.cwd(), CONFIG_FILE_NAME);
  return fs.existsSync(projectConfigPath);
}
