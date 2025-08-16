// ai-adoptada.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aiadoptadaPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'adoptada',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'adoptada <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            // Verificar si se ha proporcionado un usuario
            if (!text) {
                return conn.sendMessage(m.chat, { text: "Por favor, menciona a un usuario. Ejemplo: .adoptada @usuario"
                });
                try { }
                catch (error) {
                    console.error(`Error en ${this.name}:`, error);
                    await reply('❌ Ocurrió un error al ejecutar el comando');
                }
            }
        }
        // Exportar para compatibilidad con sistema legacy
        finally {
        }
        // Exportar para compatibilidad con sistema legacy
        const handler = async (m, { conn, text, usedPrefix, command }) => {
            const plugin = new AdoptadaPlugin();
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
        handler.command = ['adoptada'];
        export default handler;
    }
}
//# sourceMappingURL=ai-adoptada.js.map