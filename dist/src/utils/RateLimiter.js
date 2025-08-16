// src/utils/RateLimiter.js
import { initializeLogger } from './logger.js';
const logger = initializeLogger();
export class RateLimiter {
    #limits = new Map(); // Map<key, { count: number, lastReset: number } >
    #options;
    #cleanupIntervalId = null; // To store the interval ID
    constructor(options = {}) {
        // Establecer opciones por defecto y validarlas
        this.#options = {
            windowMs: typeof options.windowMs === 'number' && options.windowMs > 0 ? options.windowMs : 60000, // 1 minuto
            max: typeof options.max === 'number' && options.max > 0 ? options.max : 10, // 10 peticiones
            cleanupInterval: typeof options.cleanupInterval === 'number' && options.cleanupInterval > 0 ? options.cleanupInterval : 300000, // 5 minutos
            idleTimeoutMultiplier: typeof options.idleTimeoutMultiplier === 'number' && options.idleTimeoutMultiplier > 0 ? options.idleTimeoutMultiplier : 2, // 2 veces el windowMs
        };
        logger.info(`⏱️ RateLimiter inicializado: ${this.#options.max} peticiones cada ${this.#options.windowMs / 1000}s.`);
        this.startCleanup(); // Iniciar limpieza automáticamente
    }
    /**
     * Consume una petición para una clave dada.
     * @param {string} key - La clave para la que se aplica el límite (ej. JID del usuario).
     * @returns {Promise<void>} Resuelve si la petición es permitida, rechaza si excede el límite.
     */
    async consume(key) {
        return new Promise((resolve, reject) => {
            const now = Date.now();
            let entry = this.#limits.get(key);
            if (!entry) {
                entry = { count: 0, lastReset: now }; // No need for 'timer' if we use periodic cleanup
                this.#limits.set(key, entry);
            }
            // Reiniciar el contador si la ventana de tiempo ha pasado
            if (now - entry.lastReset > this.#options.windowMs) {
                entry.count = 0;
                entry.lastReset = now;
            }
            entry.count++;
            if (entry.count > this.#options.max) {
                const timeLeft = (entry.lastReset + this.#options.windowMs - now) / 1000;
                logger.warn(`⚠️ Rate limit excedido para ${key}. Intentos: ${entry.count}/${this.#options.max}. Tiempo restante: ${timeLeft.toFixed(1)}s.`);
                return reject(new Error(`Rate limit exceeded. Try again in ${timeLeft.toFixed(1)} seconds.`));
            }
            logger.debug(`Rate limit para ${key}: ${entry.count}/${this.#options.max}`);
            resolve();
        });
    }
    /**
     * Limpia las entradas de un usuario específico.
     * @param {string} key - La clave del usuario.
     */
    reset(key) {
        if (this.#limits.has(key)) {
            this.#limits.delete(key);
            logger.debug(`Rate limit reseteado para ${key}.`);
        }
    }
    /**
     * Inicia el proceso de limpieza periódica de entradas inactivas.
     * @param {number} [cleanupInterval] - Intervalo de limpieza en milisegundos.
     * @param {number} [idleTimeoutMultiplier] - Multiplicador para determinar el tiempo de inactividad antes de eliminar.
     */
    startCleanup(cleanupInterval = this.#options.cleanupInterval, idleTimeoutMultiplier = this.#options.idleTimeoutMultiplier) {
        if (this.#cleanupIntervalId) {
            clearInterval(this.#cleanupIntervalId);
        }
        this.#cleanupIntervalId = setInterval(() => {
            const now = Date.now();
            let cleanedCount = 0;
            const idleTimeout = this.#options.windowMs * idleTimeoutMultiplier;
            for (const [key, entry] of this.#limits.entries()) {
                // If the entry hasn't been reset (i.e., accessed) for a long time, remove it
                if (now - entry.lastReset > idleTimeout) {
                    this.#limits.delete(key);
                    cleanedCount++;
                }
            }
            if (cleanedCount > 0) {
                logger.debug(`RateLimiter: Limpieza automática. ${cleanedCount} entradas inactivas eliminadas.`);
            }
        }, cleanupInterval);
        logger.info(`RateLimiter: Limpieza automática programada cada ${cleanupInterval / 1000}s.`);
    }
    /**
     * Detiene el proceso de limpieza periódica.
     */
    stopCleanup() {
        if (this.#cleanupIntervalId) {
            clearInterval(this.#cleanupIntervalId);
            this.#cleanupIntervalId = null;
            logger.info('RateLimiter: Limpieza automática detenida.');
        }
    }
}
export default RateLimiter;
//# sourceMappingURL=RateLimiter.js.map