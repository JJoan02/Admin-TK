// jadibot-inventario.ts - Plugin mejorado y optimizado
// Categoría: jadibot-system
// Funcionalidad: Sistema de sub-bots
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class jadibotinventarioPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'inventario',
      category: 'jadibot-system',
      description: 'Sistema de sub-bots',
      usage: 'inventario <parámetros>',
      aliases: ["inv"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender;
      
          if (!(who in await this.database.getData().users)) {
              return await reply(m.chat, '👤 El usuario no se encuentra en mi base de Datos.', m);
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new InventarioPlugin();
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

handler.command = [["inv"]];

export default handler;
