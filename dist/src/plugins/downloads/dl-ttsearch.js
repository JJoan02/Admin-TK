// dl-ttsearch.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dlttsearchPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'ttsearch',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'ttsearch <parámetros>',
            aliases: ["tiktoksearch"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                if (!text)
                    return await reply('¡Ingresa una palabra clave para buscar videos de TikTok!\nEjemplo: .ttsearch tobrut');
                await conn.sendMessage(m.chat, { react: { text: "⏰", key: m.key
                    }, catch(error) {
                        console.error(`Error en ${this.name}:`, error);
                        await reply('❌ Ocurrió un error al ejecutar el comando');
                    }
                });
            }
            // Exportar para compatibilidad con sistema legacy
            finally {
            }
            // Exportar para compatibilidad con sistema legacy
            const handler = async (m, { conn, text, usedPrefix, command }) => {
                const plugin = new TtsearchPlugin();
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
            handler.command = [["tiktoksearch"]];
            export default handler;
        }
        finally {
        }
    }
}
//# sourceMappingURL=dl-ttsearch.js.map