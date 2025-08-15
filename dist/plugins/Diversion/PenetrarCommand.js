import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PenetrarCommand extends ReactionCommand {
    constructor() {
        super('penetrar', 'Penetrar a alguien.', ['penetrar'], ['reactions'], ['penetrar @tag'], 'penetrar', funMessages.penetrar.videos, '🥵', true);
    }
}
//# sourceMappingURL=PenetrarCommand.js.map