import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class BoredCommand extends ReactionCommand {
    constructor() {
        super('bored', 'Expresa aburrimiento.', ['bored', 'aburrido'], ['emox'], ['bored/aburrido @tag'], 'bored', funMessages.bored.videos, '😒', false);
    }
}
//# sourceMappingURL=BoredCommand.js.map