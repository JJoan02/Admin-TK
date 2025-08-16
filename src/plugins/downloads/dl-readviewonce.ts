// dl-readviewonce.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlreadviewoncePlugin extends BasePlugin {
  constructor() {
    super({
      name: 'readviewonce',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'readviewonce <parámetros>',
      aliases: ["read","readvo","rvo","ver"],
      permissions: ['group'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!m.quoted) return await reply(m.chat, `Responde a una imagen ViewOnce.`, m)
      if (!m?.quoted || !m?.quoted?.viewOnce) return await reply(m.chat, `Responde a una imagen ViewOnce.`, m, fkontak)
      let buffer = await m.quoted.download(false);
      if (/videoMessage/.test(m.quoted.mtype)) {
      return conn.sendFile(m.chat, buffer, 'media.mp4', m.quoted.caption || '', m)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ReadviewoncePlugin();
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

handler.command = [["read","readvo","rvo","ver"]];
handler.group = true;

export default handler;
