import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_LINK_XXX_REGEX, ANTI_LINK_XXX_DETECTED_MESSAGE, ANTI_LINK_XXX_BOT_NOT_ADMIN } from '../../content/anti/anti-link-xxx-responses';
class AntiLinkXXXPlugin {
    name = "AntiLinkXXXPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
        if (!m.isGroup)
            return false;
        if (isAdmin || isOwner || m.fromMe || isROwner)
            return false;
        let chat = global.db.data.chats[m.chat];
        let delet = m.key.participant;
        let bang = m.key.id;
        const user = `@${m.sender.split("`@`")[0]}`;
        const isAdultLink = m.text && ANTI_LINK_XXX_REGEX.test(m.text);
        if (chat?.antiLinkxxx && isAdultLink && !isAdmin) {
            await conn.sendMessage(m.chat, {
                text: ANTI_LINK_XXX_DETECTED_MESSAGE(m.sender.split("@")[0]),
                mentions: [m.sender]
            }, { quoted: m });
            if (!isBotAdmin) {
                return conn.sendMessage(m.chat, {
                    text: ANTI_LINK_XXX_BOT_NOT_ADMIN,
                }, { quoted: m });
            }
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
            }
        }
        return true;
    }
}
export default AntiLinkXXXPlugin;
//# sourceMappingURL=antilinkxxx.js.map