import BasePlugin from './base-plugin.js';
import { ToImageCommand } from '../commands/ToImageCommand.js';
import ToImageCommandHandler from '../commandHandlers/ToImageCommandHandler.js';
class ToImagePlugin extends BasePlugin {
    constructor() {
        super();
        this.name = 'ToImage';
        this.description = 'Convierte stickers (WebP) a imágenes (PNG/JPG).';
        this.commands = [
            {
                name: 'toimg',
                alias: ['img', 'jpg'],
                description: 'Responde a un sticker para convertirlo en imagen.',
                permission: 'USER',
                isGroupOnly: false,
                cooldown: 5,
                usage: '<responder a un sticker>',
                command: ToImageCommand,
                handler: ToImageCommandHandler,
            },
        ];
    }
}
export default ToImagePlugin;
//# sourceMappingURL=ToImagePlugin.js.map