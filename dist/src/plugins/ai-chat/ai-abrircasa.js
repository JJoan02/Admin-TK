// ai-abrircasa.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aiabrircasaPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'abrircasa',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'abrircasa <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            const user = await this.database.getData().users[m.sender];
            const now = new Date();
            // Inicializa las propiedades si no existen
            if (!user.walletSweets)
                user.walletSweets = 0;
            if (!user.walletXP)
                user.walletXP = 0;
            // Verifica si el usuario puede abrir la casa
            if (user.lastCasa && now - user.lastCasa < 1000) { // 1 segundo en milisegundos
                const timeLeft = Math.ceil((1000 - (now - user.lastCasa)) / 1000); // Tiempo restante en segundos
                return await reply(m.chat, `⏳ Debes esperar ${timeLeft} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new AbrircasaPlugin();
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

handler.command = ['abrircasa'];

export default handler;
                );
            }
        }
        finally { }
    }
}
//# sourceMappingURL=ai-abrircasa.js.map