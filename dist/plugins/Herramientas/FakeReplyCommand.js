import { Command } from '../../core/Command.js';
import { fakeReplyMessages } from '../../lib/herramientas-content.js';
function copy(obj) {
    return JSON.parse(JSON.stringify(obj));
}
class FakeReplyCommand extends Command {
    #logger;
    constructor(logger) {
        super('fake', 'Crea una respuesta falsa a un mensaje. Uso: !fake <texto> @usuario <texto2>');
        this.#logger = logger;
        this.commands = ['fitnah', 'fakereply', 'fake'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, fakeReplyMessages.usage(usedPrefix, command, m.sender.split `@`[0]), m, { mentions: [m.sender] });
            return;
        }
        const cm = copy(m);
        let who;
        if (text.includes('@0')) {
            who = '0@s.whatsapp.net';
        }
        else if (m.isGroup) {
            who = cm.participant = m.mentionedJid[0];
        }
        else {
            who = m.chat;
        }
        if (!who) {
            await conn.reply(m.chat, fakeReplyMessages.mentionRequired(usedPrefix, command, m.sender.split `@`[0]), m, { mentions: [m.sender] });
            return;
        }
        cm.key.fromMe = false;
        cm.message[m.mtype] = copy(m.msg);
        const sp = '@' + who.split `@`[0];
        const [fake, ...real] = text.split(sp);
        try {
            conn.fakeReply(m.chat, real.join(sp).trimStart(), who, fake.trimEnd(), m.isGroup ? m.chat : false, {
                contextInfo: {
                    mentionedJid: conn.parseMention(real.join(sp).trim()),
                },
            });
        }
        catch (e) {
            this.#logger.error(`Error al crear fake reply: ${e.message}`);
            await conn.reply(m.chat, fakeReplyMessages.error, m);
        }
    }
}
export default FakeReplyCommand;
//# sourceMappingURL=FakeReplyCommand.js.map