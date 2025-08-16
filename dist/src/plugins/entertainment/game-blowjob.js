// game-blowjob.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameblowjobPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'blowjob',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'blowjob <parámetros>',
            aliases: ["mamar", "mamada"],
            permissions: ['group'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let who;
            if (m.isGroup)
                who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? await m.quoted.sender : false;
            else
                who = m.chat;
            if (!db.data.chats[m.chat].nsfwhot && m.isGroup)
                throw await reply(m.chat, '🚩 *¡Estos comandos están desactivados!*', m, fake);
            if (!who)
                await reply('Etiqueta o menciona a alguien');
            let user = await this.database.getData().users[who];
            let name = conn.getName(who);
            let name2 = conn.getName(m.sender);
            m.react('🔥');
            let str = `${name2} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=game-blowjob.js.map