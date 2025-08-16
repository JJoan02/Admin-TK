// game-togifaud.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gametogifaudPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'togifaud',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'togifaud <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!m.quoted) return await reply(m.chat, `🤍 Responde a un *Video.*`, m)
      const q = m.quoted || m
      let mime = (q.msg || q).mimetype || ''
      if (!/(mp4)/.test(mime)) return await reply(m.chat, `🤍 Responde a un *Video.*`, m)
      let media = await q.download()
      conn.sendMessage(m.chat, { video: media, gifPlayback: true, caption: '*Listo* 💣'
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new TogifaudPlugin();
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

handler.command = ['togifaud'];

export default handler;
