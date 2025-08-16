// eco-claim.ts - Plugin mejorado y optimizado
// Categoría: economy-system
// Funcionalidad: Sistema económico
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ecoclaimPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'claim',
            category: 'economy-system',
            description: 'Sistema económico',
            usage: 'claim <parámetros>',
            aliases: ["c", "reclamar"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                const dataP = JSON.parse(await fs.readFile(perzonaliPath));
                const globalConfig = dataP.global;
                const defaultConfig = dataP.default;
                const currency = globalConfig.currency || defaultConfig.currency;
                let character;
                if (m.quoted) {
                    const quotedSender = m.quoted.sender || m.quoted.participant || '';
                    const botJid = conn.user.jid;
                    const isFromBot = quotedSender === botJid ||
                        quotedSender === botJid.replace(/:[0-9]+/, '') ||
                        quotedSender.endsWith('@lid') ||
                        m.quoted.id?.startsWith('BAE5') ||
                        m.quoted.id?.startsWith('3EB0');
                    if (!isFromBot) {
                        await await reply(m.chat, 'El mensaje al que estás respondiendo no contiene un personaje válido para reclamar.', m);
                        return;
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
                const plugin = new ClaimPlugin();
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
            handler.command = [["c", "reclamar"]];
            export default handler;
        }
        finally {
        }
    }
}
//# sourceMappingURL=eco-claim.js.map