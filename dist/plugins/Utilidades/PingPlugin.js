import { PingCommand } from '../commands/PingCommand.js';
import PingCommandHandler from '../commandHandlers/PingCommandHandler.js';
class PingPlugin {
    constructor() {
        this.name = 'Ping';
        this.description = 'Mide el tiempo de respuesta del bot.';
        this.commands = [
            {
                name: 'ping',
                alias: ['p'],
                description: 'Responde con el tiempo de respuesta del bot.',
                permission: 'USER',
                isGroupOnly: false,
                cooldown: 5,
                command: PingCommand,
                handler: PingCommandHandler,
            },
        ];
    }
}
export default PingPlugin;
//# sourceMappingURL=PingPlugin.js.map