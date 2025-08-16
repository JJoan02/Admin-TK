// util-fijar.ts - Plugin mejorado y optimizado
// Categoría: utility-tools
// Funcionalidad: Herramientas de utilidad
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class utilfijarPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'fijar',
            category: 'utility-tools',
            description: 'Herramientas de utilidad',
            usage: 'fijar <parámetros>',
            aliases: ["unpin", "desfijar", "destacar", "desmarcar"],
            permissions: ['admin'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!m.quoted)
                return await reply(`《★》Responde a un mensaje para ${command === 'pin' ? 'fijarlo' : 'desfijarlo'} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new FijarPlugin();
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

handler.command = [["unpin","desfijar","destacar","desmarcar"]];
handler.admin = true;

export default handler;
                );
        }
        finally { }
    }
}
//# sourceMappingURL=util-fijar.js.map