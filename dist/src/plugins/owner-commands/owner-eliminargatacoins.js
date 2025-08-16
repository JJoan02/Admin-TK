// owner-eliminargatacoins.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownereliminargatacoinsPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'eliminargatacoins',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'eliminargatacoins <parámetros>',
            aliases: ["eliminargata", "eliminarcoins", "quitargatacoins", "quitargata", "quitarcoins", "delgatacoins", "delgata", "delcoins"],
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
                who = m.mentionedJid[0];
            else
                who = m.chat;
            if (!who)
                throw `${ag} catch (error) {
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
  const plugin = new EliminargatacoinsPlugin();
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

handler.command = [["eliminargata","eliminarcoins","quitargatacoins","quitargata","quitarcoins","delgatacoins","delgata","delcoins"]];
handler.group = true;

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=owner-eliminargatacoins.js.map