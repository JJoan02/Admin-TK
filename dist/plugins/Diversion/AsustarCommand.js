import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class AsustarCommand extends ReactionCommand {
    constructor() {
        super('asustar', 'Asustar a alguien.', ['asustar'], ['reactions'], ['asustar @tag'], 'asustar', funMessages.asustar.videos, '😱', false);
    }
}
//# sourceMappingURL=AsustarCommand.js.map