import { IPluginModule } from '../../types/plugin';
import { WAMessage } from '@whiskeysockets/baileys';
import { AFK_RETURNED, AFK_MENTIONED } from '../../content/afk/afk-responses';
class AfkBeforePlugin {
    name = "AfkBeforePlugin";
    commands = [];
    async before(m) {
        let user = global.AdminTK_db.data.users[m.sender];
        if (user?.afk > 0) {
            await m.reply(AFK_RETURNED((new Date().getTime() - user.afk).toTimeString()));
            user.afk = 0;
            user.afkReason = '';
        }
        let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])];
        for (let jid of jids) {
            let mentionedUser = global.AdminTK_db.data.users[jid];
            if (!mentionedUser)
                continue;
            let afkTime = mentionedUser.afk;
            if (!afkTime || afkTime < 0)
                continue;
            let reason = mentionedUser.afkReason || '';
            await m.reply(AFK_MENTIONED(reason, (new Date().getTime() - afkTime).toTimeString()));
        }
        return true;
    }
}
export default AfkBeforePlugin;
//# sourceMappingURL=_afk.js.map