// admin-listadv.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class adminlistadvPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'listadv',
      category: 'administration',
      description: 'Administración de grupos y moderación',
      usage: 'listadv <parámetros>',
      aliases: ["listaadv","listadv","adv","advlist","advlista"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let adv = Object.entries(await this.database.getData().users).filter(user => user[1].warn)
      let warns = await this.database.getData().users.warn
      let user = await this.database.getData().users
      
      let caption = `⚠️ 𝙐𝙎𝙐𝘼𝙍𝙄𝙊𝙎 𝘼𝘿𝙑𝙀𝙍𝙏𝙄𝘿𝙊𝙎
      *╭•·–––––––––––––––––––·•*
      │ *Total : ${adv.length
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ListadvPlugin();
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

handler.command = [["listaadv","listadv","adv","advlist","advlista"]];

export default handler;
