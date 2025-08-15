import { Command } from '../../core/Command.js';
import moment from "moment-timezone";
import _ from "lodash";
import { getBioMessages } from '../../lib/herramientas-content.js';
class GetBioCommand extends Command {
    #logger;
    constructor(logger) {
        super('getbio', 'Obtiene la biografía (estado) de un usuario de WhatsApp. Uso: !getbio @mencion');
        this.#logger = logger;
        this.commands = ['getbio', 'getdesc'];
    }
    async execute(context) {
        const { m, conn } = context;
        let who = m.isGroup ? _.get(m, "mentionedJid[0]", m.quoted?.sender || m.sender) : m.sender;
        try {
            let bios = await conn.fetchStatus(who);
            bios = _.castArray(bios);
            let messages = _.map(bios, (bio) => {
                let setAt = moment.utc(bio.setAt, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD") || "";
                return getBioMessages.bioInfo(bio.user?.split("@")[0] || "", bio.status || "", setAt);
            }).join("\n\n");
            await conn.reply(m.chat, messages, m);
        }
        catch (error) {
            this.#logger.error(`Error al obtener biografía: ${error.message}`);
            await conn.reply(m.chat, getBioMessages.error(error.message), m);
        }
    }
}
export default GetBioCommand;
//# sourceMappingURL=GetBioCommand.js.map