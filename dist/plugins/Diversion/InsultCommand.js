import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class InsultCommand extends ReactionCommand {
    constructor() {
        super('insult', 'Insultar a alguien.', ['insult', 'insulto'], ['reactions'], ['insult @tag'], 'insult', funMessages.insult.videos, '🖕', false);
    }
}
//# sourceMappingURL=InsultCommand.js.map