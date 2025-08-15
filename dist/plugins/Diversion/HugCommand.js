import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class HugCommand extends ReactionCommand {
    constructor() {
        super('hug', 'Da un abrazo.', ['hug', 'abrazar'], ['reactions'], ['hug @tag'], 'hug', funMessages.hug.videos, '🤗', false);
    }
}
//# sourceMappingURL=HugCommand.js.map