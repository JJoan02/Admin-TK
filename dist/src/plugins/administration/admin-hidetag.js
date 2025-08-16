// admin-hidetag.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminhidetagPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'hidetag',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'hidetag <parámetros>',
            aliases: ["notify", "n", "noti"],
            permissions: ['group'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let users = participants.map(u => conn.decodeJid(u.id));
            let q = m.quoted ? m.quoted : m;
            let c = m.quoted ? m.quoted : m.msg;
            const msg = conn.cMod(m.chat, generateWAMessageFromContent(m.chat, {
                [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
                    text: c || ''
                }, catch(error) {
                    console.error(`Error en ${this.name}:`, error);
                    await reply('❌ Ocurrió un error al ejecutar el comando');
                }
            }));
        }
        // Exportar para compatibilidad con sistema legacy
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new HidetagPlugin();
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
        handler.command = [["notify", "n", "noti"]];
        handler.group = true;
        export default handler;
    }
}
//# sourceMappingURL=admin-hidetag.js.map