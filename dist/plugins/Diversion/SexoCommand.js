import { ReactionCommand } from '../Diversion/ReactionCommand.js';
import { funMessages } from './fun-content.js';
export class SexoCommand extends ReactionCommand {
    constructor() {
        super('sexo', 'Tener sexo con alguien.', ['sexo'], ['reactions'], ['sexo @tag'], 'sexo', funMessages.sexo.videos, '🥵', true);
    }
}
//# sourceMappingURL=SexoCommand.js.map