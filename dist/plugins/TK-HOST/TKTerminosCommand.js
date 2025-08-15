import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKTerminosCommand extends Command {
    constructor() {
        super();
        this.name = 'terminostk';
        this.description = 'Muestra los términos y condiciones de TK-Host.';
        this.commands = ['terminostk'];
        this.tags = ['tk'];
        this.help = ['terminostk'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const imageUrl = tkContent.images.terms;
        const text = tkContent.text.terms(tkContent.urls.terms, tkContent.urls.supportChat);
        await conn.sendFile(m.chat, imageUrl, 'terminos.jpg', text, m, null, fake);
    }
}
//# sourceMappingURL=TKTerminosCommand.js.map