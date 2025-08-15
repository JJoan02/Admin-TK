import { ICommand, IPluginModule } from '../../types/plugin';
import { AFK_MESSAGE_HEADER, AFK_MESSAGE_USER_STATUS, AFK_MESSAGE_NO_TAG, AFK_MESSAGE_REASON, AFK_FAKE_REPLY_NAME } from '../../content/afk/afk-command-responses';
class AfkCommandPlugin {
    name = "AfkCommandPlugin";
    commands = [
        {
            name: "afk",
            alias: [],
            desc: "Establece tu estado como AFK (Away From Keyboard).",
            category: "Utilidades",
            react: "💤",
            execute: async (Yaka, m, { conn, text }) => {
                const user = global.db.data.users[m.sender];
                user.afk = +new Date();
                user.afkReason = text;
                conn.fakeReply(m.chat, `${AFK_MESSAGE_HEADER}\n\n` +
                    `${AFK_MESSAGE_USER_STATUS(conn.getName(m.sender))} \n\n` +
                    `${AFK_MESSAGE_NO_TAG}\n` +
                    `${AFK_MESSAGE_REASON(text)}`, '0@s.whatsapp.net', AFK_FAKE_REPLY_NAME, 'status@broadcast', null, global.fake);
            }
        }
    ];
}
export default AfkCommandPlugin;
//# sourceMappingURL=afk-afk.js.map