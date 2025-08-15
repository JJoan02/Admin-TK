import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class CafeCommand extends ReactionCommand {
    constructor() {
        super('cafe', 'Toma una taza de café.', ['coffe', 'cafe'], ['emox'], ['coffe/cafe @tag'], 'cafe', funMessages.cafe.videos, '☕', false);
    }
}
//# sourceMappingURL=CafeCommand.js.map