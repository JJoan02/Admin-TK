// admin-listaadv.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class adminlistaadvPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'listaadv',
            category: 'administration',
            description: 'Administración de grupos y moderación',
            usage: 'listaadv <parámetros>',
            aliases: ["listadv", "adv", "advlist", "advlista"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            let adv = Object.entries(await this.database.getData().users).filter(user => user[1].warn);
            let warns = await this.database.getData().users.warn;
            let user = await this.database.getData().users;
            let caption = `⚠️ 𝙐𝙎𝙐𝘼𝙍𝙄𝙊𝙎 𝘼𝘿𝙑𝙀𝙍𝙏𝙄𝘿𝙊𝙎
      *╭•·–––––––––––––––––––·•*
      │ *Total : ${adv.length} catch (error) {
      console.error(`, Error, en, $, { this: , name };
        }
        finally { }
    }
}
//# sourceMappingURL=admin-listaadv.js.map