// eco-navidad.ts - Plugin mejorado y optimizado
// Categoría: economy-system
// Funcionalidad: Sistema económico
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class econavidadPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'navidad',
      category: 'economy-system',
      description: 'Sistema económico',
      usage: 'navidad <parámetros>',
      aliases: ["navidad2","christmas"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let user = await this.database.getData().users[m.sender]
      let premium = user.premium
      
      const getRandomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
      
      let exp = getRandomInRange(1500, 5000)
      let exppremium = getRandomInRange(5001, 10000)
      
      let money = getRandomInRange(800, 4000)
      let moneypremium = getRandomInRange(4001, 7500)
      
      let potion = getRandomInRange(1, 3)
      let potionpremium = getRandomInRange(4, 5)
      
      let tiketcoin = getRandomInRange(1, 2)
      let tiketcoinpremium = getRandomInRange(3, 5)
      
      let eleksirb = getRandomInRange(1, 4)
      let eleksirbpremium = getRandomInRange(5, 8)
      
      let umpan = getRandomInRange(10, 50)
      let umpanpremium = getRandomInRange(51, 100)
      
      const recompensas = {	
        exp: premium ? exppremium : exp,
        money: premium ? moneypremium : money,
        potion: premium ? potionpremium : potion,
        tiketcoin: premium ? tiketcoinpremium : tiketcoin,	
        eleksirb: premium ? eleksirbpremium : eleksirb,
        umpan: premium ? umpanpremium : umpan,
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new NavidadPlugin();
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

handler.command = [["navidad2","christmas"]];

export default handler;
