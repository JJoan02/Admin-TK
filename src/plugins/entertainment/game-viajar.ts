// game-viajar.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class gameviajarPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'viajar',
      category: 'entertainment',
      description: 'Juegos y entretenimiento',
      usage: 'viajar <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      // Definimos algunos destinos aleatorios
          const destinos = [
              "la playa 🏖️",
              "la montaña ⛰️",
              "un bosque encantado 🌲✨",
              "una ciudad mágica 🏙️",
              "un parque de diversiones 🎢"
          ];
      
          // Elegimos un destino aleatorio
          const destinoElegido = destinos[Math.floor(Math.random() * destinos.length)];
      
          // Mensaje sobre el viaje
          const mensajeViaje = `¡Tu mascota está lista para viajar! 🐾✈️\nDestino: ${destinoElegido
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new ViajarPlugin();
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

handler.command = ['viajar'];

export default handler;
