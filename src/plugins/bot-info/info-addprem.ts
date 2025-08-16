// info-addprem.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class infoaddpremPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'addprem',
      category: 'bot-info',
      description: 'Información del bot',
      usage: 'addprem <parámetros>',
      aliases: ["userpremium","addprem2","userpremium2","addprem3","userpremium3","addprem4","userpremium4"],
      permissions: ['owner'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo"
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new AddpremPlugin();
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

handler.command = [["userpremium","addprem2","userpremium2","addprem3","userpremium3","addprem4","userpremium4"]];
handler.rowner = true;

export default handler;
