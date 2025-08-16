// info-deletesesion.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infodeletesesionPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'deletesesion',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'deletesesion <parámetros>',
            aliases: ["deletebot", "deletesession", "deletesession", "stop", "pausarai", "pausarbot", "bots", "sockets", "socket"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let img = await (await fetch(`https://i.ibb.co/cDcj6bv/ee415abc-626b-4659-9a9e-a313c159512b.png`)).buffer();
            const isCommand1 = /^(deletesesion|deletebot|deletesession|deletesesaion)$/i.test(command);
            const isCommand2 = /^(stop|pausarai|pausarbot)$/i.test(command);
            const isCommand3 = /^(bots|sockets|socket)$/i.test(command);
            async function reportError(e) {
                await await reply(`🌻 Ocurrió un error.`);
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
    command = [["deletebot", "deletesession", "deletesession", "stop", "pausarai", "pausarbot", "bots", "sockets", "socket"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=info-deletesesion.js.map