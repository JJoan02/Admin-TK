export declare class GroupHandler {
    #private;
    constructor(groupManager: any, logger: any, config: any, errorHandler: any);
    /**
     * Maneja las actualizaciones de participantes en un grupo.
     * @param {object} event - El objeto del evento de Baileys ({ id, participants, action, messageStubType }).
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket.
     */
    handleParticipantUpdate(event: any, sock: any): Promise<void>;
    /**
     * Maneja las actualizaciones de los metadatos de un grupo.
     * @param {Array<object>} updates - Un array con las actualizaciones del grupo.
     * @param {import('@whiskeysockets/baileys').WASocket} sock - La instancia del socket.
     */
    handleGroupUpdate(updates: any, sock: any): Promise<void>;
}
export default GroupHandler;
//# sourceMappingURL=GroupHandler.d.ts.map