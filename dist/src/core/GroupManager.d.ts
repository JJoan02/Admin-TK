export declare class GroupManager {
    #private;
    /**
     * @param {object} dbService - Instancia del servicio de base de datos.
     * @param {object} logger - Instancia del logger.
     * @param {object} errorHandler - Instancia del manejador de errores.
     * @param {object} eventStore - Instancia del EventStore.
     */
    constructor(dbService: any, logger: any, errorHandler: any, eventStore: any);
    /**
     * Obtiene los datos de un grupo por su JID.
     * @param {string} jid - El JID del grupo.
     * @param {object} [metadata={}] - Metadatos del grupo de Baileys (usado para crear si no existe).
     * @returns {Promise<object>} - Datos del grupo.
     */
    getGroup(jid: any, metadata?: {}): Promise<any>;
    /**
     * Actualiza los datos de un grupo en la base de datos y en memoria.
     * @param {string} jid - El JID del grupo a actualizar.
     * @param {object} data - Un objeto con los campos a actualizar.
     * @returns {Promise<void>}
     */
    updateGroup(jid: any, data: any): Promise<void>;
    /**
     * Elimina un grupo de la base de datos y de la caché.
     * @param {string} jid - El JID del grupo a eliminar.
     * @returns {Promise<void>}
     */
    removeGroup(jid: any): Promise<void>;
    /**
     * Obtiene todos los grupos de la base de datos.
     * @returns {Promise<Array<object>>}
     */
    getAllGroups(): Promise<any>;
    /**
     * Sincroniza los metadatos de un grupo con la base de datos y la caché.
     * @param {string} jid - El JID del grupo.
     * @param {object} metadata - Los metadatos del grupo de Baileys.
     * @returns {Promise<void>}
     */
    syncGroup(jid: any, metadata: any): Promise<void>;
}
export default GroupManager;
//# sourceMappingURL=GroupManager.d.ts.map