// tool-exif.ts - Plugin mejorado y optimizado
// Categoría: media-tools
// Funcionalidad: Herramientas multimedia y conversores
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class toolexifPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'exif',
      category: 'media-tools',
      description: 'Herramientas multimedia y conversores',
      usage: 'exif <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!args[0]) return await reply(`*⚠️ USAR DE LA SIGUIENTES MANETA\nEJEMPLO:* ${usedPrefix
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ExifPlugin();
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

handler.command = ['exif'];

export default handler;
