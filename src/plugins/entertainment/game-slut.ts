// game-slut.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gameslutPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'slut',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'slut <parámetros>',
      aliases: ["prostituirse"],
      permissions: ['group'],
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
      await reply(`🍟 Ya Te Has Postituido Recientemente, Espera ⏱️ *${tiempo2
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SlutPlugin();
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

handler.command = [["prostituirse"]];
handler.group = true;

export default handler;
