// src/core/ShutdownManager.js

import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
import StateManager, { BotState } from './StateManager.js';

/**
 * Gestiona el proceso de apagado elegante de la aplicación.
 * Permite registrar funciones de limpieza para diferentes componentes.
 */
export class ShutdownManager {
  static #instance;
  #cleanupFunctions = [];

  constructor() {
    if (ShutdownManager.#instance) {
      return ShutdownManager.#instance;
    }
    ShutdownManager.#instance = this;
    logger.info('ShutdownManager inicializado.');
  }

  static getInstance() {
    if (!ShutdownManager.#instance) {
      ShutdownManager.#instance = new ShutdownManager();
    }
    return ShutdownManager.#instance;
  }

  /**
   * Registra una función de limpieza que se ejecutará durante el apagado.
   * @param {string} name - Nombre de la función de limpieza (para logging).
   * @param {Function} func - Función asíncrona de limpieza.
   */
  registerCleanupFunction(name, func) {
    this.#cleanupFunctions.push({ name, func });
    logger.debug(`Función de limpieza registrada: ${name}`);
  }

  /**
   * Inicia el proceso de apagado elegante.
   * @param {string} signal - La señal que inició el apagado (ej. 'SIGINT').
   * @returns {Promise<void>}
   */
  async shutdown(signal = 'unknown') {
    if (StateManager.is(BotState.SHUTTING_DOWN)) {
      logger.warn('⚠️ El proceso de apagado ya está en curso. Forzando salida...');
      process.exit(1);
    }
    StateManager.setState(BotState.SHUTTING_DOWN);
    logger.warn(`Señal de apagado recibida: ${signal}. Cerrando Admin-TK de forma segura...`);

    for (const { name, func } of this.#cleanupFunctions) {
      try {
        logger.info(`Ejecutando limpieza: ${name}...`);
        await func();
        logger.info(`✅ Limpieza ${name} completada.`);
      } catch (error) {
        logger.error({ err: error }, `❌ Error durante la limpieza de ${name}.`);
      }
    }

    logger.info('Apagado seguro completado. ¡Adiós!');
    process.exit(0);
  }
}

export default ShutdownManager.getInstance();