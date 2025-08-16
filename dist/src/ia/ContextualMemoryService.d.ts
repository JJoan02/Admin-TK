export declare class ContextualMemoryService {
    constructor(aiService: any, memoryService: any);
    /**
     * Analiza un mensaje de forma pasiva para extraer hechos y los guarda.
     * @param {string} text - El contenido del mensaje.
     * @param {string} chatId - El ID del chat.
     * @param {string} userId - El ID del usuario que envió el mensaje.
     */
    analyzeAndStore(text: any, chatId: any, userId: any): Promise<void>;
}
export default ContextualMemoryService;
//# sourceMappingURL=ContextualMemoryService.d.ts.map