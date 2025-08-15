import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class LickCommand extends ReactionCommand {
    constructor() {
        super('lick', 'Lame a alguien.', ['lick', 'lamer'], ['reactions'], ['lick @tag'], 'lick', funMessages.lick.videos, '👅', false);
    }
}
//# sourceMappingURL=LickCommand.js.map