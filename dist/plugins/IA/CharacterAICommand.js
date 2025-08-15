import { Command } from '../../core/Command.js';
import Starlights from "@StarlightsTeam/Scraper";
import { characterAIMessages } from '../../lib/ia-content.js';
class CharacterAICommand extends Command {
    #logger;
    constructor(logger) {
        super('cai', 'Interactúa con la IA de personaje (Ai Hoshino).');
        this.#logger = logger;
        this.commands = ['cai', 'hoshinoai'];
    }
    async execute(context) {
        const { m, conn, text, usedPrefix, command } = context;
        if (!text) {
            await conn.reply(m.chat, characterAIMessages.noText(usedPrefix, command), m, global.rcanal);
            return;
        }
        try {
            const character_id = "99ab5940-1ed9-4543-825b-056f32d0690b";
            const name = conn.getName(m.sender);
            const { msg } = await Starlights.characterAi(character_id, text, name);
            await conn.reply(m.chat, `${msg.join("\n")}`, m, global.rcanal);
        }
        catch (e) {
            this.#logger.error(`Error in CharacterAICommand: ${e.message}`);
            await m.react('✖️');
            await conn.reply(m.chat, characterAIMessages.error, m);
        }
    }
}
export default CharacterAICommand;
//# sourceMappingURL=CharacterAICommand.js.map