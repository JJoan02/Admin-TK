import { Command } from '../../core/CommandBus.js';
import { settingsMessages } from '../content/settings-content.js';
export class SettingsCommand extends Command {
    constructor() {
        super();
        this.name = 'enable';
        this.description = 'Activa o desactiva varias funciones del bot.';
        this.commands = ['enable', 'disable', 'on', 'off', '1', '0'];
        this.tags = ['settings'];
        this.help = ['enable <option>', 'disable <option>'];
    }
    async execute(context) {
        const { conn, m, args, usedPrefix, command } = context;
        let isEnable = /true|enable|(turn)?on|1/i.test(command);
        let chat = global.db.data.chats[m.chat];
        let user = global.db.data.users[m.sender];
        let bot = global.db.data.settings[conn.user.jid] || {};
        let type = (args[0] || '').toLowerCase();
        let isAll = false, isUser = false;
        switch (type) {
            case 'welcome':
            case 'bv':
            case 'bienvenida':
                if (!m.isGroup) {
                    if (!global.isOwner) {
                        global.dfail('group', m, conn);
                        throw false;
                    }
                }
                else if (!global.isAdmin) {
                    global.dfail('admin', m, conn);
                    throw false;
                }
                chat.bienvenida = isEnable;
                break;
            case 'antiprivado2':
                if (!m.isGroup) {
                    if (!global.isOwner) {
                        global.dfail('group', m, conn);
                        throw false;
                    }
                }
                else if (!global.isAdmin) {
                    global.dfail('admin', m, conn);
                    throw false;
                }
                chat.antiPrivate2 = isEnable;
                break;
            case 'antilag':
                if (!m.isGroup) {
                    if (!global.isOwner) {
                        global.dfail('group', m, conn);
                        throw false;
                    }
                }
                chat.antiLag = isEnable;
                break;
            case 'autoread':
            case 'autoleer':
                isAll = true;
                if (!global.isROwner) {
                    global.dfail('rowner', m, conn);
                    throw false;
                }
                global.opts['autoread'] = isEnable;
                break;
            case 'antispam':
                isAll = true;
                if (!global.isOwner) {
                    global.dfail('owner', m, conn);
                    throw false;
                }
                bot.antiSpam = isEnable;
                break;
            case 'antinopor':
                isAll = true;
                if (!global.isOwner) {
                    global.dfail('owner', m, conn);
                    throw false;
                }
                chat.antiLinkxxx = isEnable;
                break;
            case 'audios':
            case 'audiosbot':
            case 'botaudios':
                if (!m.isGroup) {
                    if (!global.isOwner) {
                        global.dfail('group', m, conn);
                        throw false;
                    }
                }
                else if (!global.isAdmin) {
                    global.dfail('admin', m, conn);
                    throw false;
                }
                chat.audios = isEnable;
                break;
            case 'detect':
            case 'avisos':
                if (!m.isGroup) {
                    if (!global.isOwner) {
                        global.dfail('group', m, conn);
                        throw false;
                    }
                }
                else if (!global.isAdmin) {
                    global.dfail('admin', m, conn);
                    throw false;
                }
                chat.detect = isEnable;
                break;
            case 'jadibotmd':
            case 'serbot':
            case 'subbots':
                isAll = true;
                if (!global.isOwner) {
                    global.dfail('rowner', m, conn);
                    throw false;
                }
                bot.jadibotmd = isEnable;
                break;
            case 'restrict':
            case 'restringir':
                isAll = true;
                if (!global.isOwner) {
                    global.dfail('rowner', m, conn);
                    throw false;
                }
                bot.restrict = isEnable;
                break;
            case 'document':
            case 'documento':
                isUser = true;
                user.useDocument = isEnable;
                break;
            case 'antilink':
                if (m.isGroup) {
                    if (!(global.isAdmin || global.isOwner)) {
                        global.dfail('admin', m, conn);
                        throw false;
                    }
                }
                chat.antiLink = isEnable;
                break;
            case 'antibot':
                if (m.isGroup) {
                    if (!(global.isAdmin || global.isOwner)) {
                        global.dfail('admin', m, conn);
                        throw false;
                    }
                }
                chat.antiBot = isEnable;
                break;
            case 'modoadmin':
            case 'soloadmin':
            case 'modeadmin':
                if (m.isGroup) {
                    if (!(global.isAdmin || global.isOwner)) {
                        global.dfail('admin', m, conn);
                        throw false;
                    }
                }
                chat.modoadmin = isEnable;
                break;
            case 'antiprivado':
                bot.antiPrivate = isEnable;
                break;
            case 'nsfw':
            case 'modohorny':
                if (m.isGroup) {
                    if (!(global.isAdmin || global.isOwner)) {
                        global.dfail('admin', m, conn);
                        throw false;
                    }
                }
                chat.nsfw = isEnable;
                break;
            case 'antiarabes':
            case 'antinegros':
            case 'antifakes':
            case 'onlylatinos':
                if (m.isGroup) {
                    if (!(global.isAdmin || global.isOwner)) {
                        global.dfail('admin', m, conn);
                        throw false;
                    }
                }
                chat.onlyLatinos = isEnable;
                break;
            default:
                if (!/[01]/.test(command)) {
                    return m.reply(settingsMessages.helpMessage.replace('${usedPrefix}', usedPrefix).replace('${command}', command));
                }
                throw false;
        }
        m.reply(`⚠️ *sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀 Notificación* ⚠️\n\n💎 *Comando ejecutado:* *${type}*\n👤 *Estado actual:* *${isEnable ? 'Activado ✅' : 'Desactivado ❌'}*\n📍 *Ámbito:* ${isAll ? '*Todo el Bot* 🌐' : isUser ? '*Usuario específico* 👥' : '*Este Chat* 💬'}\n\n🚀 *Muchas gracias por usar sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀*🎖️`);
    }
}
//# sourceMappingURL=SettingsCommand.js.map