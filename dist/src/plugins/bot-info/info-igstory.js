// info-igstory.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class infoigstoryPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'igstory',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'igstory <parámetros>',
            aliases: ["ighistoria", "ighistorias"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!args[0])
                throw `${lenguajeGB['smsAvisoMG']()} catch (error) {
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
  const plugin = new IgstoryPlugin();
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

handler.command = [["ighistoria","ighistorias"]];

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=info-igstory.js.map