import winston from 'winston';
import path from 'path';
import fs from 'fs';
import { isProjectInstance } from './config';

const logDirectory = process.cwd();
const logPath = path.join(logDirectory, 'cli.log');

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

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
  transports: [new winston.transports.File({ filename: logPath })],
});

/**
 * A simple logger that logs to a file.
 * @returns void
 * @example
 * logger.info('Project initialized with config');
 */
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
      baseLogger.error(message, ...meta);
    }
  },
};

export default logger;
