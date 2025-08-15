import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class PunchCommand extends ReactionCommand {
    constructor() {
        super('punch', 'Da un puñetazo.', ['punch', 'puñetazo'], ['reactions'], ['punch @tag'], 'punch', funMessages.punch.videos, '👊', false);
    }
}
//# sourceMappingURL=PunchCommand.js.map