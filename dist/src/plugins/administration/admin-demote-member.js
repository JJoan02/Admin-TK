// admin-demote-member.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class admindemotememberPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'demote',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'demote <parámetros>',
            aliases: ["degradar"],
            permissions: ['admin'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let user = null;
            if (m.quoted) {
                user = m.quoted.sender;
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
        const plugin = new DemotePlugin();
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
    command = [["degradar"]];
    handler;
    admin = true;
    export;
    default;
    handler;
}
//# sourceMappingURL=admin-demote-member.js.map