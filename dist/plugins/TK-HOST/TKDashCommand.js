import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKDashCommand extends Command {
    constructor() {
        super();
        this.name = 'dash';
        this.description = 'Muestra el panel de control de TK-Host.';
        this.commands = ['dash'];
        this.tags = ['tk'];
        this.help = ['dash'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const imageUrl = tkContent.images.dashboard;
        const text = tkContent.text.dashboard(tkContent.urls.dashboard);
        await conn.sendFile(m.chat, imageUrl, 'pagina-panel.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKDashCommand.js.map