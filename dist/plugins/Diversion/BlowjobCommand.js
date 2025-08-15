import { ReactionCommand } from './ReactionCommand.js';
import { funMessages } from '../content/fun-content.js';
export class BlowjobCommand extends ReactionCommand {
    constructor() {
        super('blowjob', 'Realiza una mamada.', ['blowjob', 'bj', 'mamada'], ['nsfws'], ['blowjob/mamada @tag'], 'blowjob', funMessages.blowjob.videos, '😮', true);
    }
}
//# sourceMappingURL=BlowjobCommand.js.map