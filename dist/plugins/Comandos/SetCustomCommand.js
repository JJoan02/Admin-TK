import { Command } from '../../core/CommandBus.js';
import { cmdMessages } from '../content/cmd-content.js';
export class SetCustomCommand extends Command {
    constructor() {
        super();
        this.name = 'setcmd';
        this.description = 'Guarda un comando personalizado.';
        this.commands = ['setcmd'];
        this.tags = ['cmd'];
        this.help = ['setcmd <text>'];
        this.owner = true;
    }
    async execute(context) {
        const { conn, m, text, usedPrefix, command } = context;
        global.AdminTK_db.data.sticker = global.AdminTK_db.data.sticker || {};
        if (!m.quoted) {
            return m.reply(cmdMessages.replyToMessage, m, global.AdminTK_botInfo.rcanal);
        }
        if (!m.quoted.fileSha256) {
            return m.reply(cmdMessages.noFileSha256, m, global.AdminTK_botInfo.rcanal);
        }
        if (!text) {
            return m.reply(cmdMessages.enterCommandName, m, global.AdminTK_botInfo.rcanal);
        }
        try {
            let sticker = global.AdminTK_db.data.sticker;
            let hash = m.quoted.fileSha256.toString('base64');
            if (sticker[hash] && sticker[hash].locked) {
                return m.reply(cmdMessages.cannotChangeLocked, m, global.AdminTK_botInfo.rcanal);
            }
            sticker[hash] = {
                text,
                mentionedJid: m.mentionedJid,
                creator: m.sender,
                at: +new Date(),
                locked: false,
            };
            await m.reply(cmdMessages.commandSaved, m, global.AdminTK_botInfo.rcanal);
            await m.react('✅');
        }
        catch (e) {
            console.error(e);
            await m.react('✖️');
        }
    }
}
//# sourceMappingURL=SetCustomCommand.js.map