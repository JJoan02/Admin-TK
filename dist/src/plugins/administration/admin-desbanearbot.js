// admin-desbanearbot.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class admindesbanearbotPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'desbanearbot',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'desbanearbot <parámetros>',
            aliases: ["unbanchat"],
            permissions: ['group'],
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
            false;
            await await reply(m.chat, '✅ Bot activo en este grupo.', m, rcanal);
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
    const plugin = new DesbanearbotPlugin();
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
handler.command = [["unbanchat"]];
handler.group = true;
export default handler;
//# sourceMappingURL=admin-desbanearbot.js.map