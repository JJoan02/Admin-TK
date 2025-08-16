// ai-cf.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aicfPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'cf',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'cf <parámetros>',
      aliases: ["caracruz"],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let [eleccion, cantidad] = text.split(' ');
          if (!eleccion || !cantidad) {
              return await reply(`❤️‍🔥 Por favor, elige cara o cruz y una cantidad de Chocolates 🍫 para apostar.\nEjemplo: *${usedPrefix + command
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new CfPlugin();
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

handler.command = [["caracruz"]];

export default handler;
