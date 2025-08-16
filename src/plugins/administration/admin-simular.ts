// admin-simular.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class adminsimularPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'simular',
      category: 'administration',
      description: 'Administración de grupos y moderación',
      usage: 'simular <parámetros>',
      aliases: ["simulate"],
      permissions: ['admin'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let chat = await this.database.getData().chats[m.chat];
          if (!chat.welcome) throw `⚠️ Para usar este comando debe activar las Bienvenidas con *${usedPrefix
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SimularPlugin();
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

handler.command = [["simulate"]];
handler.admin = true;

export default handler;
