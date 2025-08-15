import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_LINK_GROUP_REGEX, ANTI_LINK_CHANNEL_REGEX, ANTI_LINK_ADMIN_BYPASS, ANTI_LINK_DETECTED_MESSAGE, ANTI_LINK_BOT_NOT_ADMIN } from '../../content/anti/anti-link-group-responses';
class AntiLinkPlugin {
    name = "AntiLinkPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, participants }) {
        if (!m.isGroup)
            return false;
        if (isAdmin || isOwner || m.fromMe || isROwner)
            return false;
        let chat = global.db.data.chats[m.chat];
        let delet = m.key.participant;
        let bang = m.key.id;
        const user = `@${m.sender.split('@')[0]}`;
        const groupAdmins = participants.filter(p => p.admin);
        const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');
        const isGroupLink = ANTI_LINK_GROUP_REGEX.exec(m.text) || ANTI_LINK_CHANNEL_REGEX.exec(m.text);
        if (isAdmin && chat?.antiLink && isGroupLink) {
            return conn.reply(m.chat, ANTI_LINK_ADMIN_BYPASS, m);
        }
        if (chat?.antiLink && isGroupLink && !isAdmin) {
            if (isBotAdmin) {
                const linkThisGroup = `https://chat.whatsapp.com/${await conn.groupInviteCode(m.chat)}`;
                if (m.text.includes(linkThisGroup))
                    return false;
            }
            await conn.sendMessage(m.chat, { text: ANTI_LINK_DETECTED_MESSAGE(user), mentions: [m.sender] }, { quoted: m, ephemeralExpiration: 24 * 60 * 100, disappearingMessagesInChat: 24 * 60 * 100 });
            if (!isBotAdmin) {
                return conn.sendMessage(m.chat, { text: ANTI_LINK_BOT_NOT_ADMIN(listAdmin), mentions: [...groupAdmins.map(v => v.id)] }, { quoted: m });
            }
            if (isBotAdmin) {
                await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                let responseb = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                if (responseb[0].status === "404")
                    return false;
            }
        }
        return true;
    }
}
export default AntiLinkPlugin;
//# sourceMappingURL=_antilink.js.map