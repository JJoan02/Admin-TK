import { Command } from '../../core/CommandBus.js';
import { funMessages } from '../content/fun-content.js';
export class GayCommand extends Command {
    constructor() {
        super();
        this.name = 'gay';
        this.description = 'Muestra una imagen gay.';
        this.commands = ['gay'];
        this.tags = ['fun'];
        this.help = ['gay <@user>'];
    }
    async execute(context) {
        const { conn, m } = context;
        let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        await conn.sendFile(m.chat, global.AdminTK_apis('https://some-random-api.com', '/canvas/overlay/gay', {
            avatar: await conn.profilePictureUrl(who, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
        }), 'error.png', funMessages.gay.message, m);
    }
}
//# sourceMappingURL=GayCommand.js.map