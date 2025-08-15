import { Command } from '../../core/CommandBus.js';
import { tkContent } from '../content/tk-content.js';
export class TKEstadoCommand extends Command {
    constructor() {
        super();
        this.name = 'estadotk';
        this.description = 'Muestra el estado del servicio TK-Host.';
        this.commands = ['estadotk'];
        this.tags = ['tk'];
        this.help = ['estadotk'];
        this.group = false;
    }
    async execute(context) {
        const { conn, m } = context;
        const canalId = [
            "120363205895430548@newsletter",
            "120363233459118973@newsletter"
        ];
        const randomCanalId = canalId[Math.floor(Math.random() * canalId.length)];
        const randomImageUrl = tkContent.images.estado[Math.floor(Math.random() * tkContent.images.estado.length)];
        const randomResponse = tkContent.text.estadoResponses[Math.floor(Math.random() * tkContent.text.estadoResponses.length)];
        const text = `
✦━── ──━✦ E-S-T-A-D-O ✦━── ──━✦

🔍 Estado del Servicio 📡
${randomResponse}

> Consulta aquí:
> https://dash.tk-joanhost.com/home
`.trim();
        const rcanal = {
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: randomCanalId,
                    serverMessageId: 100,
                    newsletterName: 'Tk-Host Channel',
                },
                externalAdReply: {
                    showAdAttribution: true,
                    title: 'Estado del Servicio',
                    body: 'TK-HOST | Tu aliado digital',
                    mediaUrl: null,
                    description: null,
                    previewType: "PHOTO",
                    thumbnailUrl: randomImageUrl,
                    sourceUrl: 'https://dash.tk-joanhost.com/home',
                    mediaType: 1,
                    renderLargerThumbnail: true,
                },
            },
        };
        await conn.sendMessage(m.chat, { text, ...rcanal }, { quoted: m });
    }
}
//# sourceMappingURL=TKEstadoCommand.js.map