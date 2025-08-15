// src/utils/Correlation.js

import { v4 as uuidv4 } from 'uuid';
import { initializeLogger } from './logger.js';
const logger = initializeLogger();

class Correlation {
  static #activeCorrelations = new Map(); // Map<id, { startTime: number, context: any }>
  static #cleanupIntervalId = null;

  constructor() {
    // Iniciar la limpieza automática al instanciar la clase (o al importarla si es estática)
    // Para una clase estática, la inicialización se hace una vez.
    if (!Correlation.#cleanupIntervalId) {
      Correlation.startCleanup();
    }
  }

  /**
   * Inicia una nueva correlación y devuelve un ID único.
   * @param {object} [context={}] - Contexto adicional para la correlación.
   * @returns {string} El ID de correlación.
   */
  static start(context = {}) {
    const id = uuidv4();
    // Asegurar que el contexto sea un objeto válido
    const validContext = typeof context === 'object' && context !== null ? context : {};
    Correlation.#activeCorrelations.set(id, { startTime: Date.now(), context: validContext });
    logger.debug(`🔗 Correlación iniciada: ${id}`);
    return id;
  }

  /**
   * Finaliza una correlación y registra su duración.
   * @param {string} id - El ID de correlación a finalizar.
   */
  static end(id) {
    if (typeof id !== 'string' || id.trim() === '') {
      logger.warn('🔗 Intento de finalizar correlación con ID inválido.');
      return;
    }
    const correlation = Correlation.#activeCorrelations.get(id);
    if (correlation) {
      const duration = Date.now() - correlation.startTime;
      logger.debug(`🔗 Correlación finalizada: ${id} (Duración: ${duration}ms)`);
      Correlation.#activeCorrelations.delete(id);
    } else {
      logger.warn(`🔗 Correlación no encontrada al intentar finalizar: ${id}. Puede que ya haya terminado o el ID sea incorrecto.`);
    }
  }

  /**
   * Obtiene el contexto de una correlación activa.
   * @param {string} id - El ID de correlación.
   * @returns {object | undefined} El contexto de la correlación.
   */
  static getContext(id) {
    if (typeof id !== 'string' || id.trim() === '') {
      logger.warn('🔗 Intento de obtener contexto con ID inválido.');
      return undefined;
    }
    const correlation = Correlation.#activeCorrelations.get(id);
    return correlation ? correlation.context : undefined;
  }

  /**
   * Inicia el proceso de limpieza periódica de correlaciones antiguas.
   * @param {number} interval - Intervalo de limpieza en milisegundos (por defecto: 5 minutos).
   * @param {number} timeout - Tiempo máximo que una correlación puede estar activa antes de ser eliminada (por defecto: 10 minutos).
   */
  static startCleanup(interval = 300000, timeout = 600000) {
    if (typeof interval !== 'number' || interval <= 0 || typeof timeout !== 'number' || timeout <= 0) {
      logger.error('🔗 startCleanup llamado con parámetros de intervalo o timeout inválidos.');
      return;
    }

    if (Correlation.#cleanupIntervalId) {
      logger.warn('🔗 La limpieza de correlaciones ya está activa. Reiniciando...');
      clearInterval(Correlation.#cleanupIntervalId);
    }

    Correlation.#cleanupIntervalId = setInterval(() => {
      const now = Date.now();
      let cleanedCount = 0;
      for (const [id, correlation] of Correlation.#activeCorrelations.entries()) {
        if (now - correlation.startTime > timeout) {
          Correlation.#activeCorrelations.delete(id);
          logger.warn(`🔗 Correlación ${id} eliminada por timeout (duración: ${(now - correlation.startTime) / 1000}s).`);
          cleanedCount++;
        }
      }
      if (cleanedCount > 0) {
        logger.debug(`🔗 Limpieza de correlaciones. ${cleanedCount} entradas eliminadas.`);
      }
    }, interval);
    logger.info(`🔗 Limpieza automática de correlaciones programada cada ${interval / 1000}s.`);
  }

  /**
   * Detiene el proceso de limpieza periódica.
   */
  static stopCleanup() {
    if (Correlation.#cleanupIntervalId) {
      clearInterval(Correlation.#cleanupIntervalId);
      Correlation.#cleanupIntervalId = null;
      logger.info('🔗 Limpieza automática de correlaciones detenida.');
    } else {
      logger.warn('🔗 Se intentó detener la limpieza de correlaciones, pero no estaba activa.');
    }
  }
}

export default Correlation;
