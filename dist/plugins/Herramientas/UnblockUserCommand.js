import { Command } from '../core/CommandBus.js';
export class UnblockUserCommand extends Command {
    constructor(context, targetJid) {
        super();
        this.context = context;
        this.targetJid = targetJid;
    }
}
//# sourceMappingURL=UnblockUserCommand.js.map