import Starlights from "@StarlightsTeam/Scraper";
import { aiMessages } from '../../content/ai-content.js';
let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text)
        return m.reply(aiMessages.characterAiPrompt(usedPrefix + command), m.sender, global.AdminTK_botInfo.rcanal);
    try {
        let character_id = "99ab5940-1ed9-4543-825b-056f32d0690b";
        let name = m.conn.getName(m.sender);
        let { msg } = await Starlights.characterAi(character_id, text, name);
        await m.reply(`${msg.join("\n")}`, m, global.AdminTK_botInfo.rcanal);
    }
    catch {
        await m.react('✖️');
    }
};
handler.tags = ["tools"];
handler.help = ["ai *<texto>*"].map(v => v + '\n' + aiMessages.characterAiPrompt('').split('\n')[2].replace('[ ✰ ] ', '').replace('`» Ejemplo :`', '').trim());
handler.command = ["cai", "hoshinoai"];
handler.register = true;
export default handler;
//# sourceMappingURL=character-ai.js.map