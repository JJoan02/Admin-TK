import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class BathCommand extends ReactionCommand {
    constructor() {
        super('bath', 'Realiza una acción de baño.', ['bath', 'bañarse'], ['emox'], ['bath/bañarse @tag'], 'bath', funMessages.bath.videos, '🛀', false);
    }
}
//# sourceMappingURL=BathCommand.js.map