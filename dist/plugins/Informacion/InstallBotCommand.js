import { Command } from '../../core/Command.js';
import { installBotMessages } from '../../lib/informacion-content.js';
class InstallBotCommand extends Command {
    #config;
    constructor(config) {
        super('installbot', 'Muestra instrucciones para instalar el bot.');
        this.#config = config;
        this.commands = ['instalarbot', 'instalargatabot', 'instalargata', 'procesobot', 'botproceso', 'procesodelbot', 'botinstall', 'installbot'];
    }
    async execute(context) {
        const { m, conn } = context;
        const installation = this.#config.installation;
        const picture = './media/menus/Menu1.jpg';
        let gata = installBotMessages.header;
        gata += installBotMessages.termuxCommand(installation.termuxCommand);
        gata += installBotMessages.herokuDeployUrl(installation.herokuDeployUrl);
        gata += installBotMessages.herokuBuildpack1(installation.herokuBuildpack1);
        gata += installBotMessages.herokuBuildpack2(installation.herokuBuildpack2);
        await conn.sendButton(m.chat, gata, installBotMessages.footer(global.ig, global.wm), picture, [
            ['𝘾𝙪𝙚𝙣𝙩𝙖𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 ✅', '.cuentasgb'],
            ['🎁 𝘿𝙤𝙣𝙖𝙧 | 𝘿𝙤𝙣𝙖𝙩𝙚', '.donar']
        ], installation.termuxCommand, global.fkontak);
    }
}
export default InstallBotCommand;
//# sourceMappingURL=InstallBotCommand.js.map