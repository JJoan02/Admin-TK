// admin-banuser.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminbanuserPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'banuser',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'banuser <parámetros>',
            aliases: [],
            permissions: ['owner'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                return await reply('⚠️ *Ingresa el @tag de algún usuario.*');
            let who;
            if (m.isGroup)
                who = m.mentionedJid[0];
            else
                who = m.chat;
            if (!who)
                return await reply('⚠️ *Ingresa el @tag de algún usuario.*');
            let users = await this.database.getData().users;
            users[who].banned = true;
            await reply(m.chat, `⚠️ *El usuario @${who.split('@')[0]} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new BanuserPlugin();
  await plugin.execute({
    message: m,
    args: text?.split(' ') || [],
    reply: (msg: string) => conn.reply(m.chat, msg, m),
    conn,
    text,
    usedPrefix,
    command
  });
};

handler.command = ['banuser'];
handler.rowner = true;

export default handler;
            );
        }
        finally { }
    }
}
//# sourceMappingURL=admin-banuser.js.map