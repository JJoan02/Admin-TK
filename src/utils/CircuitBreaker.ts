// src/utils/CircuitBreaker.js

import { initializeLogger } from './logger.js';
const logger = initializeLogger();

const STATES = {
  CLOSED: 'CLOSED',   // Operaciones permitidas
  OPEN: 'OPEN',       // Operaciones bloqueadas, servicio inhabilitado
  HALF_OPEN: 'HALF_OPEN' // Permite algunas operaciones de prueba
};

export class CircuitBreaker {
  #state = STATES.CLOSED;
  #failureCount = 0;
  #lastFailureTime = 0;
  #options;
  #timeoutId = null;

  constructor(options = { failureThreshold: 5, cooldown: 30000 }) {
    this.#options = options;
    logger.info(`⚡ CircuitBreaker inicializado: Umbral de fallos  ${options.failureThreshold}, Cooldown ${options.cooldown / 1000}s.`);
  }

  /**
   * Ejecuta una función protegida por el Circuit Breaker.
   * @param {Function} func - La función a ejecutar.
   * @returns {Promise<any>} El resultado de la función.
   */
  async fire(func) {
    if (this.#state === STATES.OPEN) {
      if (Date.now() - this.#lastFailureTime > this.#options.cooldown) {
        this.#transitionToHalfOpen();
      } else {
        logger.warn('⚡ CircuitBreaker: Servicio en estado OPEN. Bloqueando petición.' );
        throw new Error('CircuitBreaker is OPEN. Service unavailable.');
      }
    }

    try {
      const result = await func();
      this.#onSuccess();
      return result;
    } catch (error) {
      this.#onFailure(error);
      throw error;
    }
  }

  /**
   * Comprueba si el Circuit Breaker está en estado CLOSED (operaciones permitidas).
   * @returns {boolean} True si está en CLOSED, false en caso contrario.
   */
  ok() {
    return this.#state === STATES.CLOSED || this.#state === STATES.HALF_OPEN;
  }

  #onSuccess() {
    if (this.#state === STATES.HALF_OPEN) {
      this.#transitionToClosed();
    }
    this.#failureCount = 0;
  }

  #onFailure(error) {
    this.#failureCount++;
    this.#lastFailureTime = Date.now();
    logger.error({ err: error }, `⚡ CircuitBreaker: Fallo detectado. Fallos consecutivos:  ${this.#failureCount}.`);

    if (this.#failureCount >= this.#options.failureThreshold && this.#state === STATES.CLOSED) {
      this.#transitionToOpen();
    }
  }

  #transitionToOpen() {
    this.#state = STATES.OPEN;
    logger.warn(`⚡ CircuitBreaker: Transición a estado OPEN. Servicio inhabilitado por  ${this.#options.cooldown / 1000}s.`);
    this.#timeoutId = setTimeout(() => {
      this.#transitionToHalfOpen();
    }, this.#options.cooldown);
  }

  #transitionToHalfOpen() {
    this.#state = STATES.HALF_OPEN;
    logger.info('⚡ CircuitBreaker: Transición a estado HALF_OPEN. Permitiendo peticiones de prueba.' );
    clearTimeout(this.#timeoutId);
    this.#timeoutId = null;
  }

  #transitionToClosed() {
    this.#state = STATES.CLOSED;
    this.#failureCount = 0;
    logger.info('⚡ CircuitBreaker: Transición a estado CLOSED. Servicio restaurado.' );
  }

  /**
   * Obtiene el estado actual del Circuit Breaker.
   * @returns {string} El estado actual (CLOSED, OPEN, HALF_OPEN).
   */
  getState() {
    return this.#state;
  }

  /**
   * Fuerza el Circuit Breaker a un estado específico (solo para pruebas).
   * @param {string} newState - El estado al que forzar (CLOSED, OPEN, HALF_OPEN).
   */
  forceState(newState) {
    if (Object.values(STATES).includes(newState)) {
      logger.warn(`⚡ CircuitBreaker: Forzando estado a  ${newState}.`);
      this.#state = newState;
      this.#failureCount = 0;
      clearTimeout(this.#timeoutId);
      this.#timeoutId = null;
    } else {
      logger.error(`⚡ CircuitBreaker: Estado inválido para forzar:  ${newState}.`);
    }
  }
}

export default CircuitBreaker;
