import { Command } from '../../core/CommandBus.js';
import { googleImage } from '@bochilteam/scraper';
import { nsfwMessages } from '../content/nsfw-content.js';
export class HentaiCommand extends Command {
    constructor() {
        super();
        this.name = 'hentai';
        this.description = 'Muestra imágenes hentai.';
        this.commands = ['hentai'];
        this.tags = ['nsfw'];
        this.help = ['hentai'];
        this.group = true;
        this.register = true;
    }
    async execute(context) {
        const { conn, m } = context;
        if (!global.AdminTK_db.data.chats[m.chat].nsfw) {
            return conn.reply(m.chat, nsfwMessages.nsfwDisabled, m);
        }
        await m.react('🕓');
        try {
            let res = await googleImage('Imagen ' + 'hentai');
            let json = res.getRandom();
            await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', nsfwMessages.hentai.caption, m);
            await m.react('✅');
        }
        catch (e) {
            console.error(e);
            await m.react('✖️');
        }
    }
}
//# sourceMappingURL=HentaiCommand.js.map