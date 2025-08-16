// game-s.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamesPlugin extends BasePlugin {
    constructor() {
        super({
            name: 's',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 's <parámetros>',
            aliases: ["sticker", "stiker"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let stiker = false;
            try {
                let q = m.quoted ? m.quoted : m;
                let mime = (q.msg || q).mimetype || q.mediaType || '';
                if (/webp|image|video/g.test(mime)) {
                    if (/video/g.test(mime))
                        if ((q.msg || q).seconds > 8)
                            return await reply(`☁️ *¡El video no puede durar mas de 8 segundos!*`);
                    let img = await q.download?.();
                    if (!img)
                        return await reply(m.chat, `⚠️ *_La conversión ha fallado, intenta enviar primero imagen/video/gif y luego responde con el comando._*`, m, rcanal);
                    let out;
                    try {
                        stiker = await sticker(img, false, global.packsticker, global.author);
                    }
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
                const plugin = new SPlugin();
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
            handler.command = [["sticker", "stiker"]];
            export default handler;
        }
        finally {
        }
    }
}
//# sourceMappingURL=game-s.js.map