// admin-bank.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminbankPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'bank',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'bank <parámetros>',
            aliases: ["banco"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
            if (who == conn.user.jid)
                return m.react('✖️');
            if (!(who in await this.database.getData().users))
                return await reply(`*El usuario no se encuentra en mi base de datos*`);
            let user = await this.database.getData().users[who];
            const texto = `${who == m.sender ? `🌵 Tienes: *${user.bank} catch (error) {
      console.error(` : , Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=admin-bank.js.map