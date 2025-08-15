import { Command } from '../../core/CommandBus.js';
export class PixelateImageCommand extends Command {
    constructor() {
        super();
        this.name = 'pixelate';
        this.description = 'Pixela una imagen.';
        this.commands = ['pixel', 'pixelar', 'difuminar'];
        this.tags = ['maker'];
        this.help = ['pixelate'];
    }
    async execute(context) {
        const { conn, m, text } = context;
        let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
        conn.sendFile(m.chat, global.API('https://some-random-api.ml', '/canvas/pixelate', {
            avatar: await conn.profilePictureUrl(m.sender, 'image').catch((_) => 'https://telegra.ph/file/24fa902ead26340f3df2c.png'),
            comment: text,
            username: conn.getName(m.sender)
        }), 'error.png', global.pixelateImageMessages.success, m);
    }
}
//# sourceMappingURL=PixelateImageCommand.js.map