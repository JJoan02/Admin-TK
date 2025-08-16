// admin-encuesta.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class adminencuestaPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'encuesta',
      category: 'administration',
      description: 'Administración de grupos y moderación',
      usage: 'encuesta <parámetros>',
      aliases: ["poll"],
      permissions: ['group'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      text = text.split(`|`)
              if (!text || text.length == 1) return await reply(m.chat, `🚩 Ingresa la pregunta y opciones.\n\n*Ejemplo:*\n*${usedPrefix + command
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new EncuestaPlugin();
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

handler.command = [["poll"]];
handler.group = true;

export default handler;
