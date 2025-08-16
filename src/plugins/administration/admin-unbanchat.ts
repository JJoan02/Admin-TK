// admin-unbanchat.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class adminunbanchatPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'unbanchat',
      category: 'administration',
      description: 'Administración de grupos y moderación',
      usage: 'unbanchat <parámetros>',
      aliases: ["desbanearchat","desbanchat"],
      permissions: ['owner'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!(m.chat in await this.database.getData().chats)) return await reply(m.chat, '🍭 *¡ESTE CHAT NO ESTÁ REGISTRADO!*', m, fake)
      let chat = await this.database.getData().chats[m.chat]
      if (!chat.isBanned) return await reply(m.chat, '🍟 *¡MEGUMIN-BOT NO ESTÁ BANEADA EN ESTE CHAT!*', m, fake)
      chat.isBanned = false
      await await reply(m.chat, '🚩 *¡MEGUMIN-BOT YA FUÉ DESBANEADA EN ESTE CHAT!*', m, fake)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new UnbanchatPlugin();
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

handler.command = [["desbanearchat","desbanchat"]];
handler.rowner = true;

export default handler;
