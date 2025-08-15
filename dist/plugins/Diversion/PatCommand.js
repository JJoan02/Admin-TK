import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PatCommand extends ReactionCommand {
    constructor() {
        super('pat', 'Da una palmadita.', ['pat', 'palmadita'], ['reactions'], ['pat @tag'], 'pat', funMessages.pat.videos, '🤚', false);
    }
}
//# sourceMappingURL=PatCommand.js.map