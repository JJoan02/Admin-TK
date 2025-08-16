// tool-download.ts - Plugin mejorado y optimizado
// Categoría: media-tools
// Funcionalidad: Herramientas multimedia y conversores
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class tooldownloadPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'unknown',
            category: 'media-tools',
            description: 'Herramientas multimedia y conversores',
            usage: 'unknown <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (args.length < 3)
                return await reply(`🔹 *Uso correcto:* ${usedPrefix} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new UnknownPlugin();
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

handler.command = ['unknown'];

export default handler;
                );
        }
        finally { }
    }
}
//# sourceMappingURL=tool-download.js.map