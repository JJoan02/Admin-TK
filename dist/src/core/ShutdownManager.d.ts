/**
 * Gestiona el proceso de apagado elegante de la aplicación.
 * Permite registrar funciones de limpieza para diferentes componentes.
 */
export declare class ShutdownManager {
    #private;
    constructor();
    static getInstance(): any;
    /**
     * Registra una función de limpieza que se ejecutará durante el apagado.
     * @param {string} name - Nombre de la función de limpieza (para logging).
     * @param {Function} func - Función asíncrona de limpieza.
     */
    registerCleanupFunction(name: any, func: any): void;
    /**
     * Inicia el proceso de apagado elegante.
     * @param {string} signal - La señal que inició el apagado (ej. 'SIGINT').
     * @returns {Promise<void>}
     */
    shutdown(signal?: string): Promise<void>;
}
declare const _default: any;
export default _default;
//# sourceMappingURL=ShutdownManager.d.ts.map