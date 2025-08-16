// eco-deposit.ts - Plugin mejorado y optimizado
// Categoría: economy-system
// Funcionalidad: Sistema económico
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ecodepositPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'deposit',
            category: 'economy-system',
            description: 'Sistema económico',
            usage: 'deposit <parámetros>',
            aliases: ["depositar", "d"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let userId = m.sender; // ID del usuario que ejecuta el comando
            if (!userId) {
                await reply('❌ No se pudo obtener tu ID.');
                return;
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
        const plugin = new DepositPlugin();
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
    command = [["depositar", "d"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=eco-deposit.js.map