import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PeleaCommand extends ReactionCommand {
    constructor() {
        super('pelea', 'Pelear con alguien.', ['pelea'], ['reactions'], ['pelea @tag'], 'pelea', funMessages.pelea.videos, '💥', false);
    }
}
//# sourceMappingURL=PeleaCommand.js.map