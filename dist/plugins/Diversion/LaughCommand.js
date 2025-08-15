import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class LaughCommand extends ReactionCommand {
    constructor() {
        super('laugh', 'Reirse.', ['laugh', 'reirse'], ['reactions'], ['laugh @tag'], 'laugh', funMessages.laugh.videos, '😂', false);
    }
}
//# sourceMappingURL=LaughCommand.js.map