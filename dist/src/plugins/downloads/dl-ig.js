// dl-ig.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dligPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'ig',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'ig <parámetros>',
            aliases: ["igdl", "instagram"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!args[0]) {
                return await reply(m.chat, '*\`Ingresa El link Del vídeo a descargar 🤍\`*', m, fake);
            }
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
        const plugin = new IgPlugin();
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
    command = [["igdl", "instagram"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=dl-ig.js.map