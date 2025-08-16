// game-buycoins.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gamebuycoinsPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'buycoins',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'buycoins <parámetros>',
      aliases: ["buyall","buy"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let count = command.replace(/^buycoins/i, '')
        count = count ? /all/i.test(count) ? Math.floor(await this.database.getData().users[m.sender].exp / xpperlimit) : parseInt(count) : args[0] ? parseInt(args[0]) : 1
        count = Math.max(1, count)
        if (await this.database.getData().users[m.sender].exp >= xpperlimit * count) {
          await this.database.getData().users[m.sender].exp -= xpperlimit * count
          await this.database.getData().users[m.sender].limit += count
          await reply(m.chat, `╭────═[ *R P G  -  B U Y* ]═─────⋆
      │╭───────────────···
      ││✯ *Compra* : + ${count
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new BuycoinsPlugin();
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

handler.command = [["buyall","buy"]];

export default handler;
