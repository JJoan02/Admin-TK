// info-nexterra.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class infonexterraPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'nexterra',
      category: 'bot-info',
      description: 'Información del bot',
      usage: 'nexterra <parámetros>',
      aliases: [],
      permissions: ['admin'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let time = await this.database.getData().users[m.sender].lastcofre + 86400000; // 86400000 24 Horas
          if (new Date() - await this.database.getData().users[m.sender].lastcofre < 0) {
              throw `[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚁𝙴𝙲𝙻𝙰𝙼𝙰𝚂𝚃𝙴 𝚃𝚄 𝙲𝙾𝙵𝚁𝙴\n𝚅𝙾𝙻𝚅𝙴 𝙴𝙽 *${msToTime(time - new Date())
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new NexterraPlugin();
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

handler.command = ['nexterra'];
handler.admin = true;

export default handler;
