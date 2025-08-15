import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKVip3Command extends Command {
    constructor() {
        super();
        this.name = 'vip3';
        this.description = 'Muestra información sobre el plan TK-Vip3.';
        this.commands = ['vip3'];
        this.tags = ['tk'];
        this.help = ['vip3'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const randomImageUrl = tkContent.images.vip[Math.floor(Math.random() * tkContent.images.vip.length)];
        const text = tkContent.text.vip3(tkContent.urls.createServer);
        await conn.sendFile(m.chat, randomImageUrl, 'tk-vip3.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKVip3Command.js.map