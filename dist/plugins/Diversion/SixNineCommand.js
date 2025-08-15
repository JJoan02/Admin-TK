import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class SixNineCommand extends ReactionCommand {
    constructor() {
        super('sixnine', 'Realiza un 69.', ['sixnine', '69'], ['nsfws'], ['sixnine/69 @tag'], 'sixNine', funMessages.sixNine.videos, '🥵', true);
    }
}
//# sourceMappingURL=SixNineCommand.js.map