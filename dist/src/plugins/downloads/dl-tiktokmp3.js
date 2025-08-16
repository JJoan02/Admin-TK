// dl-tiktokmp3.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dltiktokmp3Plugin extends BasePlugin {
    constructor() {
        super({
            name: 'tiktokmp3',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'tiktokmp3 <parámetros>',
            aliases: ["ttmp3"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!args[0]) {
                return await reply(`🎩 Ingrese una URL de TikTok\n*Ejemplo:* ${usedPrefix + command} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new Tiktokmp3Plugin();
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

handler.command = [["ttmp3"]];

export default handler;
                );
            }
        }
        finally { }
    }
}
//# sourceMappingURL=dl-tiktokmp3.js.map