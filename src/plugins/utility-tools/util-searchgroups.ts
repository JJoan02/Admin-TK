// util-searchgroups.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class utilsearchgroupsPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'searchgroups',
      category: 'utility-tools',
      description: 'Herramientas de utilidad',
      usage: 'searchgroups <parámetros>',
      aliases: ["buscargrupos","grupos"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) {
          throw `*⚠️ INGRESE PALABRAS CLAVE PARA BUSCAR GRUPOS*\n\n*📝 Ejemplo de uso:*\n${usedPrefix + command
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SearchgroupsPlugin();
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

handler.command = [["buscargrupos","grupos"]];

export default handler;
