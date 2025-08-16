// eco-rob.ts - Plugin mejorado y optimizado
// Categoría: economy-system
// Funcionalidad: Sistema económico
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ecorobPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'rob',
            category: 'economy-system',
            description: 'Sistema económico',
            usage: 'rob <parámetros>',
            aliases: ["robar", "crime"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let userId = m.sender;
            let args = text.split(' ');
            let target = args[0];
            let db = readJSON(dbPath);
            let userData = db[userId] || { money: 0, bank: 0
            };
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
        const plugin = new RobPlugin();
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
    command = [["robar", "crime"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=eco-rob.js.map