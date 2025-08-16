// dl-ytmp3doc.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlytmp3docPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'ytmp3doc',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'ytmp3doc <parámetros>',
      aliases: ["mp3doc","ytmp4doc","mp4doc","ytadoc","ytvdoc"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!args[0]) return await reply(`🍭 Ingresa Un Link De YouTube.`);
      
      let pene = await(await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${args[0]
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new Ytmp3docPlugin();
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

handler.command = [["mp3doc","ytmp4doc","mp4doc","ytadoc","ytvdoc"]];

export default handler;
