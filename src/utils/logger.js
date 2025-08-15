// src/utils/logger.js

import pino from 'pino';
import { EventEmitter } from 'events';

let globalLoggerInstance = null;
export const logEmitter = new EventEmitter(); // Exportar un emisor de eventos para logs
let isConsoleSilentMode = false; // Renombrado para mayor claridad

export function initializeLogger() {
  if (globalLoggerInstance) {
    return globalLoggerInstance;
  }

  const loggerOptions = {
    level: process.env.LOG_LEVEL || 'info',
  };

  const targets = [];

  // Salida a consola (pino-pretty para desarrollo, por defecto para producción)
  targets.push({
    target: 'pino-pretty',
    options: {
      colorize: true,
      ignore: 'pid,hostname,name,level,time',
    },
    level: loggerOptions.level,
  });

  // Log a archivo (pino-roll)
  if (process.env.NODE_ENV === 'production' || process.env.LOG_ROTATE === 'true') {
    targets.push({
      target: 'pino-roll',
      options: {
        file: process.env.LOG_FILE || 'logs/bot.log',
        frequency: process.env.LOG_FREQUENCY || 'daily',
        size: process.env.LOG_SIZE || '10m',
        maxHistory: process.env.LOG_MAX_HISTORY || '7d',
        compress: process.env.LOG_COMPRESS !== 'false',
      },
      level: loggerOptions.level,
    });
  }

  loggerOptions.transport = { targets };
  globalLoggerInstance = pino(loggerOptions);

  // Sobrescribir el método write para implementar el modo silencioso
  const originalWrite = globalLoggerInstance.write;
  globalLoggerInstance.write = function (obj) {
    // Si el modo silencioso está activo y el nivel del log es menor que error,
    // no lo escribimos en la consola (pero sí se emitirá al WebSocket).
    if (isConsoleSilentMode && obj.level < pino.levels.values.error) {
      // No llamar a originalWrite para suprimir la salida a consola
    } else {
      originalWrite.apply(this, [obj]);
    }

    // Emitir todos los logs a través del logEmitter para el dashboard web
    logEmitter.emit('log', {
      level: pino.levels.labels[obj.level],
      msg: obj.msg,
      time: obj.time,
    });
  };

  return globalLoggerInstance;
}

/**
 * Establece el modo silencioso para el logger de consola.
 * @param {boolean} silent - true para activar el modo silencioso, false para desactivar.
 */
export function setConsoleSilentMode(silent) {
  isConsoleSilentMode = silent;
}

// Inicializar el logger una vez cuando el módulo es importado
initializeLogger();
