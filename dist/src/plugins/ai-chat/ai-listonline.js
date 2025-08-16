// ai-listonline.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ailistonlinePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'listonline',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'listonline <parámetros>',
            aliases: ["online", "linea", "enlinea"],
            permissions: ['group'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                let id = args?.[0]?.match(/\d+\-\d+@g.us/) || m.chat;
                const participantesUnicos = Object.values(conn.chats[id]?.messages || {});
                try { }
                catch (error) {
                    console.error(`Error en ${this.name}:`, error);
                    await reply('❌ Ocurrió un error al ejecutar el comando');
                }
            }
            finally {
            }
        }
        // Exportar para compatibilidad con sistema legacy
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new ListonlinePlugin();
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
        handler.command = [["online", "linea", "enlinea"]];
        handler.group = true;
        export default handler;
    }
}
//# sourceMappingURL=ai-listonline.js.map