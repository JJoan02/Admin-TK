import { botResponses } from '../../lib/informacion-content.js';
const handler = (m) => m;
handler.all = async function (m) {
    const chat = global.db.data.chats[m.chat];
    if (/^bot$/i.test(m.text) && !chat.isBanned) {
        conn.sendPresenceUpdate('recording', m.chat);
        conn.reply(m.chat, botResponses.bot, m, global.rcanal);
    }
    if (/^sexo$/i.test(m.text)) {
        conn.reply(m.chat, botResponses.sexo, m, global.rcanal);
    }
    if (/^tetas|teta$/i.test(m.text)) {
        conn.reply(m.chat, botResponses.tetas, m, global.rcanal);
    }
    if (/^bug$/i.test(m.text)) {
        conn.reply(m.chat, botResponses.bug, m, global.rcanal);
    }
    if (/^pene$/i.test(m.text)) {
        conn.reply(m.chat, botResponses.pene, m, global.rcanal);
    }
    return !0;
};
export default handler;
//# sourceMappingURL=BotResponsesPlugin.js.map