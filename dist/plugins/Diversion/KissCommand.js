import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class KissCommand extends ReactionCommand {
    constructor() {
        super('kiss', 'Da un beso.', ['kiss', 'beso'], ['reactions'], ['kiss @tag'], 'kiss', funMessages.kiss.videos, '😘', false);
    }
}
//# sourceMappingURL=KissCommand.js.map