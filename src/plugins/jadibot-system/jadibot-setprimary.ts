// jadibot-setprimary.ts - Plugin mejorado y optimizado
// Categoría: jadibot-system
// Funcionalidad: Sistema de sub-bots
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class jadibotsetprimaryPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'setprimary',
      category: 'jadibot-system',
      description: 'Sistema de sub-bots',
      usage: 'setprimary <parámetros>',
      aliases: [],
      permissions: ['admin'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      try {
          if (!args[0] && !m.quoted) {
            return await reply(`⚠️ Menciona el número de un bot o responde al mensaje de un bot.\n> Ejemplo: *${usedPrefix
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SetprimaryPlugin();
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

handler.command = ['setprimary'];
handler.admin = true;

export default handler;
