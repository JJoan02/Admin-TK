// ai-salir.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aisalirPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'salir',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'salir <parámetros>',
            aliases: ["leavegc", "salirdelgrupo", "leave"],
            permissions: ['owner'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let id = text ? text : m.chat;
            await conn.groupLeave(id);
            try {
            }
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
        const plugin = new SalirPlugin();
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
    command = [["leavegc", "salirdelgrupo", "leave"]];
    handler;
    rowner = true;
    export;
    default;
    handler;
}
//# sourceMappingURL=ai-salir.js.map