// dl-quemusica.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlquemusicaPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'quemusica',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'quemusica <parámetros>',
      aliases: ["quemusicaes","whatmusic"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let q = m.quoted ? m.quoted : m
      let mime = (q.msg || q).mimetype || ''
      if (/audio|video/.test(mime)) { if ((q.msg || q).seconds > 20) return await reply('᥀·࣭࣪̇˖⚙️◗ 𝙀𝙡 𝙖𝙧𝙘𝙝𝙞𝙫𝙤 𝙚𝙨 𝙙𝙚𝙢𝙖𝙨𝙞𝙖𝙙𝙤 𝙜𝙧𝙖𝙣𝙙𝙚, 𝙧𝙚𝙘𝙤𝙧𝙩𝙚𝙡𝙤 𝙢𝙞𝙣𝙞𝙢𝙤 𝙙𝙚 10 𝙖 20 𝙨𝙚𝙜𝙪𝙣𝙙𝙤𝙨 𝙥𝙖𝙧𝙖 𝙗𝙪𝙨𝙘𝙖𝙧 𝙧𝙚𝙨𝙪𝙡𝙩𝙖𝙙𝙤𝙨.')
      await await reply(m.chat, wait, m)
      let media = await q.download()
      let ext = mime.split('/')[1]
      fs.writeFileSync(`./megumin/tmp/${m.sender
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new QuemusicaPlugin();
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

handler.command = [["quemusicaes","whatmusic"]];

export default handler;
