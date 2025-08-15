import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PoutCommand extends ReactionCommand {
    constructor() {
        super('pout', 'Hacer un puchero.', ['pout', 'puchero'], ['reactions'], ['pout @tag'], 'pout', funMessages.pout.videos, '😠', false);
    }
}
//# sourceMappingURL=PoutCommand.js.map