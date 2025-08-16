// util-skiplink.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class utilskiplinkPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'skiplink',
      category: 'utility-tools',
      description: 'Herramientas de utilidad',
      usage: 'skiplink <parámetros>',
      aliases: ["skiplinksub4unlock"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) return await reply(`Contoh : .skiplink https://sub4unlock.co/S9oU0`);
          await reply('wett')
          try {
              let api = `https://fgsi.koyeb.app/api/tools/skip/sub4unlock?apikey=APIKEY&url=${encodeURIComponent(text)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SkiplinkPlugin();
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

handler.command = [["skiplinksub4unlock"]];

export default handler;
