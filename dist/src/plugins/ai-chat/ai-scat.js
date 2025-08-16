// ai-scat.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aiscatPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'scat',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'scat <parámetros>',
            aliases: ["stickercat", "cats"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let res = await fetch('https://nekos.life/api/v2/img/meow');
            let json = await res.json();
            let stiker = await sticker(null, json.url, global.packname, global.author);
            if (stiker)
                return conn.sendFile(m.chat, stiker, 'sticker.gif', '', m, false, {
                    asSticker: true
                });
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
    handler = async (m, { conn, text, usedPrefix, command }) => {
        const plugin = new ScatPlugin();
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
    handler;
    command = [["stickercat", "cats"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=ai-scat.js.map