// owner-añadirxp.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class ownerañadirxpPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'añadirxp',
            category: 'owner-commands',
            description: 'Comandos exclusivos del propietario',
            usage: 'añadirxp <parámetros>',
            aliases: ["añadirexp", "añadirexperiencia", "darexperiencia", "darxp", "darexp"],
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
  const plugin = new AñadirxpPlugin();
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

handler.command = [["añadirexp","añadirexperiencia","darexperiencia","darxp","darexp"]];
handler.group = true;

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=owner-a%C3%B1adirxp.js.map