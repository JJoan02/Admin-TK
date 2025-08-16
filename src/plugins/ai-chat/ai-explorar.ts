// ai-explorar.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aiexplorarPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'explorar',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'explorar <parámetros>',
      aliases: ["adventure","bosque"],
      permissions: ['group'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let users = await this.database.getData().users
        let senderId = m.sender
        let senderName = conn.getName(senderId)
      
        // Tiempo de enfriamiento (en segundos)
        let tiempoEspera = 5 * 60
      
        // Verificar si el jugador está en tiempo de enfriamiento
        if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
          let tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
          await reply(`🌲 Ya exploraste el bosque recientemente. Espera ⏳ *${tiempoRestante
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ExplorarPlugin();
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

handler.command = [["adventure","bosque"]];
handler.group = true;

export default handler;
