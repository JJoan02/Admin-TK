export declare class ChatManager {
    #private;
    /**
     * @param {object} dbService - Instancia del servicio de base de datos.
     * @param {object} logger - Instancia del logger.
     * @param {object} errorHandler - Instancia del manejador de errores.
     * @param {object} eventStore - Instancia del EventStore.
     */
    constructor(dbService: any, logger: any, errorHandler: any, eventStore: any);
    /**
     * Obtiene los datos de un chat por su JID.
     * @param {string} jid - El JID del chat.
     * @returns {Promise<object>} - Datos del chat.
     */
    getChat(jid: any): Promise<any>;
    /**
     * Actualiza los datos de un chat en la base de datos y en memoria.
     * @param {string} jid - El JID del chat a actualizar.
     * @param {object} data - Un objeto con los campos a actualizar.
     * @returns {Promise<void>}
     */
    updateChat(jid: any, data: any): Promise<void>;
    /**
     * Elimina un chat de la base de datos y de la caché.
     * @param {string} jid - El JID del chat a eliminar.
     * @returns {Promise<void>}
     */
    removeChat(jid: any): Promise<void>;
    /**
     * Obtiene todos los chats de la base de datos.
     * @returns {Promise<Array<object>>}
     */
    getAllChats(): Promise<any>;
    setConversationState(jid: any, state: any): Promise<void>;
}
export default ChatManager;
//# sourceMappingURL=ChatManager.d.ts.map