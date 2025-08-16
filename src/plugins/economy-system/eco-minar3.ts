// eco-minar3.ts - Plugin mejorado y optimizado
// Categoría: economy-system
// Funcionalidad: Sistema económico
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class ecominar3Plugin extends BasePlugin {
  constructor() {
    super({
      name: 'minar3',
      category: 'economy-system',
      description: 'Sistema económico',
      usage: 'minar3 <parámetros>',
      aliases: ["miming3","mine3","minardiamantes","minargemas","minardiamante"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      //lastmiming
      let user = await this.database.getData().users[m.sender]
      let premium = user.premium  
      let minar = `${pickRandom(['Que pro 😎 has minado',
      '🌟✨ Genial!! Obtienes',
      'WOW!! eres un(a) gran Minero(a) ⛏️ Obtienes',
      'Has Minado!!',
      '😲 Lograste Minar la cantidad de',
      'Tus Ingresos subiran gracias a que minaste',
      '⛏️⛏️⛏️⛏️⛏️ Minando',
      '🤩 SII!!! AHORA TIENES',
      'La minaria esta de tu lado, por ello obtienes',
      '😻 La suerte de Minar',
      '♻️ Tu Mision se ha cumplido, lograste minar',
      '⛏️ La Mineria te ha beneficiado con',
      '🛣️ Has encontrado un Lugar y por minar dicho lugar Obtienes',
      '👾 Gracias a que has minado tus ingresos suman',
      'Felicidades!! Ahora tienes','⛏️⛏️⛏️ Obtienes'])
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new Minar3Plugin();
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

handler.command = [["miming3","mine3","minardiamantes","minargemas","minardiamante"]];

export default handler;
