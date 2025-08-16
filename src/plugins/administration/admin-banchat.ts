// admin-banchat.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class adminbanchatPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'banchat',
      category: 'administration',
      description: 'Administración de grupos y moderación',
      usage: 'banchat <parámetros>',
      aliases: [],
      permissions: ['owner'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      await this.database.getData().chats[m.chat].isBanned = true
      await reply(m.chat, `✅ *La Bot Ha Sido Desactivada En Este Chat*`, m, rcanal)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new BanchatPlugin();
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

handler.command = ['banchat'];
handler.rowner = true;

export default handler;
