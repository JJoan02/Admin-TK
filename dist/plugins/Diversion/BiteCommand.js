import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class BiteCommand extends ReactionCommand {
    constructor() {
        super('bite', 'Realiza una acción de morder.', ['bite', 'morder'], ['emox'], ['bite/morder @tag'], 'bite', funMessages.bite.videos, '😅', false);
    }
}
//# sourceMappingURL=BiteCommand.js.map