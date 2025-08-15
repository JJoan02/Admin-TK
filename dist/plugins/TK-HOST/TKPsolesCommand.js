import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKPsolesCommand extends Command {
    constructor() {
        super();
        this.name = 'psoles';
        this.description = 'Muestra los precios de TK-Coins en soles.';
        this.commands = ['psoles'];
        this.tags = ['tk'];
        this.help = ['psoles'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const imageUrl = tkContent.images.prices;
        const text = tkContent.text.psoles;
        await conn.sendFile(m.chat, imageUrl, 'tk-coins.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKPsolesCommand.js.map