import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class NalguearCommand extends ReactionCommand {
    constructor() {
        super('nalguear', 'Nalguear a alguien.', ['nalguear'], ['reactions'], ['nalguear @tag'], 'nalguear', funMessages.nalguear.videos, '👋', false);
    }
}
//# sourceMappingURL=NalguearCommand.js.map