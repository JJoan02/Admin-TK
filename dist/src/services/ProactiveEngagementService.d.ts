export declare class ProactiveEngagementService {
    #private;
    constructor(config: any, logger: any, chatManager: any, dbService: any);
    /**
     * Revisa todos los chats privados y envía mensajes proactivos si es necesario.
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket.
     */
    checkAndSend(sock: any): Promise<void>;
}
export default ProactiveEngagementService;
//# sourceMappingURL=ProactiveEngagementService.d.ts.map