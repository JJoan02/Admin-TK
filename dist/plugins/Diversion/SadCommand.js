import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class SadCommand extends ReactionCommand {
    constructor() {
        super('sad', 'Ponte triste.', ['sad', 'triste'], ['reactions'], ['sad @tag'], 'sad', funMessages.sad.videos, '😢', false);
    }
}
//# sourceMappingURL=SadCommand.js.map