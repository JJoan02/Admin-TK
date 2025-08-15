import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys, GroupParticipant, areJidsSameUser } from '@whiskeysockets/baileys';
import { ANTI_SUB_BOTS_MESSAGE, ANTI_SUB_BOTS_LEAVE_DELAY } from '../../content/anti/anti-sub-bots-responses';
class AntiSubBotsPlugin {
    name = "AntiSubBotsPlugin";
    commands = [];
    async before(m, { conn, participants }) {
        if (!m.isGroup)
            return false;
        let chat = global.db.data.chats[m.chat];
        if (!chat?.antiBot2) {
            return false;
        }
        let botJid = global.conn.user.jid;
        if (botJid === conn.user.jid) {
            return false;
        }
        else {
            let isBotPresent = participants.some(p => areJidsSameUser(botJid, p.id));
            if (isBotPresent) {
                setTimeout(async () => {
                    await conn.reply(m.chat, ANTI_SUB_BOTS_MESSAGE, m, fake);
                    await conn.groupLeave(m.chat);
                }, ANTI_SUB_BOTS_LEAVE_DELAY);
            }
        }
        return true;
    }
}
export default AntiSubBotsPlugin;
//# sourceMappingURL=_antisubbots.js.map