// info-estado.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infoestadoPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'estado',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'estado <parámetros>',
            aliases: ["status", "estate", "state", "stado", "stats"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let _muptime;
            let totalreg = Object.keys(await this.database.getData().users).length;
            let totalchats = Object.keys(await this.database.getData().chats).length;
            let pp = "https://qu.ax/xFjxD.jpg";
            if (process.send) {
                process.send('uptime');
                _muptime = await new Promise(resolve => {
                    process.once('message', resolve);
                    setTimeout(resolve, 1000);
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
            const plugin = new EstadoPlugin();
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
        handler.command = [["status", "estate", "state", "stado", "stats"]];
        export default handler;
    }
}
//# sourceMappingURL=info-estado.js.map