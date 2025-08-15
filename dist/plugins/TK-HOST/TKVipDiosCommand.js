import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKVipDiosCommand extends Command {
    constructor() {
        super();
        this.name = 'dios';
        this.description = 'Muestra información sobre el plan TK-Dios.';
        this.commands = ['dios'];
        this.tags = ['tk'];
        this.help = ['dios'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const randomImageUrl = tkContent.images.vip[Math.floor(Math.random() * tkContent.images.vip.length)];
        const text = tkContent.text.vip_dios(tkContent.urls.createServer);
        await conn.sendFile(m.chat, randomImageUrl, 'tk-dios.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKVipDiosCommand.js.map