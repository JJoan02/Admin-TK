import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKPreBotsCommand extends Command {
    constructor() {
        super();
        this.name = 'prebots';
        this.description = 'Muestra la lista de prebots disponibles en TK-Host.';
        this.commands = ['prebots'];
        this.tags = ['tk'];
        this.help = ['prebots'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const imageUrl = tkContent.images.prebots;
        const text = tkContent.text.prebots(tkContent.urls.createServer);
        await conn.sendFile(m.chat, imageUrl, 'pagina-panel.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKPreBotsCommand.js.map