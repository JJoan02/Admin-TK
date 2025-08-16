// ai-masc.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aimascPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'masc',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'masc <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      // Define las recompensas
         const rewardCandies = 1000;
         const rewardXP = 1000;
      
         // Obtén la información del usuario
         let user = await this.database.getData().users[m.sender];
      
         // Verifica si el usuario ya ha reclamado la recompensa de .masc
         if (!user.hasClaimedMasc) {
            // Suma las recompensas al usuario
            user.limit += rewardCandies; // Asumiendo que 'limit' representa la cantidad de dulces
            user.exp += rewardXP; // Aumenta la experiencia del usuario
      
            // Marca que el usuario ha reclamado la recompensa
            user.hasClaimedMasc = true;
      
            await await reply(`🎉 ¡Has usado el comando *!masc*! Has recibido *${rewardCandies
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new MascPlugin();
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

handler.command = ['masc'];

export default handler;
