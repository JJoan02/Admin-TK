// game-work.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class gameworkPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'work',
            category: 'entertainment',
            description: 'Juegos y entretenimiento',
            usage: 'work <parámetros>',
            aliases: ["trabajar"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            //let hasil = Math.floor(Math.random() * 5000)
            let pp = 'https://c4.wallpaperflare.com/wallpaper/991/456/22/sketch-artist-anime-anime-girls-arknights-swire-arknights-hd-wallpaper-preview.jpg';
            let gata = Math.floor(Math.random() * 3000);
            await this.database.getData().users[m.sender].exp;
            gata * 1;
            let time = await this.database.getData().users[m.sender].lastwork + 600000;
            if (new Date - await this.database.getData().users[m.sender].lastwork < 600000)
                throw `*Ya trabajaste, espere unos ${msToTime(time - new Date())} catch (error) {
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
  const plugin = new WorkPlugin();
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

handler.command = [["trabajar"]];

export default handler;
            ;
        }
        finally { }
    }
}
//# sourceMappingURL=game-work.js.map