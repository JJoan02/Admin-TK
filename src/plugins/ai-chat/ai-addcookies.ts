// ai-addcookies.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aiaddcookiesPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'addcookies',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'addcookies <parámetros>',
      aliases: ["addcookie","addgalletas"],
      permissions: ['owner'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let who
          if (m.isGroup) who = m.mentionedJid[0]
          else who = m.chat
          if (!who) return await reply('⚠️️ *Taguea al usuario*')
          let txt = text.replace('@' + who.split`@`[0], '').trim()
          if (!txt) return await reply('⚠️️ Ingrese la cantidad de *Galletas* que quiere añadir')
          if (isNaN(txt)) return await reply('⚠️ *sólo números*')
          let dmt = parseInt(txt)
          let cookies = dmt
          let pjk = Math.ceil(dmt * impts)
          cookies += pjk
          if (cookies < 1) return await reply('⚠️️ Mínimo es  *1*')
          let users = await this.database.getData().users
         users[who].cookies += dmt
      
          await await reply(m.chat, `⊜ *🍪 AÑADIDO*
      ┏━━━━━━━━━━━⬣
      ┃⋄ *Total:* ${dmt
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new AddcookiesPlugin();
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

handler.command = [["addcookie","addgalletas"]];
handler.rowner = true;

export default handler;
