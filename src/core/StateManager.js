import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();

export const BotState = {
  INITIALIZING: 'INITIALIZING',
  CONNECTING: 'CONNECTING',
  READY: 'READY',
  RECONNECTING: 'RECONNECTING',
  SHUTTING_DOWN: 'SHUTTING_DOWN',
  DISCONNECTED: 'DISCONNECTED', // Añadido el estado DISCONNECTED
};

class StateManager {
  static #instance;
  #state = BotState.INITIALIZING;

  constructor() {
    if (StateManager.#instance) {
      return StateManager.#instance;
    }
    StateManager.#instance = this;
  }

  static getInstance() {
    if (!StateManager.#instance) {
      StateManager.#instance = new StateManager();
    }
    return StateManager.#instance;
  }

  setState(newState) {
    if (Object.values(BotState).includes(newState)) {
      if (this.#state !== newState) {
        logger.info(`Estado del bot cambiado de ${this.#state} a ${newState}`);
        this.#state = newState;
        // Aquí se podría emitir un evento si usamos un EventBus
      }
    } else {
      logger.warn(`Intento de establecer un estado inválido: ${newState}`);
    }
  }

  getState() {
    return this.#state;
  }

  is(state) {
    return this.#state === state;
  }
}

// Exportar una única instancia (Singleton)
export default StateManager.getInstance();