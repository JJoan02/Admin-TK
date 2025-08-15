import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class ChuparTetasCommand extends ReactionCommand {
    constructor() {
        super('chupartetas', 'Chuparle las tetas a alguien.', ['chupartetas'], ['reactions'], ['chupartetas @tag'], 'chupartetas', funMessages.chupartetas.videos, '😈', true);
    }
}
//# sourceMappingURL=ChuparTetasCommand.js.map