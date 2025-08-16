export declare class MemoryService {
    #private;
    /**
     * @param {object} dbService - Instancia del servicio de base de datos principal (para obtener la instancia de DB).
     * @param {object} logger - Instancia del logger.
     * @param {object} errorHandler - Instancia del manejador de errores.
     */
    constructor(dbService: any, logger: any, errorHandler: any);
    static getInstance(dbService: any, logger: any, errorHandler: any): null;
    /**
     * Inicializa la conexión a la base de datos de la IA y crea las tablas si no existen.
     * @returns {Promise<void>}
     */
    init(): Promise<void>;
    /**
     * Añade una interacción (mensaje) al historial de la IA.
     * @param {object} interactionData - Datos de la interacción.
     * @param {string} interactionData.user_jid - JID del usuario.
     * @param {string} [interactionData.user_name] - Nombre del usuario.
     * @param {string} interactionData.chat_id - JID del chat.
     * @param {string} [interactionData.chat_name] - Nombre del chat.
     * @param {string} [interactionData.message_id] - ID del mensaje.
     * @param {string} [interactionData.message_text] - Contenido del mensaje.
     * @param {boolean} interactionData.is_from_bot - Si el mensaje es del bot.
     * @param {object} [interactionData.context_json] - Contexto adicional en formato JSON.
     * @returns {Promise<void>}
     */
    addInteraction({ user_jid, user_name, chat_id, chat_name, message_id, message_text, is_from_bot, context_json }: {
        user_jid: any;
        user_name: any;
        chat_id: any;
        chat_name: any;
        message_id: any;
        message_text: any;
        is_from_bot: any;
        context_json?: {} | undefined;
    }): Promise<void>;
    /**
     * Obtiene las últimas interacciones de un chat específico.
     * @param {string} chat_id - JID del chat.
     * @param {number} limit - Número máximo de interacciones a recuperar.
     * @returns {Promise<Array<object>>}
     */
    getRecentInteractions(chat_id: any, limit?: number): Promise<any>;
    /**
     * Añade un hecho a la base de conocimiento de la IA.
     * @param {object} factData - Datos del hecho.
     * @param {string} factData.fact_text - El texto del hecho.
     * @param {string} [factData.added_by_jid] - JID de quien añadió el hecho.
     * @param {string} [factData.added_by_name] - Nombre de quien añadió el hecho.
     * @param {string} [factData.source_chat_id] - JID del chat de origen.
     * @param {string} [factData.source_message_id] - ID del mensaje de origen.
     * @returns {Promise<void>}
     */
    addFact({ fact_text, added_by_jid, added_by_name, source_chat_id, source_message_id }: {
        fact_text: any;
        added_by_jid: any;
        added_by_name: any;
        source_chat_id: any;
        source_message_id: any;
    }): Promise<void>;
    /**
     * Busca hechos relevantes en la base de conocimiento por palabra clave.
     * @param {string} keyword - Palabra clave para buscar.
     * @param {number} limit - Número máximo de hechos a recuperar.
     * @returns {Promise<Array<object>>}
     */
    findRelevantFacts(keyword: any, limit?: number): Promise<any>;
    /**
     * Obtiene todos los hechos de la base de conocimiento.
     * @returns {Promise<Array<object>>}
     */
    getAllFacts(): Promise<any>;
    /**
     * Guarda o actualiza los rasgos de personalidad para un chat específico.
     * @param {string} chat_id - JID del chat.
     * @param {object} personality_traits - Objeto JSON con los rasgos de personalidad.
     * @returns {Promise<void>}
     */
    setChatPersonality(chat_id: any, personality_traits: any): Promise<void>;
    /**
     * Obtiene los rasgos de personalidad para un chat específico.
     * @param {string} chat_id - JID del chat.
     * @returns {Promise<object | null>} Objeto con los rasgos de personalidad o null si no se encuentra.
     */
    getChatPersonality(chat_id: any): Promise<any>;
    /**
     * Cierra la conexión a la base de datos de la IA.
     * @returns {Promise<void>}
     */
    close(): Promise<void>;
    /**
     * Limpia interacciones antiguas de la base de datos.
     * @param {number} daysToRetain - Número de días a retener las interacciones.
     * @returns {Promise<void>}
     */
    cleanOldInteractions(daysToRetain?: number): Promise<void>;
    /**
     * ✅  NUEVO: Guarda un hecho contextual en la base de datos. Si ya existe, lo actualiza.
     * @param {string} chatId
     * @param {string} key
     * @param {string} value
     * @param {string} userId
     */
    saveFact(chatId: any, key: any, value: any, userId: any): Promise<void>;
    /**
     * ✅  NUEVO: Obtiene todos los hechos para un chat específico.
     * @param {string} chatId
     * @returns {Promise<Array<object>>}
     */
    getFactsForChat(chatId: any): Promise<any>;
}
export default MemoryService;
//# sourceMappingURL=MemoryService.d.ts.map