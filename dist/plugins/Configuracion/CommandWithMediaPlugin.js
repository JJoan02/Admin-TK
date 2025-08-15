import { proto, generateWAMessage, areJidsSameUser } from '@whiskeysockets/baileys';
class CommandWithMediaPlugin {
    #dbService;
    #logger;
    constructor(dbService, logger) {
        this.#dbService = dbService;
        this.#logger = logger;
    }
    async all(m, chatUpdate, conn) {
        if (m.isBaileys)
            return;
        if (!m.message)
            return;
        if (!m.msg.fileSha256)
            return;
        const fileSha256 = Buffer.from(m.msg.fileSha256).toString('base64');
        const customCommand = await this.#dbService.getCustomCommand(fileSha256);
        if (!customCommand)
            return;
        let { text, mentionedJid } = customCommand;
        try {
            let messages = await generateWAMessage(m.chat, { text: text, mentions: mentionedJid }, {
                userJid: conn.user.id,
                quoted: m.quoted && m.quoted.fakeObj
            });
            messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
            messages.key.id = m.key.id;
            messages.pushName = m.pushName;
            if (m.isGroup)
                messages.participant = m.sender;
            let msg = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(messages)],
                type: 'append'
            };
            conn.ev.emit('messages.upsert', msg);
        }
        catch (e) {
            this.#logger.error(`Error en CommandWithMediaPlugin: ${e.message}`);
        }
    }
}
export default CommandWithMediaPlugin;
//# sourceMappingURL=CommandWithMediaPlugin.js.map