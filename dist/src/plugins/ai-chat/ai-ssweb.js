// ai-ssweb.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aisswebPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'ssweb',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'ssweb <parámetros>',
            aliases: ["ss"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!args[0])
                return await reply(m.chat, '⚠️ *Ingrese el Link de una página.*', m, rcanal);
            try {
                await m.react(rwait);
                await reply(m.chat, '🚀 Buscando su información....', m, {
                    contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, showAdAttribution: true,
                            title: packname,
                            body: dev,
                            previewType: 0, thumbnail: icons,
                            sourceUrl: channel
                        }, catch(error) {
                            console.error(`Error en ${this.name}:`, error);
                            await reply('❌ Ocurrió un error al ejecutar el comando');
                        }
                    }
                });
                // Exportar para compatibilidad con sistema legacy
                const handler = async (m, { conn, text, usedPrefix, command }) => {
                    const plugin = new SswebPlugin();
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
                handler.command = [["ss"]];
                export default handler;
            }
            finally {
            }
        }
        finally {
        }
    }
}
//# sourceMappingURL=ai-ssweb.js.map