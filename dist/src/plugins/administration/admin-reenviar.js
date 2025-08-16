// admin-reenviar.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminreenviarPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'reenviar',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'reenviar <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                if (!m.quoted)
                    return await reply(m.chat, `👀 Responde a un mensaje para poder usar el comando coreectamente.`, m);
                await conn.sendMessage(m.chat, { forward: m.quoted.fakeObj
                });
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
            const plugin = new ReenviarPlugin();
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
        handler.command = ['reenviar'];
        export default handler;
    }
}
//# sourceMappingURL=admin-reenviar.js.map