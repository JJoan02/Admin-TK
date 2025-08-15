import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class ChaquetaCommand extends ReactionCommand {
    constructor() {
        super('chaqueta', 'Hacerle una chaqueta a alguien.', ['chaqueta'], ['reactions'], ['chaqueta @tag'], 'chaqueta', funMessages.chaqueta.videos, '😏', true);
    }
}
//# sourceMappingURL=ChaquetaCommand.js.map