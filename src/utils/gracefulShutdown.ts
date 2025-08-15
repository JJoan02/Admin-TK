// src/utils/gracefulShutdown.ts - Manejo de cierre graceful del sistema

import { logger } from './logger.js';

let isShuttingDown = false;
const shutdownCallbacks: Array<() => Promise<void>> = [];

export const addShutdownCallback = (callback: () => Promise<void>): void => {
  shutdownCallbacks.push(callback);
};

export const gracefulShutdown = async (signal: string): Promise<void> => {
  if (isShuttingDown) {
    logger.warn({ signal }, 'Shutdown already in progress, ignoring signal');
    return;
  }

  isShuttingDown = true;
  logger.info({ signal }, `🛑 Received ${signal}, starting graceful shutdown...`);

  try {
    // Ejecutar callbacks de cierre en orden inverso
    for (let i = shutdownCallbacks.length - 1; i >= 0; i--) {
      const callback = shutdownCallbacks[i];
      if (callback) {
        try {
          await callback();
        } catch (error) {
          logger.error({ error }, 'Error during shutdown callback');
        }
      }
    }

    logger.info('✅ Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    logger.error({ error }, '❌ Error during graceful shutdown');
    process.exit(1);
  }
};

export const registerShutdownHandlers = (): void => {
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon restart
};
