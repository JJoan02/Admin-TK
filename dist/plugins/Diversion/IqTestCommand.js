import { Command } from '../../core/CommandBus.js';
import { funMessages } from '../content/fun-content.js';
import { getRandomElement } from '../../utils/helpers.js';
export class IqTestCommand extends Command {
    constructor() {
        super();
        this.name = 'iqtest';
        this.description = 'Realiza un test de IQ.';
        this.commands = ['iqtest'];
        this.tags = ['game'];
        this.help = ['iqtest'];
        this.register = true;
    }
    async execute(context) {
        const { m } = context;
        m.reply(getRandomElement(funMessages.iqtest.messages), m);
    }
}
//# sourceMappingURL=IqTestCommand.js.map