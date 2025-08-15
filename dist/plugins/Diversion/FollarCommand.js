import { Command } from '../../core/CommandBus.js';
import { funMessages } from '../content/fun-content.js';
export class FollarCommand extends Command {
    constructor() {
        super();
        this.name = 'follar';
        this.description = 'Realiza una acción de follar.';
        this.commands = ['follar', 'violar'];
        this.tags = ['fun'];
        this.help = ['follar <@user>'];
        this.register = true;
    }
    async execute(context) {
        const { conn, m, command, text } = context;
        if (!text) {
            return m.reply(funMessages.follar.usage(command));
        }
        try {
            const user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
            m.reply(funMessages.follar.message(text), null, { mentions: [user] });
        }
        catch (err) {
            console.error(err);
        }
    }
}
//# sourceMappingURL=FollarCommand.js.map