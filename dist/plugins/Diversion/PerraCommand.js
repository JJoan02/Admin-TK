import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PerraCommand extends ReactionCommand {
    constructor() {
        super('perra', 'Decirle perra a alguien.', ['perra'], ['reactions'], ['perra @tag'], 'perra', funMessages.perra.videos, '🐶', false);
    }
}
//# sourceMappingURL=PerraCommand.js.map