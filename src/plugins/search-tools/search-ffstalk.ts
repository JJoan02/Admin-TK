// search-ffstalk.ts - Plugin mejorado y optimizado
// Categoría: search-tools
// Funcionalidad: Herramientas de búsqueda
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class searchffstalkPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'ffstalk',
      category: 'search-tools',
      description: 'Herramientas de búsqueda',
      usage: 'ffstalk <parámetros>',
      aliases: ["ffplayer"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      try {
          if (!args[0]) return await reply('📌 Por favor, proporciona el Nickname de Free Fire.')
      
          let datos = await buscarJugadorFF(args[0])
      
          if (datos.error) return await reply('❌ Error: ' + datos.error)
      
          let texto = `🔍 Resultados para: ${args[0]
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new FfstalkPlugin();
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

handler.command = [["ffplayer"]];

export default handler;
