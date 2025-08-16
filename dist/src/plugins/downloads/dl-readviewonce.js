// dl-readviewonce.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dlreadviewoncePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'readviewonce',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'readviewonce <parámetros>',
            aliases: ["read", "readvo", "rvo", "ver"],
            permissions: ['group'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!m.quoted)
                return await reply(m.chat, `Responde a una imagen ViewOnce.`, m);
            if (!m?.quoted || !m?.quoted?.viewOnce)
                return await reply(m.chat, `Responde a una imagen ViewOnce.`, m, fkontak);
            let buffer = await m.quoted.download(false);
            if (/videoMessage/.test(m.quoted.mtype)) {
                return conn.sendFile(m.chat, buffer, 'media.mp4', m.quoted.caption || '', m);
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
        const plugin = new ReadviewoncePlugin();
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
    command = [["read", "readvo", "rvo", "ver"]];
    handler;
    group = true;
    export;
    default;
    handler;
}
//# sourceMappingURL=dl-readviewonce.js.map