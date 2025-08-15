import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class CryCommand extends ReactionCommand {
    constructor() {
        super('cry', 'Expresa llanto.', ['cry', 'llorar'], ['emox'], ['cry/llorar @tag'], 'cry', funMessages.cry.videos, '😭', false);
    }
}
//# sourceMappingURL=CryCommand.js.map