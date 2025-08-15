import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class AnalCommand extends ReactionCommand {
    constructor() {
        super('anal', 'Realiza una acción anal.', ['anal', 'culiar'], ['nsfws'], ['anal/culiar @tag'], 'anal', funMessages.anal.videos, '🥵', true);
    }
}
//# sourceMappingURL=AnalCommand.js.map