// src/utils/logger.ts - Sistema de logging avanzado

import pino from 'pino';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

// Crear directorio de logs si no existe
const logsDir = join(process.cwd(), 'storage', 'logs');
if (!existsSync(logsDir)) {
  mkdirSync(logsDir, { recursive: true });
}

// Configuración del logger
const loggerConfig: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
  ...(process.env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'yyyy-mm-dd HH:MM:ss',
        ignore: 'pid,hostname',
      },
    }
  }),
};

// Crear streams para diferentes niveles de log
const streams = [
  {
    level: 'info',
    stream: createWriteStream(join(logsDir, 'app.log'), { flags: 'a' }),
  },
  {
    level: 'error',
    stream: createWriteStream(join(logsDir, 'error.log'), { flags: 'a' }),
  },
  {
    level: 'debug',
    stream: createWriteStream(join(logsDir, 'debug.log'), { flags: 'a' }),
  },
];

// Crear logger principal
export const logger = pino(loggerConfig, pino.multistream(streams));

// Logger específico para diferentes módulos
export const createModuleLogger = (module: string) => {
  return logger.child({ module });
};

// Función para inicializar el logger (compatibilidad con código existente)
export const initializeLogger = () => {
  return logger;
};

// Control de modo silencioso
let silentMode = false;

export const setConsoleSilentMode = (silent: boolean) => {
  silentMode = silent;
  if (silent) {
    // Redirigir console.log a logger en modo silencioso
    console.log = (...args) => logger.info(args.join(' '));
    console.error = (...args) => logger.error(args.join(' '));
    console.warn = (...args) => logger.warn(args.join(' '));
  } else {
    // Restaurar console original
    console.log = process.stdout.write.bind(process.stdout);
    console.error = process.stderr.write.bind(process.stderr);
    console.warn = process.stderr.write.bind(process.stderr);
  }
};

// Función para logging de eventos del sistema
export const logSystemEvent = (event: string, data: any, level: 'info' | 'warn' | 'error' = 'info') => {
  logger[level]({
    event,
    data,
    timestamp: new Date().toISOString(),
    type: 'system_event'
  }, `System Event: ${event}`);
};

// Función para logging de comandos
export const logCommand = (command: string, user: string, group?: string, success: boolean = true) => {
  logger.info({
    command,
    user,
    group,
    success,
    timestamp: new Date().toISOString(),
    type: 'command_execution'
  }, `Command executed: ${command} by ${user}`);
};

// Función para logging de errores de plugins
export const logPluginError = (pluginName: string, error: Error, context?: any) => {
  logger.error({
    plugin: pluginName,
    error: {
      message: error.message,
      stack: error.stack,
      name: error.name
    },
    context,
    timestamp: new Date().toISOString(),
    type: 'plugin_error'
  }, `Plugin Error in ${pluginName}: ${error.message}`);
};

// Función para logging de API requests
export const logAPIRequest = (method: string, path: string, user?: string, responseTime?: number, statusCode?: number) => {
  logger.info({
    method,
    path,
    user,
    responseTime,
    statusCode,
    timestamp: new Date().toISOString(),
    type: 'api_request'
  }, `API ${method} ${path} - ${statusCode} (${responseTime}ms)`);
};

export default logger;
