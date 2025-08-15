import BasePlugin from './base-plugin.js';
import { PromoteCommand } from '../commands/PromoteCommand.js';
import PromoteCommandHandler from '../commandHandlers/PromoteCommandHandler.js';
class PromotePlugin extends BasePlugin {
    constructor() {
        super();
        this.name = 'Promote';
        this.description = 'Promueve a uno o más miembros a administradores.';
        this.commands = [
            {
                name: 'promote',
                alias: ['ascender', 'daradmin'],
                description: 'Promueve a un miembro a administrador.',
                permission: 'GROUP_ADMIN',
                isGroupOnly: true,
                cooldown: 5,
                usage: '@miembro1 @miembro2',
                command: PromoteCommand,
                handler: PromoteCommandHandler,
            },
        ];
    }
}
export default PromotePlugin;
//# sourceMappingURL=PromotePlugin.js.map