// admin-editautoresponder.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class admineditautoresponderPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'editautoresponder',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'editautoresponder <parámetros>',
            aliases: ["autoresponder"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!(isOwner || isAdmin || isROwner)) {
                await reply(m.chat, "🚩 Losiento no puedes personalizar el autoresponder en este grupo/chat.", m);
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
        const plugin = new EditautoresponderPlugin();
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
    command = [["autoresponder"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=admin-editautoresponder.js.map