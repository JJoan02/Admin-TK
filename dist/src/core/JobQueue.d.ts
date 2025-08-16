/**
 * Gestiona una cola de trabajos asíncrona para procesar tareas una por una.
 * Incluye reintentos, tiempos de espera y métricas.
 */
export declare class JobQueue {
    /**
     * @param {Function} processor - La función que se ejecutará para cada trabajo. Debe ser una función async que acepte un 'job' como argumento.
     * @param {object} options - Opciones de configuración para la cola.
     * @param {number} [options.maxRetries=3] - Número máximo de reintentos para un trabajo fallido.
     * @param {number} [options.jobTimeoutMs=60000] - Tiempo máximo en milisegundos que un trabajo puede tardar antes de ser marcado como TIMED_OUT.
     */
    constructor(processor: any, options?: {});
    /**
     * Añade un nuevo trabajo a la cola y comienza a procesar si no se está haciendo ya.
     * @param {any} payload - El dato o contexto del trabajo a procesar.
     */
    add(payload: any): void;
    /**
     * El motor de la cola. Procesa el siguiente trabajo si hay uno disponible y no se está procesando nada.
     * @private
     */
    _processNext(): Promise<void>;
    /**
     * Inicia el proceso de apagado elegante de la cola.
     * Espera a que el trabajo actual termine y no acepta nuevos trabajos.
     * @returns {Promise<void>} Una promesa que se resuelve cuando la cola está vacía y detenida.
     */
    stop(): Promise<unknown>;
    /**
     * Obtiene el número de trabajos pendientes en la cola.
     * @returns {number}
     */
    get pendingJobsCount(): any;
    /**
     * Comprueba si la cola está procesando un trabajo actualmente.
     * @returns {boolean}
     */
    get isCurrentlyProcessing(): any;
}
export default JobQueue;
//# sourceMappingURL=JobQueue.d.ts.map