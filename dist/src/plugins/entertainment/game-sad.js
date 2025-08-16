// game-sad.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gamesadPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'sad',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'sad <parámetros>',
            aliases: ["triste"],
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
            if (!who)
                await reply('Etiqueta o menciona a alguien');
            let user = await this.database.getData().users[who];
            let name = conn.getName(who);
            let name2 = conn.getName(m.sender);
            m.react('😥');
            let str = `${name2} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=game-sad.js.map