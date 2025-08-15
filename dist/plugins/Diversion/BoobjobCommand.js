import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class BoobjobCommand extends ReactionCommand {
    constructor() {
        super('boobjob', 'Realiza una rusa.', ['boobjob', 'rusa'], ['nsfws'], ['boobjob/rusa @tag'], 'boobjob', funMessages.boobjob.videos, '🥵', true);
    }
}
//# sourceMappingURL=BoobjobCommand.js.map