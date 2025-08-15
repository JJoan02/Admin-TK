import { Command } from '../../core/Command.js';
import { pingMessages } from '../../lib/informacion-content.ts';
class PingCommand extends Command {
    #logger;
    constructor(logger) {
        super('ping', 'Mide la latencia del bot.');
        this.#logger = logger;
        this.commands = ['ping', 'p'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            const start = Date.now();
            const sentMsg = await conn.reply(m.chat, 'Pinging...', m);
            const end = Date.now();
            const latensi = end - start;
            await conn.relayMessage(m.chat, {
                protocolMessage: {
                    key: sentMsg.key,
                    type: 14,
                    editedMessage: {
                        conversation: pingMessages.pong(latensi)
                    }
                }
            }, {});
        }
        catch (e) {
            this.#logger.error(`Error in PingCommand: ${e.message}`);
            await conn.reply(m.chat, pingMessages.error, m, global.rcanal);
        }
    }
}
export default PingCommand;
//# sourceMappingURL=PingCommand.js.map