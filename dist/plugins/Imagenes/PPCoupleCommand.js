import { Command } from '../../core/Command.js';
import Starlights from "@StarlightsTeam/Scraper";
import { ppCoupleMessages } from '../../lib/imagenes-content.js';
class PPCoupleCommand extends Command {
    #logger;
    constructor(logger) {
        super('ppcouple', 'Obtiene imágenes de perfil para parejas.');
        this.#logger = logger;
        this.commands = ['ppcouple', 'par'];
    }
    async execute(context) {
        const { m, conn } = context;
        try {
            await m.react('🕓');
            const { women, man } = await Starlights.ppcouple("xd");
            await conn.sendFile(m.chat, women, 'thumbnail.jpg', ppCoupleMessages.girl, m, null);
            await conn.sendFile(m.chat, man, 'thumbnail.jpg', ppCoupleMessages.boy, m, null);
            await m.react('✅');
        }
        catch (e) {
            this.#logger.error(`Error in PPCoupleCommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, ppCoupleMessages.error, m);
        }
    }
}
export default PPCoupleCommand;
//# sourceMappingURL=PPCoupleCommand.js.map