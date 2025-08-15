import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class BlehCommand extends ReactionCommand {
    constructor() {
        super('bleh', 'Saca la lengua.', ['bleh', 'lengua'], ['emox'], ['bleh/lengua @tag'], 'bleh', funMessages.bleh.videos, '😝', false);
    }
}
//# sourceMappingURL=BlehCommand.js.map