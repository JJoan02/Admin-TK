// ai-adventure.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aiadventurePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'adventure',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'adventure <parámetros>',
            aliases: ["aventura"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = await this.database.getData().users[m.sender];
            if (!user) {
                return await reply(m.chat, '👑 El usuario no se encuentra en la base de Datos.', m);
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
        const plugin = new AdventurePlugin();
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
    command = [["aventura"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=ai-adventure.js.map