import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PiroposCommand extends ReactionCommand {
    constructor() {
        super('piropos', 'Decirle un piropo a alguien.', ['piropos'], ['reactions'], ['piropos @tag'], 'piropos', funMessages.piropos.videos, '🥰', false);
    }
}
//# sourceMappingURL=PiroposCommand.js.map