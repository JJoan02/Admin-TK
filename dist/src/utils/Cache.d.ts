export declare class Cache {
    #private;
    /**
     * Almacena un valor en la caché.
     * @param {string} key - La clave para el valor.
     * @param {any} value - El valor a almacenar.
     * @param {number} ttl - Tiempo de vida en milisegundos (Time To Live).
     */
    static set(key: any, value: any, ttl: any): void;
    /**
     * Obtiene un valor de la caché.
     * @param {string} key - La clave del valor.
     * @returns {any | undefined} El valor si existe y no ha expirado, de lo contrario undefined.
     */
    static get(key: any): any;
    /**
     * Comprueba si una clave existe en la caché y no ha expirado.
     * @param {string} key - La clave a comprobar.
     * @returns {boolean} True si la clave existe y es válida, de lo contrario false.
     */
    static has(key: any): boolean;
    /**
     * Elimina una clave de la caché.
     * @param {string} key - La clave a eliminar.
     */
    static delete(key: any): void;
    /**
     * Limpia toda la caché.
     */
    static clear(): void;
    /**
     * Inicia un proceso de limpieza periódica de entradas expiradas.
     * @param {number} interval - Intervalo de limpieza en milisegundos.
     */
    static startCleanup(interval?: number): void;
    /**
     * Detiene el proceso de limpieza periódica de la caché.
     */
    static stopCleanup(): void;
}
export default Cache;
//# sourceMappingURL=Cache.d.ts.map