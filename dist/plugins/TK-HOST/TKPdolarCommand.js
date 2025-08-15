import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKPdolarCommand extends Command {
    constructor() {
        super();
        this.name = 'pdolar';
        this.description = 'Muestra los precios de TK-Coins en dólares.';
        this.commands = ['pdolar'];
        this.tags = ['tk'];
        this.help = ['pdolar'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const imageUrl = tkContent.images.prices;
        const text = tkContent.text.pdolar;
        await conn.sendFile(m.chat, imageUrl, 'tk-coins.jpg', text, m);
    }
}
//# sourceMappingURL=TKPdolarCommand.js.map