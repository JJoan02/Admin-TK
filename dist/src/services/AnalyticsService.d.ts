export declare class AnalyticsService {
    #private;
    constructor(dbService: any, logger: any);
    init(): Promise<void>;
    /**
     * Registra la ejecución de un comando en la base de datos de analíticas.
     * @param {string} commandName - El nombre del comando ejecutado.
     * @param {string} userJid - El JID del usuario que ejecutó el comando.
     */
    trackCommandExecution(commandName: any, userJid: any): Promise<void>;
    /**
     * Registra un mensaje procesado por el bot en la base de datos de analíticas.
     * @param {string} userJid - El JID del usuario que envió el mensaje.
     */
    trackMessageProcessed(userJid: any): Promise<void>;
    /**
     * Recupera los datos de analíticas actuales de la base de datos SQLite.
     * Realiza consultas agregadas para obtener un resumen.
     * @returns {Promise<object>} Un objeto con los datos de analíticas.
     */
    getAnalyticsData(): Promise<{
        messagesProcessed: any;
        commandExecutions: any;
        activeUsers: any;
    }>;
}
export default AnalyticsService;
//# sourceMappingURL=AnalyticsService.d.ts.map