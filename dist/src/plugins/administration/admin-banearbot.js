// admin-banearbot.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminbanearbotPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'banearbot',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'banearbot <parámetros>',
            aliases: ["banchat"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!(isAdmin || isROwner))
                return dfail('admin', m, conn);
            await this.database.getData().chats[m.chat].isBanned;
            true;
            await await reply(m.chat, `🧑‍💻BARBOZABOT FUE DESACTIVADO EN ESTE CHAT`, m, rcanal);
            await m.react('✅');
        }
        catch (error) {
            console.error(`Error en ${this.name}:`, error);
            await reply('❌ Ocurrió un error al ejecutar el comando');
        }
    }
}
// Exportar para compatibilidad con sistema legacy
const handler = async (m, { conn, text, usedPrefix, command }) => {
    const plugin = new BanearbotPlugin();
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
handler.command = [["banchat"]];
export default handler;
//# sourceMappingURL=admin-banearbot.js.map