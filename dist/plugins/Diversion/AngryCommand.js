import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class AngryCommand extends ReactionCommand {
    constructor() {
        super('angry', 'Expresa enojo.', ['angry', 'enojado'], ['emox'], ['angry/enojado @tag'], 'angry', funMessages.angry.videos, '😡', false);
    }
}
//# sourceMappingURL=AngryCommand.js.map