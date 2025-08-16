// game-bank.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gamebankPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'bank',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'bank <parámetros>',
      aliases: ["banco"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
         if (who == conn.user.jid) return m.react('✖️')
         if (!(who in await this.database.getData().users)) return await reply(`*El usuario no se encuentra en mi base de datos*`)
         let user = await this.database.getData().users[who]
         let name = conn.getName(who);
         let txt = (`${who == m.sender ? `╭━〔  ${global.packname
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new BankPlugin();
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

handler.command = [["banco"]];

export default handler;
