import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKVip4Command extends Command {
    constructor() {
        super();
        this.name = 'vip4';
        this.description = 'Muestra información sobre el plan TK-Vip4.';
        this.commands = ['vip4'];
        this.tags = ['tk'];
        this.help = ['vip4'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const randomImageUrl = tkContent.images.vip[Math.floor(Math.random() * tkContent.images.vip.length)];
        const text = tkContent.text.vip4(tkContent.urls.createServer);
        await conn.sendFile(m.chat, randomImageUrl, 'tk-vip4.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKVip4Command.js.map