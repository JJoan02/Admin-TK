// dl-ttp.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dlttpPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'ttp',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'ttp <parámetros>',
            aliases: ["ttsl", "ttph"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!args[0])
                throw '⚠️ Proporciona la URL de una presentacion de tiktok de TikTok.\n\nEjemplo:\n.ttsl https://vt.tiktok.com/ZSBy3kxKw/';
            const url = args[0];
            // Servidores con nombre y base URL
            const servers = [
                { name: 'Servidor Masha', baseUrl: masha
                }
            ];
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
        const plugin = new TtpPlugin();
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
    command = [["ttsl", "ttph"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=dl-ttp.js.map