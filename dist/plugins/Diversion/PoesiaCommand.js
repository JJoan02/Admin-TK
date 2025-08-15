import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PoesiaCommand extends ReactionCommand {
    constructor() {
        super('poesia', 'Recitarle un poema a alguien.', ['poesia'], ['reactions'], ['poesia @tag'], 'poesia', funMessages.poesia.videos, '📜', false);
    }
}
//# sourceMappingURL=PoesiaCommand.js.map