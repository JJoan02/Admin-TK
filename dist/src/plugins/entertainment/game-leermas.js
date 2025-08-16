// game-leermas.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameleermasPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'leermas',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'leermas <parámetros>',
            aliases: ["readmore"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let [l, r] = text.split `|`;
            if (!l)
                l = '';
            if (!r)
                r = '';
            function insertReadMoreEverySixWords(str) {
                let words = str.split(' ');
                let result = [];
                for (let i = 0; i < words.length; i += 6) {
                    result.push(words.slice(i, i + 6).join(' '));
                }
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
            const plugin = new LeermasPlugin();
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
        handler.command = [["readmore"]];
        export default handler;
    }
}
//# sourceMappingURL=game-leermas.js.map