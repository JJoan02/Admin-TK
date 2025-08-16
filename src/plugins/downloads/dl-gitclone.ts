// dl-gitclone.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlgitclonePlugin extends BasePlugin {
  constructor() {
    super({
      name: 'gitclone',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'gitclone <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      //let img = 'https://telegra.ph/file/78d5468b09fa913567731.png'
        let textbot = '🚩 ¡Bot Multi Device!'
        if (!args[0]) {
          return await reply(m.chat, `🚩 Escribe la URL de un repositorio de GitHub que deseas descargar.`, m, rcanal)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new GitclonePlugin();
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

handler.command = ['gitclone'];

export default handler;
