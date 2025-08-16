// ai-dash.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class aidashPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'dash',
      category: 'ai-chat',
      description: 'Inteligencia artificial y chat',
      usage: 'dash <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      const imageUrl = 'https://files.catbox.moe/afcrxd.jpeg'; // URL de la imagen
        const text = `
      🌐 *Página Principal de TK-Host* 🖥️
      
      🔗 [enlace Dashl]
      > (https://dash.tk-joanhost.com/home)
      ¡Explora todo lo que puedes hacer desde nuestra pagina principal!  
      
      📌 *Servicios disponibles*:  
      - 🆕 *Registro*: Crea tu cuenta fácilmente.  
      - 💻 *Crear servidores*: Configura tus propios servidores en minutos.  
      - 💰 *Comprar coins*: Adquiere créditos para tus proyectos.  
      - 🔧 *Gestión básica*: Ajusta configuraciones iniciales.  
      - 🌟 *Promociones y planes*: Descubre ofertas especiales.
      
      Accede ahora y comienza a disfrutar de nuestros servicios:  
        `.trim();
        await conn.sendFile(m.chat, imageUrl, 'pagina-panel.jpg', text, m, null, fake);
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new DashPlugin();
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

handler.command = ['dash'];

export default handler;
