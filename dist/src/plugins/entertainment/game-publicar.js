// game-publicar.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamepublicarPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'publicar',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'publicar <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const tipo = Math.random() < 0.5 ? 'meme' : 'video';
            if (tipo === 'meme') {
                const meme = hispamemes.meme();
                await conn.sendMessage(canal, {
                    image: { url: meme
                    }, catch(error) {
                        console.error(`Error en ${this.name}:`, error);
                        await reply('❌ Ocurrió un error al ejecutar el comando');
                    }
                });
            }
            // Exportar para compatibilidad con sistema legacy
            const handler = async (m, { conn, text, usedPrefix, command }) => {
                const plugin = new PublicarPlugin();
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
            handler.command = ['publicar'];
            export default handler;
        }
        finally {
        }
    }
}
//# sourceMappingURL=game-publicar.js.map