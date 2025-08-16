// game-nivel.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamenivelPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'nivel',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'nivel <parámetros>',
            aliases: ["lvl", "levelup", "level"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let img = await (await fetch(`https://telegra.ph/file/b97148e2154508f63d909.jpg`)).buffer();
            let name = conn.getName(m.sender);
            let user = await this.database.getData().users[m.sender];
            if (!canLevelUp(user.level, user.exp, global.multiplier)) {
                let { min, xp, max };
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
            const plugin = new NivelPlugin();
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
        handler.command = [["lvl", "levelup", "level"]];
        export default handler;
    }
}
//# sourceMappingURL=game-nivel.js.map