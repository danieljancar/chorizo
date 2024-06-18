import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { getProjectInstanceDir, isProjectInstance } from './config';

const baseLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  defaultMeta: { service: 'chorizo-cli', path: process.cwd() },
});

const logger = {
  /**
   * Logs an info message.
   * @param message
   * @param meta
   * @returns void
   * @example
   * logger.info('Project initialized with config');
   */
  info: (message: string, ...meta: any[]) => {
    if (isProjectInstance()) {
      const projectDir = getProjectInstanceDir();
      const logPath = path.join(projectDir, 'cli.log');
      if (!fs.existsSync(logPath)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }
      baseLogger.add(new winston.transports.File({ filename: logPath }));
      baseLogger.info(message, ...meta);
    }
  },
  /**
   * Logs a warning message.
   * @param message
   * @param meta
   * @returns void
   * @example
   * logger.warn('Project already initialized, skipping init.');
   */
  warn: (message: string, ...meta: any[]) => {
    if (isProjectInstance()) {
      const projectDir = getProjectInstanceDir();
      const logPath = path.join(projectDir, 'cli.log');
      if (!fs.existsSync(logPath)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }
      baseLogger.add(new winston.transports.File({ filename: logPath }));
      baseLogger.warn(message, ...meta);
    }
  },
  /**
   * Logs an error message.
   * @param message
   * @param meta
   * @returns void
   * @example
   * logger.error('Failed to initialize project');
   */
  error: (message: string, ...meta: any[]) => {
    if (isProjectInstance()) {
      const projectDir = getProjectInstanceDir();
      const logPath = path.join(projectDir, 'cli.log');
      if (!fs.existsSync(logPath)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }
      baseLogger.add(new winston.transports.File({ filename: logPath }));
      baseLogger.error(message, ...meta);
    }
  },
};

export default logger;
