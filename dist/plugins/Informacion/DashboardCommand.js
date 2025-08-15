import { Command } from '../../core/Command.js';
import { dashboardMessages } from '../../lib/informacion-content.js';
class DashboardCommand extends Command {
    #dbService;
    constructor(dbService) {
        super('dashboard', 'Muestra los comandos más usados.');
        this.#dbService = dbService;
        this.commands = ['dashboard'];
    }
    async execute(context) {
        const { m, conn } = context;
        let stats = Object.entries(this.#dbService.stats).map(([key, val]) => {
            let name = Array.isArray(global.plugins[key]?.help) ? global.plugins[key]?.help?.join(' , ') : global.plugins[key]?.help || key;
            if (/exec/.test(name))
                return;
            return { name, ...val };
        });
        stats = stats.sort((a, b) => b.total - a.total);
        const txt = stats.slice(0, 10).map(({ name, total }) => {
            return dashboardMessages.item(name, total);
        }).join('\n\n');
        await conn.reply(m.chat, dashboardMessages.header(global.lenguajeGB.smsAvisoIIG()) + txt, m);
    }
}
export default DashboardCommand;
//# sourceMappingURL=DashboardCommand.js.map