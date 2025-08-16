// util-catbox.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class utilcatboxPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'catbox',
      category: 'utility-tools',
      description: 'Herramientas de utilidad',
      usage: 'catbox <parámetros>',
      aliases: ["tourl"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
      
        if (!mime) {
          return await reply('🚩 Responde a un archivo válido (imagen, video, etc.).');
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new CatboxPlugin();
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

handler.command = [["tourl"]];

export default handler;
