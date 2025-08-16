// ai-pokedex.ts - Plugin mejorado y optimizado
// Categoría: ai-chat
// Funcionalidad: Inteligencia artificial y chat
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class aipokedexPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'pokedex',
            category: 'ai-chat',
            description: 'Inteligencia artificial y chat',
            usage: 'pokedex <parámetros>',
            aliases: [],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            if (!text)
                return await reply(m.chat, '🚩 *¿Que Pokémon quieres buscar?.*', m, rcanal);
            await m.react(rwait);
            await reply(m.chat, `🍟 *Buscando ${text} catch (error) {
      console.error(`, Error, en, $, { this: .name }, `, error);
      await reply('❌ Ocurrió un error al ejecutar el comando');
    }
  }
}

// Exportar para compatibilidad con sistema legacy
const handler = async (m: any, { conn, text, usedPrefix, command }: any) => {
  const plugin = new PokedexPlugin();
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

handler.command = ['pokedex'];

export default handler;
            );
        }
        finally { }
    }
}
//# sourceMappingURL=ai-pokedex.js.map