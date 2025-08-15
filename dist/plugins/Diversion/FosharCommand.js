import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class FosharCommand extends ReactionCommand {
    constructor() {
        super('foshar', 'Foshar a alguien.', ['foshar'], ['reactions'], ['foshar @tag'], 'foshar', funMessages.foshar.videos, '😈', true);
    }
}
//# sourceMappingURL=FosharCommand.js.map