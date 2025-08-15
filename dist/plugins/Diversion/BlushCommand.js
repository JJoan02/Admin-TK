import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class BlushCommand extends ReactionCommand {
    constructor() {
        super('blush', 'Se sonroja.', ['blush', 'sonrojarse'], ['emox'], ['blush/sonrojarse @tag'], 'blush', funMessages.blush.videos, '🫣', false);
    }
}
//# sourceMappingURL=BlushCommand.js.map