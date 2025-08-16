// eco-wallet.ts - Plugin mejorado y optimizado
// Categoría: economy-system
// Funcionalidad: Sistema económico
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ecowalletPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'wallet',
            category: 'economy-system',
            description: 'Sistema económico',
            usage: 'wallet <parámetros>',
            aliases: ["cartera", "dulces", "bal", "coins"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
            // Verifica si el usuario está en la base de datos
            if (!(who in await this.database.getData().users)) {
                return await reply(m.chat, 'El usuario no se encuentra en mi base de Datos.', m);
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
        const plugin = new WalletPlugin();
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
    command = [["cartera", "dulces", "bal", "coins"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=eco-wallet.js.map