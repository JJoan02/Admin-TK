export declare class RateLimiter {
    #private;
    constructor(options?: {});
    /**
     * Consume una petición para una clave dada.
     * @param {string} key - La clave para la que se aplica el límite (ej. JID del usuario).
     * @returns {Promise<void>} Resuelve si la petición es permitida, rechaza si excede el límite.
     */
    consume(key: any): Promise<unknown>;
    /**
     * Limpia las entradas de un usuario específico.
     * @param {string} key - La clave del usuario.
     */
    reset(key: any): void;
    /**
     * Inicia el proceso de limpieza periódica de entradas inactivas.
     * @param {number} [cleanupInterval] - Intervalo de limpieza en milisegundos.
     * @param {number} [idleTimeoutMultiplier] - Multiplicador para determinar el tiempo de inactividad antes de eliminar.
     */
    startCleanup(cleanupInterval?: any, idleTimeoutMultiplier?: any): void;
    /**
     * Detiene el proceso de limpieza periódica.
     */
    stopCleanup(): void;
}
export default RateLimiter;
//# sourceMappingURL=RateLimiter.d.ts.map