export declare class DBService {
    #private;
    /**
     * Inicializa el servicio de base de datos, estableciendo la conexión.
     * Este método debe ser llamado una sola vez al arrancar la aplicación.
     * @returns {Promise<void>}
     */
    static init(): Promise<void>;
    /**
     * Devuelve la instancia de la base de datos activa.
     * Los Managers (User , Group, Chat) usarán esto para leer y escribir datos.
     * @returns {import('lowdb').Low<object> | import('mongoose').Connection | import('sqlite').Database}
     */
    static getDB(): never;
    /**
     * Cierra la conexión a la base de datos.
     * Se llama durante el apagado seguro de la aplicación.
     * @returns {Promise<void>}
     */
    static close(): Promise<void>;
    /**
     * Devuelve la ruta del archivo de la base de datos (solo para LowDB o SQLite).
     * @returns {string}
     */
    static get dbPath(): string;
}
export default DBService;
//# sourceMappingURL=DBService.d.ts.map