import { Command } from '../../core/CommandBus.js';
import { funMessages } from '../content/fun-content.js';
export class DanceCommand extends Command {
    constructor() {
        super();
        this.name = 'dance';
        this.description = 'Baila con alguien.';
        this.commands = ['dance', 'bailar'];
        this.tags = ['fun'];
        this.help = ['dance <@user>'];
    }
    async execute(context) {
        const { conn, m, command, usedPrefix } = context;
        let who;
        if (m.isGroup) {
            who = m.mentionedJid[0];
        }
        else {
            who = m.chat;
        }
        if (!who) {
            return m.reply(funMessages.dance.mentionUser(usedPrefix + command));
        }
        const name2 = conn.getName(who);
        const name = conn.getName(m.sender);
        const video = funMessages.dance.videos[Math.floor(Math.random() * funMessages.dance.videos.length)];
        await conn.sendMessage(m.chat, { video: { url: video }, gifPlayback: true, caption: funMessages.dance.message(name, name2) }, { quoted: m });
    }
}
//# sourceMappingURL=DanceCommand.js.map