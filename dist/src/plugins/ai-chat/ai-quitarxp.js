// ai-quitarxp.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aiquitarxpPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'quitarxp',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'quitarxp <parámetros>',
            aliases: ["restarxp"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let who;
            if (m.isGroup)
                who = m.mentionedJid[0];
            else
                who = m.chat;
            if (!who)
                throw '🚩 Menciona al usuario con *@user.*';
            let txt = text.replace('@' + who.split('@')[0], '').trim();
            if (!txt)
                throw '🚩 Ingrese la cantidad de *🌟 Experiencia* que quiere quitar.';
            if (isNaN(txt))
                throw 'Sólo números.';
            let experienciaQuitada = parseInt(txt);
            let users = await this.database.getData().users;
            // Verificar si el usuario tiene suficiente experiencia para quitar
            if (users[who].experience < experienciaQuitada)
                throw `${who.split('@')[0]} catch (error) {
      console.error(`;
            Error;
            en;
            $;
            {
                this.name;
            }
            `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new QuitarxpPlugin();
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

handler.command = [["restarxp"]];

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=ai-quitarxp.js.map