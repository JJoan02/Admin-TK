// src/core/EventBus.js
import { EventEmitter } from 'events';
import { initializeLogger } from '../utils/logger.js';
const logger = initializeLogger();
class EventBus extends EventEmitter {
    static #instance;
    constructor() {
        super();
        if (EventBus.#instance) {
            return EventBus.#instance;
        }
        EventBus.#instance = this;
    }
    static getInstance() {
        if (!EventBus.#instance) {
            EventBus.#instance = new EventBus();
        }
        return EventBus.#instance;
    }
    emit(event, ...args) {
        logger.debug({ event, args }, `Evento emitido: ${event}`);
        return super.emit(event, ...args);
    }
}
export default EventBus.getInstance();
//# sourceMappingURL=EventBus.js.map