// anime-winfo.ts - Plugin mejorado y optimizado
// Categoría: anime-manga
// Funcionalidad: Contenido de anime y manga
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class animewinfoPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'winfo',
            category: 'anime-manga',
            description: 'Contenido de anime y manga',
            usage: 'winfo <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!args[0]) {
                return await reply(`🔎 Usa el comando así:\n${usedPrefix + command} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new WinfoPlugin();
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

handler.command = ['winfo'];

export default handler;
                );
            }
        }
        finally { }
    }
}
//# sourceMappingURL=anime-winfo.js.map