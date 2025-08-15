import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKPanelCommand extends Command {
    constructor() {
        super();
        this.name = 'panel';
        this.description = 'Muestra el panel de gestión de TK-Host.';
        this.commands = ['panel'];
        this.tags = ['tk'];
        this.help = ['panel'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const imageUrl = tkContent.images.panel;
        const text = tkContent.text.panel(tkContent.urls.panel);
        await conn.sendFile(m.chat, imageUrl, 'panel-gestion.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKPanelCommand.js.map