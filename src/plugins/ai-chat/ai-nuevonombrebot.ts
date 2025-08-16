// ai-nuevonombrebot.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class ainuevonombrebotPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'nuevonombrebot',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'nuevonombrebot <parámetros>',
      aliases: ["nuevonombre","cambianombre"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) return await reply(m.chat, `🚩 *Que Nombre Deseas Ponerme?*`, m, rcanal)
        try {
          await conn.updateProfileName(text)
          return await reply(m.chat, '✅️ *Nombre Cambiado Con Éxito*', m, rcanal)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new NuevonombrebotPlugin();
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

handler.command = [["nuevonombre","cambianombre"]];

export default handler;
