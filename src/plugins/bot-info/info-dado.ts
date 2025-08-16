// info-dado.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class infodadoPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'dado',
      category: 'bot-info',
      description: 'Información del bot',
      usage: 'dado <parámetros>',
      aliases: ["dados","dadu"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let dados=[
        'https://tinyurl.com/gdd01',
        'https://tinyurl.com/gdd02',
        'https://tinyurl.com/gdd003',
        'https://tinyurl.com/gdd004',
        'https://tinyurl.com/gdd05',
        'https://tinyurl.com/gdd006'
      ]
      let url = dados[Math.floor(Math.random() * dados.length)]
      let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo"
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new DadoPlugin();
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

handler.command = [["dados","dadu"]];

export default handler;
