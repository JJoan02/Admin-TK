// ai-chetarki.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aichetarkiPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'chetarki',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'chetarki <parámetros>',
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
            users[m.sender].limit = Infinity;
            await await reply('¡Ahora tienes *KI infinito*! 🎉');
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new ChetarkiPlugin();
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
handler.command = ['chetarki'];
export default handler;
//# sourceMappingURL=ai-chetarki.js.map