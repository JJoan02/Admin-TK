// info-rw.ts - Plugin mejorado y optimizado
// Categoría: bot-info
// Funcionalidad: Información del bot
// Convertido automáticamente a TypeScript con mejoras
import { BasePlugin } from '../base/BasePlugin.js';
import { InternalAPIService } from '../../api/InternalAPIService.js';
export class inforwPlugin extends BasePlugin {
    constructor() {
        super({
            name: 'rw',
            category: 'bot-info',
            description: 'Información del bot',
            usage: 'rw <parámetros>',
            aliases: ["rollwaifu"],
            permissions: ['user'],
            cooldown: 3000
        });
    }
    async execute(context) {
        const { message, args, reply, conn, text, usedPrefix, command } = context;
        const apiService = InternalAPIService.getInstance();
        try {
            try {
                // Cargar moneda o algo asi xd 
                const data = JSON.parse(await fs.readFile(filePath));
                const globalConfig = data.global;
                const defaultConfig = data.default;
                // Definicion de lo de arriba xd
                const currency = globalConfig.currency || defaultConfig.currency;
                // Carga de personajes, si no le sabes no le muevas
                const characters = await loadCharacters();
                const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
                // Mensaje de información del personaje
                const message = `
      ✨ *Nombre*: ${randomCharacter.name} catch (error) {
      console.error(`, Error, en, $, { this: , name };
            }
            finally { }
        }
        finally { }
    }
}
//# sourceMappingURL=info-rw.js.map