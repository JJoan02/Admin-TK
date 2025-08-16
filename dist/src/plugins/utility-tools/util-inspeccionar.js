// util-inspeccionar.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class utilinspeccionarPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'inspeccionar',
            category: 'utility-tools',
            description: 'Herramientas de utilidad',
            usage: 'inspeccionar <parámetros>',
            aliases: ["channelinfo", "canalinfo", "groupinfo", "comunidadinfo"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text) {
                return await reply(m.chat, `*Uso correcto:* ${usedPrefix} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new InspeccionarPlugin();
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

handler.command = [["channelinfo","canalinfo","groupinfo","comunidadinfo"]];

export default handler;
                );
            }
        }
        finally { }
    }
}
//# sourceMappingURL=util-inspeccionar.js.map