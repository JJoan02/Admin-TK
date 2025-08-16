// search-ip.ts - Plugin mejorado y optimizado
// Categoría: search-tools
// Funcionalidad: Herramientas de búsqueda
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class searchipPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'ip',
      category: 'search-tools',
      description: 'Herramientas de búsqueda',
      usage: 'ip <parámetros>',
      aliases: [],
      permissions: ['owner'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      //await await reply('🧑🏻‍💻 Buscando...')
      let bot = '🧑🏻‍💻 Buscando....'
      await reply(m.chat, bot, m, rcanal, )
        if (!text) return await reply(m.chat, '🚩 *Te Faltó La <Ip>*', m, rcanal, )
      
        axios.get(`http://ip-api.com/json/${text
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new IpPlugin();
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

handler.command = ['ip'];
handler.rowner = true;

export default handler;
