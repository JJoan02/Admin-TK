export declare class EventHandler {
    #private;
    /**
     * @param {object} logger - Instancia del logger.
     * @param {object} errorHandler - Instancia del manejador de errores.
     * @param {object} messageHandler - Instancia de MessageHandler.
     * @param {object} groupHandler - Instancia de GroupHandler.
     * @param {object} notificationService - Instancia de NotificationService.
     * @param {Function} printEvent - Función para imprimir eventos.
     */
    constructor(logger: any, errorHandler: any, messageHandler: any, groupHandler: any, notificationService: any, printEvent: any);
    /**
     * Registra todos los manejadores de eventos en el socket de Baileys.
     * Este método se llama una vez que el socket está conectado.
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket de Baileys.
     */
    register(sock: any): void;
}
export default EventHandler;
//# sourceMappingURL=EventHandler.d.ts.map