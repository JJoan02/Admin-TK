import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKVip2Command extends Command {
    constructor() {
        super();
        this.name = 'vip2';
        this.description = 'Muestra información sobre el plan TK-Vip2.';
        this.commands = ['vip2'];
        this.tags = ['tk'];
        this.help = ['vip2'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const randomImageUrl = tkContent.images.vip[Math.floor(Math.random() * tkContent.images.vip.length)];
        const text = tkContent.text.vip2(tkContent.urls.createServer);
        await conn.sendFile(m.chat, randomImageUrl, 'tk-vip2.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKVip2Command.js.map