export declare class Correlation {
    #private;
    constructor();
    /**
     * Inicia una nueva correlación y devuelve un ID único.
     * @param {object} [context={}] - Contexto adicional para la correlación.
     * @returns {string} El ID de correlación.
     */
    static start(context?: {}): any;
    /**
     * Finaliza una correlación y registra su duración.
     * @param {string} id - El ID de correlación a finalizar.
     */
    static end(id: any): void;
    /**
     * Obtiene el contexto de una correlación activa.
     * @param {string} id - El ID de correlación.
     * @returns {object | undefined} El contexto de la correlación.
     */
    static getContext(id: any): any;
    /**
     * Inicia el proceso de limpieza periódica de correlaciones antiguas.
     * @param {number} interval - Intervalo de limpieza en milisegundos (por defecto: 5 minutos).
     * @param {number} timeout - Tiempo máximo que una correlación puede estar activa antes de ser eliminada (por defecto: 10 minutos).
     */
    static startCleanup(interval?: number, timeout?: number): void;
    /**
     * Detiene el proceso de limpieza periódica.
     */
    static stopCleanup(): void;
}
export default Correlation;
//# sourceMappingURL=Correlation.d.ts.map