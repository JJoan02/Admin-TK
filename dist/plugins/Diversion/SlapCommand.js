import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class SlapCommand extends ReactionCommand {
    constructor() {
        super('slap', 'Da una bofetada.', ['slap', 'bofetada'], ['reactions'], ['slap @tag'], 'slap', funMessages.slap.videos, '👋', false);
    }
}
//# sourceMappingURL=SlapCommand.js.map