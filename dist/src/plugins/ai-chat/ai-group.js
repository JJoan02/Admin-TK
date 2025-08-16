// ai-group.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aigroupPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'group',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'group <parámetros>',
            aliases: ["grupo"],
            permissions: ['admin'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => icons);
            let isClose = {
                'open': 'not_announcement',
                'close': 'announcement',
                'abierto': 'not_announcement',
                'cerrado': 'announcement',
                'abrir': 'not_announcement',
                'cerrar': 'announcement',
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
        const plugin = new GroupPlugin();
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
    command = [["grupo"]];
    handler;
    admin = true;
    export;
    default;
    handler;
}
//# sourceMappingURL=ai-group.js.map