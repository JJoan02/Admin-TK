import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class AcariciarCommand extends ReactionCommand {
    constructor() {
        super('acariciar', 'Acariciar a alguien.', ['acariciar'], ['reactions'], ['acariciar @tag'], 'acariciar', funMessages.acariciar.videos, '🥰', false);
    }
}
//# sourceMappingURL=AcariciarCommand.js.map