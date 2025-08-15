import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class YuriCommand extends ReactionCommand {
    constructor() {
        super('yuri', 'Hacer yuri.', ['yuri'], ['reactions'], ['yuri @tag'], 'yuri', funMessages.yuri.videos, '🏳️‍🌈', true);
    }
}
//# sourceMappingURL=YuriCommand.js.map