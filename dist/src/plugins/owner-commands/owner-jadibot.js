// owner-jadibot.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownerjadibotPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'jadibot',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'jadibot <parámetros>',
            aliases: ["serbot"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!await this.database.getData().settings[_0x3b0d31.user.jid].jadibotmd) {
                return _0x3b0d31.reply(_0x229076.chat, "☁️ Este Comando está deshabilitado por mi creador.", _0x229076, rcanal);
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
        const plugin = new JadibotPlugin();
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
    command = [["serbot"]];
    export;
    default;
    handler;
}
//# sourceMappingURL=owner-jadibot.js.map