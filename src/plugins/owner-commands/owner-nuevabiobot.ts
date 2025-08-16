// owner-nuevabiobot.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class ownernuevabiobotPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'nuevabiobot',
      category: 'owner-commands',
      description: 'Comandos exclusivos del propietario',
      usage: 'nuevabiobot <parámetros>',
      aliases: ["setbotbot"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (!text) return await reply(m.chat, '🚩 *¡Te faltó el texto mi propietario!*', m, rcanal)
           try {
                      await conn.updateProfileStatus(text).catch(_ => _)
                      await reply(m.chat, `✅️ Info Cambiada Con Exito!`, m, rcanal)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new NuevabiobotPlugin();
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

handler.command = [["setbotbot"]];

export default handler;
