// ai-quitarmonedas.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aiquitarmonedasPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'quitarmonedas',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'quitarmonedas <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      let users = await this.database.getData().users;
          let user = users[m.sender];
      
          // Verificar que se haya proporcionado la cantidad de monedas a quitar
          if (!args[0] || isNaN(args[0]) || args[0] <= 0) {
              return await reply("⚠️ Por favor, indica la cantidad de monedas que deseas quitar.");
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new QuitarmonedasPlugin();
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

handler.command = ['quitarmonedas'];

export default handler;
