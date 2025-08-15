import { proto } from '@whiskeysockets/baileys';
class GetMessagePlugin {
    #dbService;
    #logger;
    constructor(dbService, logger) {
        this.#dbService = dbService;
        this.#logger = logger;
    }
    async all(m, chatUpdate, conn) {
        if (!m.chat.endsWith('.net') || m.fromMe || m.key.remoteJid.endsWith('status@broadcast'))
            return;
        if (m.isBaileys)
            return;
        const chat = await this.#dbService.getChat(m.chat);
        if (chat && chat.isBanned)
            return;
        const user = await this.#dbService.getUser(m.sender);
        if (user && user.isBanned)
            return;
        const storedMessages = await this.#dbService.getStoredMessages();
        if (!(m.text in storedMessages))
            return;
        try {
            let _m = conn.serializeM(JSON.parse(JSON.stringify(storedMessages[m.text]), (_, v) => {
                if (v !== null &&
                    typeof v === 'object' &&
                    'type' in v &&
                    v.type === 'Buffer' &&
                    'data' in v &&
                    Array.isArray(v.data)) {
                    return Buffer.from(v.data);
                }
                return v;
            }));
            await _m.copyNForward(m.chat, true);
        }
        catch (e) {
            this.#logger.error(`Error en GetMessagePlugin al reenviar mensaje: ${e.message}`);
        }
    }
}
export default GetMessagePlugin;
//# sourceMappingURL=GetMessagePlugin.js.map