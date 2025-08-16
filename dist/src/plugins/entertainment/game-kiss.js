// game-kiss.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamekissPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'kiss',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'kiss <parámetros>',
            aliases: ["beso", "besar"],
            permissions: ['group'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let who;
            if (m.isGroup)
                who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? await m.quoted.sender : false;
            else
                who = m.chat;
            if (!who)
                await reply('Etiqueta o menciona a alguien');
            let user = await this.database.getData().users[who];
            let name = conn.getName(who);
            let name2 = conn.getName(m.sender);
            // m.react('⏳');
            await conn.sendMessage(m.chat, { react: { text: '❤', key: m.key
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
            const plugin = new KissPlugin();
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
        handler.command = [["beso", "besar"]];
        handler.group = true;
        export default handler;
    }
}
//# sourceMappingURL=game-kiss.js.map