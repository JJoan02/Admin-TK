export default ;
export declare class MessageHandler {
    #private;
    constructor(config: any, logger: any, errorHandler: any, commandBus: any, rateLimiter: any, breaker: any, permValidator: any, aiInterventionService: any, userManager: any, groupManager: any, chatManager: any, aiService: any, pluginLoader: any, dbService: any, notificationService: any, cache: any, printEvent: any);
    /**
     * Punto de entrada principal para todos los mensajes.
     * Su única responsabilidad es construir el contexto y añadirlo a la cola de trabajos.
     */
    handle(event: any, sock: any): Promise<void>;
    /**
     * Esta función es ejecutada por la JobQueue para cada trabajo.
     * Contiene la lógica de procesamiento que antes estaba en handle().
     * @private
     */
    _processJob(context: any): Promise<void>;
    _buildContext(message: any, sock: any, correlationId: any): Promise<{
        sock: any;
        message: any;
        user: any;
        group: any;
        chat: any;
        isGroup: any;
        messageText: any;
        messageType: any;
        isCommand: boolean;
        command: string | undefined;
        args: string[] | undefined;
        correlationId: any;
        sentiment: string;
        audioBufferBase64: null;
        audioMimeType: null;
        reply: (txt: any, opts: any) => any;
        pluginLoader: any;
        userManager: any;
        groupManager: any;
        chatManager: any;
        aiService: any;
        config: any;
        db: any;
        notificationService: any;
    } | null>;
    _extractText(msg: any, type: any): any;
    _shouldIgnore({ user, isGroup, group, chat }: {
        user: any;
        isGroup: any;
        group: any;
        chat: any;
    }): boolean;
    _parseCommand(text?: string): {
        isCommand: boolean;
        command?: never;
        args?: never;
    } | {
        isCommand: boolean;
        command: string;
        args: string[];
    };
    _handleAutonomousAI(context: any): Promise<void>;
    _safeReply(sock: any, jid: any, text: any, message: any): Promise<void>;
}
//# sourceMappingURL=MessageHandler.d.ts.map