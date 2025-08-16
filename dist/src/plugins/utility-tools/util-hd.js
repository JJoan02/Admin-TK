// util-hd.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class utilhdPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'hd',
            category: 'utility-tools',
            description: 'Herramientas de utilidad',
            usage: 'hd <parámetros>',
            aliases: ["upscale"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const quoted = m.quoted ? m.quoted : m;
            const mime = quoted.mimetype || quoted.msg?.mimetype || '';
            if (!/image\/(jpe?g|png)/i.test(mime)) {
                await conn.sendMessage(m.chat, { react: { text: '❗', key: m.key
                    }, catch(error) {
                        console.error(`Error en ${this.name}:`, error);
                        await reply('❌ Ocurrió un error al ejecutar el comando');
                    }
                });
            }
            // Exportar para compatibilidad con sistema legacy
            const handler = async (m, { conn, text, usedPrefix, command }) => {
                const plugin = new HdPlugin();
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
            handler.command = [["upscale"]];
            export default handler;
        }
        finally {
        }
    }
}
//# sourceMappingURL=util-hd.js.map