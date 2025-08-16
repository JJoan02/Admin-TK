// eco-download.ts - Plugin mejorado y optimizado
// Categoría: economy-system
// Funcionalidad: Sistema económico
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ecodownloadPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'inventory',
            category: 'economy-system',
            description: 'Sistema económico',
            usage: 'inventory <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let imgr = flaaa.getRandom();
            let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
            let name = await conn.getName(who);
            if (typeof await this.database.getData().users[who] == "Sin Datos | No Dates") {
                await this.database.getData().users[who];
                {
                    exp: 0,
                        limit;
                    20,
                        lastclaim;
                    0,
                        registered;
                    false,
                        name;
                    conn.getName(m.sender),
                        age;
                    -1,
                        regTime;
                    -1,
                        afk;
                    -1,
                        afkReason;
                    '',
                        banned;
                    false,
                        level;
                    0,
                        lastweekly;
                    0,
                        role;
                    'Novato',
                        autolevelup;
                    false,
                        money;
                    0,
                        pasangan;
                    "",
                    ;
                }
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
            const plugin = new InventoryPlugin();
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
        handler.command = ['inventory'];
        export default handler;
    }
}
//# sourceMappingURL=eco-download.js.map