// jadibot-download.ts - Plugin mejorado y optimizado
// Categoría: jadibot-system
// Funcionalidad: Sistema de sub-bots
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class jadibotdownloadPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'unknown',
      category: 'jadibot-system',
      description: 'Sistema de sub-bots',
      usage: 'unknown <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let resp
      try {
      if (global.conns.some(c => c.user.jid === conn.user.jid)) {
      if (/stop/i.test(command)) {
      let i = global.conns.indexOf(conn)
      if (global.conn.user.jid != conn.user.jid && m.sender != global.conn.user.jid) {
      if (i < 0) return
      resp = `${gt
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new UnknownPlugin();
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

handler.command = ['unknown'];

export default handler;
