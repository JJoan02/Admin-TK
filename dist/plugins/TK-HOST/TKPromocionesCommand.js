import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKPromocionesCommand extends Command {
    constructor() {
        super();
        this.name = 'promociones';
        this.description = 'Muestra las promociones actuales de TK-Host.';
        this.commands = ['promociones'];
        this.tags = ['tk'];
        this.help = ['promociones'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const imageUrl = tkContent.images.promotions;
        const text = tkContent.text.promotions(tkContent.urls.store);
        await conn.sendFile(m.chat, imageUrl, 'promociones.jpg', text, m);
    }
}
//# sourceMappingURL=TKPromocionesCommand.js.map