// ai-setemoji.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aisetemojiPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'setemoji',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'setemoji <parámetros>',
      aliases: ["setemo"],
      permissions: ['admin'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) {
          return await reply('🤍 Debes proporcionar un emoji válido después del comando. Ejemplo: `.setemoji ☃️`');
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SetemojiPlugin();
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

handler.command = [["setemo"]];
handler.admin = true;

export default handler;
