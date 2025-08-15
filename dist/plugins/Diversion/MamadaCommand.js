import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class MamadaCommand extends ReactionCommand {
    constructor() {
        super('mamada', 'Hacerle una mamada a alguien.', ['mamada'], ['reactions'], ['mamada @tag'], 'mamada', funMessages.mamada.videos, '😏', true);
    }
}
//# sourceMappingURL=MamadaCommand.js.map