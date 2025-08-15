import { Command } from '../core/CommandBus.js';
export class SetFeatureFlagCommand extends Command {
    constructor(context, flagName, enable) {
        super();
        this.context = context;
        this.flagName = flagName;
        this.enable = enable;
    }
}
//# sourceMappingURL=SetFeatureFlagCommand.js.map