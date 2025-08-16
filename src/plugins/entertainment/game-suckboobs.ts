// game-suckboobs.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gamesuckboobsPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'suckboobs',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'suckboobs <parámetros>',
      aliases: ["chupartetas"],
      permissions: ['group'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let who;
          if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? await m.quoted.sender : false;
          else who = m.chat;
          if (!db.data.chats[m.chat].nsfw && m.isGroup) return await reply('🚩 *¡Estos comandos están desactivados!*');
          if (!who) await reply('Etiqueta o menciona a alguien')
      
          let user = await this.database.getData().users[who];
          let name = conn.getName(who);
          let name2 = conn.getName(m.sender);
          m.react('🔥');
          let str = `${name2
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SuckboobsPlugin();
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

handler.command = [["chupartetas"]];
handler.group = true;

export default handler;
