// jadibot-deletesesion.ts - Plugin mejorado y optimizado
// Categoría: jadibot-system
// Funcionalidad: Sistema de sub-bots
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class jadibotdeletesesionPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'deletesesion',
            category: 'jadibot-system',
            description: 'Sistema de sub-bots',
            usage: 'deletesesion <parámetros>',
            aliases: ["deletebot", "deletesession", "deletesession", "stop", "pausarbot", "bots", "listjadibots", "subbots"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
            const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command);
            const isCommand3 = /^(bots|listjadibots|subbots)$/i.test(command);
            async function reportError(e) {
                await await reply(`âœ¦ OcurriÃ³ un error inesperado`);
                console.log(e);
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
        const plugin = new DeletesesionPlugin();
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
    command = [["deletebot", "deletesession", "deletesession", "stop", "pausarbot", "bots", "listjadibots", "subbots"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=jadibot-deletesesion.js.map