// dl-threads.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlthreadsPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'threads',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'threads <parámetros>',
      aliases: ["tredl"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let url = args[0] || (m.quoted && m.quoted.text)
        if (!url ||!url.includes('/post/')) {
          return await reply(`🔗 Por favor ingresa una URL de Threads válida.\nEjemplo: ${usedPrefix + command
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ThreadsPlugin();
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

handler.command = [["tredl"]];

export default handler;
