// search-tiktoksearch.ts - Plugin mejorado y optimizado
// Categoría: search-tools
// Funcionalidad: Herramientas de búsqueda
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class searchtiktoksearchPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'tiktoksearch',
            category: 'search-tools',
            description: 'Herramientas de búsqueda',
            usage: 'tiktoksearch <parámetros>',
            aliases: ["tiktoks"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                return await reply(message.chat, '☁️ *¿Que quieres buscar en tiktok?*', message, fake);
            async function createVideoMessage(url) {
                const { videoMessage };
                try { }
                catch (error) {
                    console.error(`Error en ${this.name}:`, error);
                    await reply('❌ Ocurrió un error al ejecutar el comando');
                }
            }
        }
        // Exportar para compatibilidad con sistema legacy
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new TiktoksearchPlugin();
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
        handler.command = [["tiktoks"]];
        export default handler;
    }
}
//# sourceMappingURL=search-tiktoksearch.js.map