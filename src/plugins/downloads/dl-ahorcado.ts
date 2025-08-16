// dl-ahorcado.ts - Plugin mejorado y optimizado
// Categoría: downloads
// Funcionalidad: Descargas de contenido multimedia
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class dlahorcadoPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'ahorcado',
      category: 'downloads',
      description: 'Descargas de contenido multimedia',
      usage: 'ahorcado <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      const users = await this.database.getData().users[m.sender];
      if (gam.has(m.sender)) return await reply(m.chat, "⚠️ Ya tienes un juego en curso. ¡Termina ese primero!", m);
      
      const palabra = elegirPalabraAleatoria();
      const letrasAdivinadas = [];
      const intentos = intentosMaximos;
      const mensaje = ocultarPalabra(palabra, letrasAdivinadas);
      
      gam.set(m.sender, { palabra, letrasAdivinadas, intentos
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new AhorcadoPlugin();
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

handler.command = ['ahorcado'];

export default handler;
