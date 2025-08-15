import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class CuttingCommand extends ReactionCommand {
    constructor() {
        super('cutting', 'Realiza una acción de cortarse.', ['cutting', 'cortarse', 'cut', 'cutt'], ['dark'], ['cutting/cortarse @tag'], 'cutting', funMessages.cutting.videos, '🔪', false);
    }
}
//# sourceMappingURL=CuttingCommand.js.map