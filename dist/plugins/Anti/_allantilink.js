import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_LINK_WARNING, ANTI_LINK_TIKTOK, ANTI_LINK_YOUTUBE, ANTI_LINK_TELEGRAM, ANTI_LINK_FACEBOOK, ANTI_LINK_INSTAGRAM, ANTI_LINK_TWITTER, ANTI_LINK_DISCORD, ANTI_LINK_THREADS, ANTI_LINK_TWITCH, ANTI_LINK_REMOVED_MESSAGE } from '../../content/anti/anti-link-responses';
const isLinkTik = /\b(?:https?:\/\/)?(?:www\.)?tiktok\.com(\/\S*)?/i;
const isLinkYt = /\b(?:https?:\/\/)?(?:www\.)?(youtube\.com|youtu\.be)(\/\S*)?/i;
const isLinkTel = /\b(?:https?:\/\/)?(?:www\.)?(telegram\.org|t\.me)(\/\S*)?/i;
const isLinkFb = /\b(?:https?:\/\/)?(?:www\.)?(facebook\.com|fb\.me|fb\.watch)(\/\S*)?/i;
const isLinkIg = /\b(?:https?:\/\/)?(?:www\.)?instagram\.com(\/\S*)?/i;
const isLinkTw = /\b(?:https?:\/\/)?(?:www\.)?(twitter\.com|x\.com)(\/\S*)?/i;
const isLinkDc = /\b(?:https?:\/\/)?(?:www\.)?(discord\.com|discord\.gg)(\/\S*)?/i;
const isLinkTh = /\b(?:https?:\/\/)?(?:www\.)?threads\.net(\/\S*)?/i;
const isLinkTch = /\b(?:https?:\/\/)?(?:www\.)?twitch\.tv(\/\S*)?/i;
class AllAntiLinkPlugin {
    name = "AllAntiLinkPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner }) {
        if (!m.isGroup)
            return false;
        if (isAdmin || isOwner || m.fromMe || isROwner || !isBotAdmin)
            return false;
        let chat = global.db.data.chats[m.chat];
        let delet = m.key.participant;
        let bang = m.key.id;
        let toUser = `${m.sender.split("@")[0]}`;
        let aa = toUser + '@s.whatsapp.net';
        const checkAndRemove = async (platformName, isLinkDetected) => {
            if (chat[`anti${platformName}`] && isLinkDetected) {
                if (isBotAdmin) {
                    let wasDeleteActive = chat.delete;
                    chat.delete = false;
                    await conn.reply(m.chat, `${ANTI_LINK_WARNING} ${ANTI_LINK_REMOVED_MESSAGE(platformName, toUser)}`, null, { mentions: [aa] });
                    await new Promise(resolve => setTimeout(resolve, 100));
                    await conn.sendMessage(m.chat, { delete: { remoteJid: m.chat, fromMe: false, id: bang, participant: delet } });
                    let remove = await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
                    if (remove[0].status === '404')
                        return;
                    await new Promise(resolve => setTimeout(resolve, 100));
                    chat.delete = wasDeleteActive;
                }
            }
        };
        await checkAndRemove(ANTI_LINK_TIKTOK, isLinkTik.exec(m.text));
        await checkAndRemove(ANTI_LINK_YOUTUBE, isLinkYt.exec(m.text));
        await checkAndRemove(ANTI_LINK_TELEGRAM, isLinkTel.exec(m.text));
        await checkAndRemove(ANTI_LINK_FACEBOOK, isLinkFb.exec(m.text));
        await checkAndRemove(ANTI_LINK_INSTAGRAM, isLinkIg.exec(m.text));
        await checkAndRemove(ANTI_LINK_TWITTER, isLinkTw.exec(m.text));
        await checkAndRemove(ANTI_LINK_DISCORD, isLinkDc.exec(m.text));
        await checkAndRemove(ANTI_LINK_THREADS, isLinkTh.exec(m.text));
        await checkAndRemove(ANTI_LINK_TWITCH, isLinkTch.exec(m.text));
        return true;
    }
}
export default AllAntiLinkPlugin;
//# sourceMappingURL=_allantilink.js.map