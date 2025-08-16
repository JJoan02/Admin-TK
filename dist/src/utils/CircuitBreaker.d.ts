export declare class CircuitBreaker {
    #private;
    constructor(options?: {
        failureThreshold: number;
        cooldown: number;
    });
    /**
     * Ejecuta una función protegida por el Circuit Breaker.
     * @param {Function} func - La función a ejecutar.
     * @returns {Promise<any>} El resultado de la función.
     */
    fire(func: any): Promise<any>;
    /**
     * Comprueba si el Circuit Breaker está en estado CLOSED (operaciones permitidas).
     * @returns {boolean} True si está en CLOSED, false en caso contrario.
     */
    ok(): boolean;
    /**
     * Obtiene el estado actual del Circuit Breaker.
     * @returns {string} El estado actual (CLOSED, OPEN, HALF_OPEN).
     */
    getState(): string;
    /**
     * Fuerza el Circuit Breaker a un estado específico (solo para pruebas).
     * @param {string} newState - El estado al que forzar (CLOSED, OPEN, HALF_OPEN).
     */
    forceState(newState: any): void;
}
export default CircuitBreaker;
//# sourceMappingURL=CircuitBreaker.d.ts.map