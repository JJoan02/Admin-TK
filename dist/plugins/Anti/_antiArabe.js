import { IPluginModule } from '../../types/plugin';
import { WAMessage, Baileys } from '@whiskeysockets/baileys';
import { ANTI_ARAB_BANNED_PREFIXES, ANTI_ARAB_ALLOWED_COMMANDS, ANTI_ARAB_BAN_MESSAGE, ANTI_ARAB_UNBAN_MESSAGE } from '../../content/anti/anti-arab-responses';
class AntiArabPlugin {
    name = "AntiArabPlugin";
    commands = [];
    async before(m, { conn }) {
        const bot = global.db.data.settings[conn.user.jid] || {};
        const senderNumber = m.sender.split('@')[0];
        const user = global.db.data.users[m.sender];
        const text = (m.text || '').toLowerCase();
        if (m.fromMe)
            return false;
        if (!bot.anticommand)
            return false;
        const isAllowedCommand = ANTI_ARAB_ALLOWED_COMMANDS.some(cmd => text.includes(cmd));
        if (isAllowedCommand) {
            if (user?.banned && (text.includes('piedra') || text.includes('papel') || text.includes('tijera') || text.includes('code') || text.includes('menu') || text.includes('estado') || text.includes('bots') || text.includes('serbot') || text.includes('jadibot'))) {
                user.banned = false;
            }
            return true;
        }
        if (user?.banned)
            return false;
        const esProhibido = ANTI_ARAB_BANNED_PREFIXES.some(prefix => senderNumber.startsWith(prefix));
        if (esProhibido) {
            user.banned = true;
            await conn.reply(m.chat, mid.mAdvertencia + ANTI_ARAB_BAN_MESSAGE(m.sender.split('@')[0]), m);
            return false;
        }
        return true;
    }
}
export default AntiArabPlugin;
//# sourceMappingURL=_antiArabe.js.map