// game-igstory.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameigstoryPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'igstory',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'igstory <parámetros>',
            aliases: ["ighistoria"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!args[0])
                throw `✳️ Ingrese un nombre de usuario\n📌Ejemplo: *${usedPrefix + command} catch (error) {
      console.error(`;
            Error;
            en;
            $;
            {
                this.name;
            }
            `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new IgstoryPlugin();
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

handler.command = [["ighistoria"]];

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=game-igstory.js.map