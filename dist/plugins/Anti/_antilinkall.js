import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_LINK_ALL_DETECTED_HEADER, ANTI_LINK_ALL_MESSAGE } from '../../content/anti/anti-link-all-responses';
const linkRegex = /((https?:\/\/)?[^\s]+\.(com|net|org|xyz|info|link|store|site|online|club|click|live|top|ru|cn|tk|ml|ga|cf|gq|biz|me|tv|to|co|app)(\/[^\s]*)?)/i;
class AntiLinkAllPlugin {
    name = "AntiLinkAllPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin }) {
        if (!m || !m.text)
            return false;
        if (m.isBaileys && m.fromMe)
            return false;
        if (!m.isGroup)
            return false;
        const chat = global.db?.data?.chats?.[m.chat];
        if (!chat || !chat.antiLinkAll)
            return false;
        if (linkRegex.test(m.text) && !isAdmin) {
            if (isBotAdmin) {
                try {
                    await conn.sendMessage(m.chat, { delete: m.key });
                }
                catch (e) { }
            }
            if (!global.antifloodLinksAll)
                global.antifloodLinksAll = {};
            const last = global.antifloodLinksAll[m.sender] || 0;
            const now = Date.now();
            if (now - last > 5000) {
                global.antifloodLinksAll[m.sender] = now;
                await conn.reply(m.chat, `${ANTI_LINK_ALL_DETECTED_HEADER}${ANTI_LINK_ALL_MESSAGE(m.sender.split('@')[0], isBotAdmin)}`, null, {
                    mentions: [m.sender]
                });
            }
            if (isBotAdmin) {
                try {
                    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                }
                catch (err) { }
            }
        }
        return true;
    }
}
export default AntiLinkAllPlugin;
//# sourceMappingURL=_antilinkall.js.map