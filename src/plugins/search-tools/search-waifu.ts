// search-waifu.ts - Plugin mejorado y optimizado
// Categoría: search-tools
// Funcionalidad: Herramientas de búsqueda
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class searchwaifuPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'waifu',
      category: 'search-tools',
      description: 'Herramientas de búsqueda',
      usage: 'waifu <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      await m.react('🕓')
      try {
      let res = await fetch('https://api.waifu.pics/sfw/waifu')
      if (!res.ok) return
      let json = await res.json()
      if (!json.url) return 
      await conn.sendFile(m.chat, json.url, 'thumbnail.jpg', listo, m, null, rcanal)
      await m.react('✅')
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new WaifuPlugin();
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

handler.command = ['waifu'];

export default handler;
