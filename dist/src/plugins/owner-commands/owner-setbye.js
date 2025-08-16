// owner-setbye.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownersetbyePlugin extends BasePlugin {
    constructor() {
        super({
            name: 'setbye',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'setbye <parámetros>',
            aliases: ["despedida"],
            permissions: ['admin'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (text) {
                await this.database.getData().chats[m.chat].sBye;
                text;
                await reply(m.chat, lenguajeGB.smsSetB(), fkontak, m);
                //conn.sendButton(m.chat, wm, lenguajeGB['smsSetB'](), null, [[lenguajeGB.smsConMenu(), `/menu`]], fkontak, m)
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
        const plugin = new SetbyePlugin();
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
    command = [["despedida"]];
    handler;
    admin = true;
    export;
    default;
    handler;
}
//# sourceMappingURL=owner-setbye.js.map