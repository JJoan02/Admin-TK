import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTISPAM_TIME_WINDOW, ANTISPAM_MESSAGE_LIMIT, ANTISPAM_WARN_LEVEL_1, ANTISPAM_WARN_LEVEL_2, ANTISPAM_WARN_LEVEL_3, ANTISPAM_WARNING_MESSAGE, ANTISPAM_RESET_TIME_1, ANTISPAM_RESET_TIME_2, ANTISPAM_RESET_TIME_3 } from '../../content/anti/anti-spam-responses';
const userSpamData = {};
class AntiSpamPlugin {
    name = "AntiSpamPlugin";
    commands = [];
    async before(m, { conn, isAdmin, isBotAdmin, isOwner, isROwner, isPrems }) {
        const chat = global.db.data.chats[m.chat];
        const bot = global.db.data.settings[conn.user.jid] || {};
        if (!bot.antiSpam)
            return false;
        if (m.isGroup && chat?.modoadmin)
            return false;
        if (m.isGroup) {
            if (isOwner || isROwner || isAdmin || !isBotAdmin || isPrems)
                return false;
        }
        const sender = m.sender;
        const currentTime = new Date().getTime();
        if (!(sender in userSpamData)) {
            userSpamData[sender] = {
                lastMessageTime: currentTime,
                messageCount: 1,
                antiBan: 0,
                message: 0,
                message2: 0,
                message3: 0,
            };
        }
        else {
            const userData = userSpamData[sender];
            const timeDifference = currentTime - userData.lastMessageTime;
            let motive = 0;
            if (userData.antiBan === 1) {
                if (userData.message < 1) {
                    userData.message++;
                    motive = ANTISPAM_WARN_LEVEL_1;
                    await conn.reply(m.chat, motive, m, { mentions: [m.sender] });
                    global.db.data.users[m.sender].messageSpam = motive;
                }
            }
            else if (userData.antiBan === 2) {
                if (userData.message2 < 1) {
                    userData.message2++;
                    motive = ANTISPAM_WARN_LEVEL_2;
                    await conn.reply(m.chat, motive, m, { mentions: [m.sender] });
                    global.db.data.users[m.sender].messageSpam = motive;
                }
            }
            else if (userData.antiBan === 3) {
                if (userData.message3 < 1) {
                    userData.message3++;
                    motive = ANTISPAM_WARN_LEVEL_3;
                    await conn.reply(m.chat, motive, m, { mentions: [m.sender] });
                    global.db.data.users[m.sender].messageSpam = motive;
                    await conn.groupParticipantsUpdate(m.chat, [sender], 'remove');
                }
            }
            if (timeDifference <= ANTISPAM_TIME_WINDOW) {
                userData.messageCount += 1;
                if (userData.messageCount >= ANTISPAM_MESSAGE_LIMIT) {
                    const mention = `@${sender.split("@")[0]}`;
                    const warningMessage = ANTISPAM_WARNING_MESSAGE(sender.split("@")[0]);
                    if (userData.antiBan > 2)
                        return false;
                    await conn.reply(m.chat, warningMessage, m, { mentions: [m.sender] });
                    global.db.data.users[m.sender].banned = true;
                    userData.antiBan++;
                    userData.messageCount = 1;
                    if (userData.antiBan === 1) {
                        setTimeout(() => {
                            if (userData.antiBan === 1) {
                                userData.antiBan = 0;
                                userData.message = 0;
                                userData.message2 = 0;
                                userData.message3 = 0;
                                global.db.data.users[m.sender].antispam = 0;
                                motive = 0;
                                global.db.data.users[m.sender].messageSpam = 0;
                                global.db.data.users[m.sender].banned = false;
                            }
                        }, ANTISPAM_RESET_TIME_1);
                    }
                    else if (userData.antiBan === 2) {
                        setTimeout(() => {
                            if (userData.antiBan === 2) {
                                userData.antiBan = 0;
                                userData.message = 0;
                                userData.message2 = 0;
                                userData.message3 = 0;
                                global.db.data.users[m.sender].antispam = 0;
                                motive = 0;
                                global.db.data.users[m.sender].messageSpam = 0;
                                global.db.data.users[m.sender].banned = false;
                            }
                        }, ANTISPAM_RESET_TIME_2);
                    }
                    else if (userData.antiBan === 3) {
                        setTimeout(() => {
                            if (userData.antiBan === 3) {
                                userData.antiBan = 0;
                                userData.message = 0;
                                userData.message2 = 0;
                                userData.message3 = 0;
                                global.db.data.users[m.sender].antispam = 0;
                                motive = 0;
                                global.db.data.users[m.sender].messageSpam = 0;
                                global.db.data.users[m.sender].banned = false;
                            }
                        }, ANTISPAM_RESET_TIME_3);
                    }
                }
            }
            else {
                if (timeDifference >= 2000) {
                    userData.messageCount = 1;
                }
            }
            userData.lastMessageTime = currentTime;
        }
        return true;
    }
}
export default AntiSpamPlugin;
//# sourceMappingURL=_antispam.js.map