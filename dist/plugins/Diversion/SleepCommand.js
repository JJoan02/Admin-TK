import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class SleepCommand extends ReactionCommand {
    constructor() {
        super('sleep', 'Duerme.', ['sleep', 'dormir'], ['reactions'], ['sleep @tag'], 'sleep', funMessages.sleep.videos, '😴', false);
    }
}
//# sourceMappingURL=SleepCommand.js.map