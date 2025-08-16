// info-terminostk.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras

import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';

export class infoterminostkPlugin extends BasePlugin {
  constructor() {
    super({
      name: 'terminostk',
      category: 'bot-info',
      description: 'Información del bot',
      usage: 'terminostk <parámetros>',
      aliases: [],
      permissions: ['user'],
      cooldown: 3000
    });
  }

  async execute(context: any): Promise<void> {
    const { message, args, reply, conn, text, usedPrefix, command } = context;
    const apiService = InternalAPIService.getInstance();

    try {
      const imageUrl = 'https://files.catbox.moe/x48r2q.jpeg'; // URL de la imagen
        const text = `
      📜 *Términos, Privacidad y Condiciones de Uso* 📜
      ⚖️ *TK-HOST* ⚖️
      Consulta los detalles y políticas de nuestro servicio:
      
      🌟 *Última actualización:* *22 de diciembre de 2023*
      
      > 🔗 [Leer términos completos aquí]
      > https://github.com/JJoan02/TK-HOST/blob/main/terms.md
      
      ---
      
      ## 🔍 *Resumen de nuestras políticas*:
      
      1. *Modificaciones y Actualizaciones*
         - TK-HOST se reserva el derecho de actualizar sus políticas y condiciones sin previo aviso. Se recomienda revisar periódicamente nuestras políticas para estar al tanto de cualquier cambio.
      
      2. *Acuerdo de Uso*
         - Al utilizar cualquier servicio de TK-HOST, acepta los términos establecidos, incluidos los relacionados con licencias, uso y propiedad intelectual.
      
      3. *Derechos de Propiedad Intelectual*
         - Todo el contenido, diseños, y servicios están protegidos por las leyes aplicables. Cualquier uso indebido puede conllevar acciones legales.
      
      4. *Compras y Pagos*
         - Los pagos y transacciones realizadas a través de TK-HOST son procesados de manera segura. Ofrecemos soporte para aclaraciones a través de nuestro [use el comando](.staff).
      
      5. *Manejo de Datos*
         - Su información personal es tratada de acuerdo con nuestras políticas de privacidad, garantizando la máxima seguridad y confidencialidad.
      
      6. *Usuarios Menores de Edad*
         - Nuestros servicios están destinados únicamente para personas mayores de 18 años, cumpliendo con las normativas internacionales.
      
      ---
      
      💡 *Recomendamos leer las políticas completas para un entendimiento detallado.*
      
      👩‍💻 ¿Tienes dudas? Escríbenos a nuestro [Soporte TK-HOST]
      > (https://chat.whatsapp.com/EyoFXnaNujs53FBeqj2NM3).
      > Estamos aquí para ayudarte.
      
      🚀 ¡Gracias por confiar en TK-HOST, tu mejor aliado en hosting y tecnología!
        `.trim();
        await conn.sendFile(m.chat, imageUrl, 'terminos.jpg', text, m, null, fake);
    } catch (error) {
      console.error(`Error en ${this.name}:`, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new TerminostkPlugin();
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

handler.command = ['terminostk'];

export default handler;
