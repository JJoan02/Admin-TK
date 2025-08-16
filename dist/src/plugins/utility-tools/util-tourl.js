// util-tourl.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class utiltourlPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'tourl',
            category: 'utility-tools',
            description: 'Herramientas de utilidad',
            usage: 'tourl <parámetros>',
            aliases: ["catbox"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let q = m.quoted ? m.quoted : m;
            let mime = (q.msg || q).mimetype || '';
            if (!mime)
                return await reply(m.chat, '🍃 Responde a una *Imagen* o *Vídeo.*', m);
            try {
                let media = await q.download();
                let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
                let link = await (isTele ? uploadImage : uploadFile)(media);
                let img = await (await fetch(`${link} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new TourlPlugin();
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

handler.command = [["catbox"]];

export default handler;
                ));
            }
            finally { }
        }
        finally { }
    }
}
//# sourceMappingURL=util-tourl.js.map