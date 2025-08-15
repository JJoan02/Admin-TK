import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class AgarrarTetasCommand extends ReactionCommand {
    constructor() {
        super('agarrartetas', 'Agarrarle las tetas a alguien.', ['agarrartetas'], ['reactions'], ['agarrartetas @tag'], 'agarrartetas', funMessages.agarrartetas.videos, '😈', true);
    }
}
//# sourceMappingURL=AgarrarTetasCommand.js.map