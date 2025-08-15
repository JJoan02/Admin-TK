import BasePlugin from './base-plugin.js';
import { SetAIModeOnCommand } from '../commands/SetAIModeOnCommand.js';
import SetAIModeOnCommandHandler from '../commandHandlers/SetAIModeOnCommandHandler.js';
import { SetAIModeOffCommand } from '../commands/SetAIModeOffCommand.js';
import SetAIModeOffCommandHandler from '../commandHandlers/SetAIModeOffCommandHandler.js';
class BotModePlugin extends BasePlugin {
    constructor() {
        super();
        this.name = 'BotMode';
        this.description = 'Gestiona los modos de operación del bot.';
        this.commands = [
            {
                name: 'on',
                alias: ['on-ia', 'on-ai'],
                description: 'Activa un modo de operación en este chat.',
                isGroupOnly: false,
                cooldown: 2,
                minArgs: 1,
                usage: 'ia',
                command: SetAIModeOnCommand,
                handler: SetAIModeOnCommandHandler,
            },
            {
                name: 'off',
                alias: ['off-ia', 'off-ai'],
                description: 'Desactiva un modo de operación en este chat.',
                isGroupOnly: false,
                cooldown: 2,
                minArgs: 1,
                usage: 'ia',
                command: SetAIModeOffCommand,
                handler: SetAIModeOffCommandHandler,
            },
        ];
    }
}
export default BotModePlugin;
//# sourceMappingURL=BotModePlugin.js.map