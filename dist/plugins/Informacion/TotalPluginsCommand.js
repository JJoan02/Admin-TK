import { Command } from '../../core/Command.js';
import { totalPluginsMessages } from '../../lib/informacion-content.js';
class TotalPluginsCommand extends Command {
    constructor() {
        super('totalplugins', 'Muestra el número total de plugins.');
        this.commands = ['totalfunciones'];
    }
    async execute(context) {
        const { m, conn } = context;
        const totalf = Object.values(global.plugins).filter((v) => v.help && v.tags).length;
        await conn.reply(m.chat, totalPluginsMessages.header(totalf), m);
    }
}
export default TotalPluginsCommand;
//# sourceMappingURL=TotalPluginsCommand.js.map