// info-reglaslideres.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class inforeglaslideresPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'reglaslideres',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'reglaslideres <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let time = await this.database.getData().users[m.sender].lastcofre + 0; // 36000000 10 Horas //86400000 24 Horas
            if (new Date - await this.database.getData().users[m.sender].lastcofre < 0)
                throw `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\𝚗𝚅𝚄𝙴𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())} catch (error) {
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
  const plugin = new ReglaslideresPlugin();
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

handler.command = ['reglaslideres'];

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=info-reglaslideres.js.map