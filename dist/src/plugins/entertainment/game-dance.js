// game-dance.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamedancePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'dance',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'dance <parámetros>',
            aliases: ["bailar"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let pp = 'https://tinyurl.com/26djysdo';
            let pp2 = 'https://tinyurl.com/294oahv9';
            let who;
            if (m.isGroup)
                who = m.mentionedJid[0];
            else
                who = m.chat;
            if (!who)
                return await reply(m.chat, '🚩 Menciona al usuario con *@user*', m, fake);
            let name2 = conn.getName(who);
            let name = conn.getName(m.sender);
            await conn.sendMessage(m.chat, { video: { url: [pp, pp2].getRandom()
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
            const plugin = new DancePlugin();
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
        handler.command = [["bailar"]];
        export default handler;
    }
}
//# sourceMappingURL=game-dance.js.map