// search-pelisplussearch.ts - Plugin mejorado y optimizado
// Categoría: search-tools
// Funcionalidad: Herramientas de búsqueda
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class searchpelisplussearchPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'pelisplussearch',
      category: 'search-tools',
      description: 'Herramientas de búsqueda',
      usage: 'pelisplussearch <parámetros>',
      aliases: ["pelisplus"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!args[0]) return await reply(m.chat, `🚩 Ingrese un título de película para buscar\n\nEjemplo:\n> *${usedPrefix + command
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new PelisplussearchPlugin();
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

handler.command = [["pelisplus"]];

export default handler;
