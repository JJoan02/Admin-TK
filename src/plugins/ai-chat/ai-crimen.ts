// ai-crimen.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aicrimenPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'crimen',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'crimen <parámetros>',
      aliases: ["crime"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let users = await this.database.getData().users
      let senderId = m.sender
      let senderName = conn.getName(senderId)
      
      let tiempo = 5 * 60
      if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
      let tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
      await reply(`🍟 Ya has cometido un Crimen recientemente, espera ⏱️ *${tiempo2
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new CrimenPlugin();
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

handler.command = [["crime"]];

export default handler;
