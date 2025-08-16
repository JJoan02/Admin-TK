// admin-del.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class admindelPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'del',
      category: 'administration',
      description: 'Administración de grupos y moderación',
      usage: 'del <parámetros>',
      aliases: ["delete"],
      permissions: ['admin'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!m.quoted) return await reply(m.chat, `🚩 Responde al mensaje que deseas eliminar.`, m, rcanal)
      try {
      let delet = m.message.extendedTextMessage.contextInfo.participant
      let bang = m.message.extendedTextMessage.contextInfo.stanzaId
      return conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new DelPlugin();
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

handler.command = [["delete"]];
handler.admin = true;

export default handler;
