import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PostresCommand extends ReactionCommand {
    constructor() {
        super('postres', 'Prepararle un postre a alguien.', ['postres'], ['reactions'], ['postres @tag'], 'postres', funMessages.postres.videos, '🍰', false);
    }
}
//# sourceMappingURL=PostresCommand.js.map