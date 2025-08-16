// ai-ganarmonedas.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aiganarmonedasPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'ganarmonedas',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'ganarmonedas <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let users = await this.database.getData().users;
            let user = users[m.sender];
            // Obtener la fecha actual
            let today = new Date().toDateString();
            // Verificar si el usuario ya reclamó sus monedas hoy
            if (user.lastClaimedMonedas === today) {
                return await reply("🚫 Ya has reclamado tus monedas hoy. Vuelve mañana para recibir más.");
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
        const plugin = new GanarmonedasPlugin();
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
    command = ['ganarmonedas'];
    export;
    default;
    handler;
}
//# sourceMappingURL=ai-ganarmonedas.js.map