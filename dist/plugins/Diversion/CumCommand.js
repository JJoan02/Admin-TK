import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class CumCommand extends ReactionCommand {
    constructor() {
        super('cum', 'Venirse.', ['cum'], ['reactions'], ['cum @tag'], 'cum', funMessages.cum.videos, '🥵', true);
    }
}
//# sourceMappingURL=CumCommand.js.map