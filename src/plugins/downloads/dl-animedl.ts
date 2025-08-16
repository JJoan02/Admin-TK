// dl-animedl.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlanimedlPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'animedl',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'animedl <parámetros>',
      aliases: ["animeflvdl","anidl"],
      permissions: ['group'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      try {
              if (!args[0]) return await reply(`𝙻𝚘 𝚊𝚗𝚍𝚊𝚜 𝚑𝚊𝚌𝚒𝚎𝚗𝚍𝚘 𝚖𝚊𝚕 𝚝𝚎 𝚐𝚞𝚒𝚊𝚛𝚎 ${usedPrefix + command
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new AnimedlPlugin();
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

handler.command = [["animeflvdl","anidl"]];
handler.group = true;

export default handler;
