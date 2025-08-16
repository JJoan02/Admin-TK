// info-bloqueados.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class infobloqueadosPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'bloqueados',
      category: 'bot-info',
      description: 'Información del bot',
      usage: 'bloqueados <parámetros>',
      aliases: ["bloqueadoslista","listablock","blocklist","listblock","listabloqueados"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let grupos = [soporteGB, grupo1, grupo2, grupo3, grupo4, grupo5]
      let gata = [img5, img6, img7, img8, img9]
      let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo"
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new BloqueadosPlugin();
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

handler.command = [["bloqueadoslista","listablock","blocklist","listblock","listabloqueados"]];

export default handler;
