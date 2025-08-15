import { proto, generateWAMessage, areJidsSameUser } from '@whiskeysockets/baileys';
class TemplateResponsePlugin {
    #logger;
    constructor(logger) {
        this.#logger = logger;
    }
    async all(m, chatUpdate, conn) {
        if (m.isBaileys)
            return;
        if (!m.message)
            return;
        let id;
        let text;
        if (m.message.buttonsResponseMessage) {
            id = m.message.buttonsResponseMessage.selectedButtonId;
            text = m.message.buttonsResponseMessage.selectedDisplayText;
        }
        else if (m.message.templateButtonReplyMessage) {
            id = m.message.templateButtonReplyMessage.selectedId;
            text = m.message.templateButtonReplyMessage.selectedDisplayText;
        }
        else if (m.message.listResponseMessage) {
            id = m.message.listResponseMessage.singleSelectReply?.selectedRowId;
            text = m.message.listResponseMessage.title;
        }
        else if (m.message.interactiveResponseMessage) {
            try {
                id = JSON.parse(m.message.interactiveResponseMessage.nativeFlowResponseMessage.paramsJson).id;
                text = m.message.interactiveResponseMessage.body?.text;
            }
            catch (e) {
                this.#logger.error(`Error al parsear interactiveResponseMessage: ${e.message}`);
                return;
            }
        }
        else {
            return;
        }
        if (!id && !text)
            return;
        try {
            const messages = await generateWAMessage(m.chat, { text: id || text, mentions: m.mentionedJid }, {
                userJid: conn.user.id,
                quoted: m.quoted && m.quoted.fakeObj,
            });
            messages.key.fromMe = areJidsSameUser(m.sender, conn.user.id);
            messages.key.id = m.key.id;
            messages.pushName = m.pushName;
            if (m.isGroup)
                messages.key.participant = messages.participant = m.sender;
            const msg = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(messages)].map((v) => (v.conn = conn, v)),
                type: 'append',
            };
            conn.ev.emit('messages.upsert', msg);
        }
        catch (e) {
            this.#logger.error(`Error en TemplateResponsePlugin al reinyectar mensaje: ${e.message}`);
        }
    }
}
export default TemplateResponsePlugin;
//# sourceMappingURL=TemplateResponsePlugin.js.map