// ai-grupos.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aigruposPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'grupos',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'grupos <parámetros>',
            aliases: ["iangrupos", "gruposian"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let grupos = "*Hola!, te invito a unirte a los grupos oficiales del Bot para convivir con la comunidad* ⭐\n\n" +
                "1-Barboza\n" +
                "*✰* https://chat.whatsapp.com/CBuLXuVZcg9FEfCSHiY6b0" +
                "*─ׄ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ*\n\n" +
                "➠ Enlace anulado? entre aquí! \n\n" +
                "⭐ Canal :\n" +
                "*✰*https://whatsapp.com/channel/0029Vb8kvXUBfxnzYWsbS81I" +
                "> By Barboza";
            // Asegúrate de definir 'imagen2' correctamente antes de usarlo
            let imagen2 = 'https://qu.ax/Mvhfa.jpg';
            // Define los emojis que quieres usar
            let emojis = '🍁';
            await conn.sendFile(m.chat, imagen2, "ian.jpg", grupos, m, null, rcanal);
            await m.react(emojis);
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new GruposPlugin();
    await plugin.execute({
        message: m,
        args: text?.split(' ') || [],
        reply: (msg) => conn.reply(m.chat, msg, m),
        conn,
        text,
        usedPrefix,
        command
    });
};
handler.command = [["iangrupos", "gruposian"]];
export default handler;
//# sourceMappingURL=ai-grupos.js.map