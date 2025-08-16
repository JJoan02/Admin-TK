// ai-totalfunciones.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aitotalfuncionesPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'totalfunciones',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'totalfunciones <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
            await reply(m.chat, `*🫰🏻 Total de Funciones* : ${totalf} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new TotalfuncionesPlugin();
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

handler.command = ['totalfunciones'];

export default handler;
            );
        }
        finally { }
    }
}
//# sourceMappingURL=ai-totalfunciones.js.map