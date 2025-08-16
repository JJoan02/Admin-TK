export declare class UserManager {
    #private;
    /**
     * @param {object} config - Objeto de configuración.
     * @param {object} dbService - Instancia del servicio de base de datos.
     * @param {object} logger - Instancia del logger.
     * @param {object} eventStore - Instancia del EventStore.
     */
    constructor(config: any, dbService: any, logger: any, eventStore: any);
    /**
     * Obtiene los datos de un usuario por su JID.
     * @param {string} jid - El JID del usuario.
     * @param {string} pushName - El nombre de usuario para mostrar.
     * @returns {Promise<object>} - Datos del usuario.
     */
    getUser(jid: any, pushName: any): Promise<any>;
    /**
     * Actualiza los datos de un usuario en la base de datos y en memoria.
     * @param {string} jid - El JID del usuario.
     * @param {object} data - Un objeto con los campos a actualizar.
     * @returns {Promise<void>}
     */
    updateUser(jid: any, data: any): Promise<void>;
    /**
     * Incrementa el conteo de comandos ejecutados por un usuario.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<void>}
     */
    incrementCommandCount(jid: any): Promise<void>;
    /**
     * Marca a un usuario como baneado.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<void>}
     */
    banUser(jid: any): Promise<void>;
    /**
     * Desbaneado a un usuario.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<void>}
     */
    unbanUser(jid: any): Promise<void>;
    /**
     * Obtiene el conteo de comandos ejecutados por un usuario.
     * @param {string} jid - El JID del usuario.
     * @returns {Promise<number>} - Conteo de comandos.
     */
    getCommandCount(jid: any): Promise<any>;
    /**
     * Obtiene todos los usuarios de la base de datos.
     * @returns {Promise<Array<object>>}
     */
    getAllUsers(): Promise<any>;
}
export default UserManager;
//# sourceMappingURL=UserManager.d.ts.map