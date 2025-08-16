// ai-comprar.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aicomprarPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'comprar',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'comprar <parámetros>',
      aliases: ["prem1","prem2","prem3","prem4","prem5","prem6","prem7","prem8","premium","vip","prem","pass","pase"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let toUser = `${m.sender.split("@")[0]
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ComprarPlugin();
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

handler.command = [["prem1","prem2","prem3","prem4","prem5","prem6","prem7","prem8","premium","vip","prem","pass","pase"]];

export default handler;
