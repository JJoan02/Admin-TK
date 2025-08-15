import { Command } from '../../core/CommandBus.js';
export class TextToImageCommand extends Command {
    constructor() {
        super();
        this.name = 'txt';
        this.description = 'Convierte texto a imagen.';
        this.commands = ['txt', 'escribir', 'escribe'];
        this.tags = ['maker'];
        this.help = ['txt <text>'];
    }
    async execute(context) {
        const { conn, m, text, usedPrefix, command } = context;
        let teks = text ? text : m.quoted && m.quoted.text ? m.quoted.text : '';
        if (!teks) {
            return m.reply(global.textToImageMessages.noText(usedPrefix, command));
        }
        let img = global.API('fgmods', '/api/maker/txt', { text: teks }, 'apikey');
        conn.sendFile(m.chat, img, 'img.png', global.textToImageMessages.success(global.wm), m);
    }
}
//# sourceMappingURL=TextToImageCommand.js.map