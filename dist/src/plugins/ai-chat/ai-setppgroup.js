// ai-setppgroup.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aisetppgroupPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'setppgroup',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'setppgroup <parámetros>',
            aliases: ["setgrouppic"],
            permissions: ['admin'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let newImage = args[0];
            if (!newImage || !fs.existsSync(newImage)) {
                return await reply('「✦」 Por favor, proporciona una ruta válida para la nueva imagen.');
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
        const plugin = new SetppgroupPlugin();
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
    command = [["setgrouppic"]];
    handler;
    admin = true;
    export;
    default;
    handler;
}
//# sourceMappingURL=ai-setppgroup.js.map