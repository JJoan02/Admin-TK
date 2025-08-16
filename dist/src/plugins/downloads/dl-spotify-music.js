// dl-spotify-music.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class dlspotifymusicPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'spotify',
            category: 'downloads',
            description: 'Descargas de contenido multimedia',
            usage: 'spotify <parámetros>',
            aliases: ["music"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                throw `╰⊱❗️⊱ *ACCIÓN MAL USADA* ⊱❗️⊱╮\n\n🍟 *DEBE DE USAR EL COMANDO COMO EN ESTE EJEMPLO:*\n${usedPrefix + command} catch (error) {
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
  const plugin = new SpotifyPlugin();
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

handler.command = [["music"]];

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=dl-spotify-music.js.map