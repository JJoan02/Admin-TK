import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class ScaredCommand extends ReactionCommand {
    constructor() {
        super('scared', 'Asustate.', ['scared', 'asustado'], ['reactions'], ['scared @tag'], 'scared', funMessages.scared.videos, '😱', false);
    }
}
//# sourceMappingURL=ScaredCommand.js.map