// src/utils/Cache.js

import { initializeLogger } from './logger.js';
const logger = initializeLogger();

class Cache {
  static #data = new Map(); // Map<key, { value: any, expiry: number }>

  /**
   * Almacena un valor en la caché.
   * @param {string} key - La clave para el valor.
   * @param {any} value - El valor a almacenar.
   * @param {number} ttl - Tiempo de vida en milisegundos (Time To Live).
   */
  static set(key, value, ttl) {
    const expiry = Date.now() + ttl;
    Cache.#data.set(key, { value, expiry });
    logger.debug(`Cache: '${key}' almacenado, expira en ${ttl / 1000}s.`);
  }

  /**
   * Obtiene un valor de la caché.
   * @param {string} key - La clave del valor.
   * @returns {any | undefined} El valor si existe y no ha expirado, de lo contrario undefined.
   */
  static get(key) {
    const entry = Cache.#data.get(key);
    if (!entry) {
      logger.debug(`Cache: '${key}' no encontrado.`);
      return undefined;
    }

    if (Date.now() > entry.expiry) {
      Cache.#data.delete(key); // Eliminar entrada expirada
      logger.debug(`Cache: '${key}' expirado y eliminado.`);
      return undefined;
    }

    logger.debug(`Cache: '${key}' encontrado.`);
    return entry.value;
  }

  /**
   * Comprueba si una clave existe en la caché y no ha expirado.
   * @param {string} key - La clave a comprobar.
   * @returns {boolean} True si la clave existe y es válida, de lo contrario false.
   */
  static has(key) {
    return Cache.get(key) !== undefined;
  }

  /**
   * Elimina una clave de la caché.
   * @param {string} key - La clave a eliminar.
   */
  static delete(key) {
    if (Cache.#data.delete(key)) {
      logger.debug(`Cache: '${key}' eliminado manualmente.`);
    }
  }

  /**
   * Limpia toda la caché.
   */
  static clear() {
    Cache.#data.clear();
    logger.info('Cache: Toda la caché ha sido limpiada.');
  }

  /**
   * Inicia un proceso de limpieza periódica de entradas expiradas.
   * @param {number} interval - Intervalo de limpieza en milisegundos.
   */
  static #cleanupIntervalId = null;

  /**
   * Inicia un proceso de limpieza periódica de entradas expiradas.
   * @param {number} interval - Intervalo de limpieza en milisegundos.
   */
  static startCleanup(interval = 3600000) { // Cada hora por defecto
    if (Cache.#cleanupIntervalId) {
      logger.warn('Cache: La limpieza automática ya está en ejecución.');
      return;
    }
    Cache.#cleanupIntervalId = setInterval(() => {
      const now = Date.now();
      let cleanedCount = 0;
      for (const [key, entry] of Cache.#data.entries()) {
        if (now > entry.expiry) {
          Cache.#data.delete(key);
          cleanedCount++;
        }
      }
      if (cleanedCount > 0) {
        logger.debug(`Cache: Limpieza automática. ${cleanedCount} entradas expiradas eliminadas.`);
      }
    }, interval);
    logger.info(`Cache: Limpieza automática programada cada ${interval / 1000}s.`);
  }

  /**
   * Detiene el proceso de limpieza periódica de la caché.
   */
  static stopCleanup() {
    if (Cache.#cleanupIntervalId) {
      clearInterval(Cache.#cleanupIntervalId);
      Cache.#cleanupIntervalId = null;
      logger.info('Cache: Limpieza automática detenida.');
    }
  }
}

export default Cache;
