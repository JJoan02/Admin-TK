// owner-setwelcome.ts - Plugin mejorado y optimizado
// Categoría: owner-commands
// Funcionalidad: Comandos exclusivos del propietario
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class ownersetwelcomePlugin extends BasePlugin {
  constructor() {
    super({
      name: 'setwelcome',
      category: 'owner-commands',
      description: 'Comandos exclusivos del propietario',
      usage: 'setwelcome <parámetros>',
      aliases: ["bienvenida"],
      permissions: ['admin'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      if (text) {
      await this.database.getData().chats[m.chat].sWelcome = text
      await reply(m.chat, lenguajeGB.smsSetW(), fkontak, m)
      //conn.sendButton(m.chat, wm, lenguajeGB['smsSetW'](), null, [[lenguajeGB.smsConMenu(), `/menu`]], fkontak, m)
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new SetwelcomePlugin();
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

handler.command = [["bienvenida"]];
handler.admin = true;

export default handler;
