// game-audioefectomenu.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameaudioefectomenuPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'audioefectomenu',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'audioefectomenu <parámetros>',
            aliases: ["buscarmenu", "hornymenu", "listaporno", "listhorny", "convertidormenu", "descargasmenu", "juegosmenu", "grupomenu", "herramientasmenu", "infomenu", "makermenu", "menulogos2", "ownermenu", "randommenu", "rpgmenu", "stickermenu", "menu18", "menugrupo"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                const { levelling };
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
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new AudioefectomenuPlugin();
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
        handler.command = [["buscarmenu", "hornymenu", "listaporno", "listhorny", "convertidormenu", "descargasmenu", "juegosmenu", "grupomenu", "herramientasmenu", "infomenu", "makermenu", "menulogos2", "ownermenu", "randommenu", "rpgmenu", "stickermenu", "menu18", "menugrupo"]];
        export default handler;
    }
}
//# sourceMappingURL=game-audioefectomenu.js.map