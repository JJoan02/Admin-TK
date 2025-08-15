import { Command } from '../../core/Command.js';
class ConfigCommand extends Command {
    #dbService;
    #config;
    #logger;
    constructor(dbService, config, logger) {
        super('config', 'Activa o desactiva funciones del bot. Uso: !on <feature> o !off <feature>');
        this.#dbService = dbService;
        this.#config = config;
        this.#logger = logger;
        this.commands = ['enable', 'disable', 'on', 'off', '1', '0'];
    }
    async execute(context) {
        const { m, conn, args, usedPrefix, command, isOwner, isAdmin, isROwner } = context;
        const isEnable = /true|enable|(turn)?on|1/i.test(command);
        const type = (args[0] || '').toLowerCase();
        let chat = await this.#dbService.getChat(m.chat);
        let botSettings = await this.#dbService.getSetting(conn.user.jid) || {};
        let isAll = false;
        let isUser = false;
        const dfail = (permType) => {
            if (permType === 'group')
                conn.reply(m.chat, 'Este comando solo puede ser usado en grupos.', m);
            else if (permType === 'admin')
                conn.reply(m.chat, 'Este comando solo puede ser usado por administradores del grupo.', m);
            else if (permType === 'rowner')
                conn.reply(m.chat, 'Este comando solo puede ser usado por el propietario del bot.', m);
            return false;
        };
        switch (type) {
            case 'welcome':
            case 'bv':
            case 'bienvenida':
                if (!m.isGroup)
                    return dfail('group');
                if (!isAdmin)
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { welcome: isEnable });
                break;
            case 'antiprivate':
            case 'antiprivado':
            case 'antipriv':
                isAll = true;
                if (!isOwner)
                    return dfail('rowner');
                await this.#dbService.updateSetting(conn.user.jid, { antiPrivate: isEnable });
                break;
            case 'restrict':
            case 'restringir':
                isAll = true;
                if (!isOwner)
                    return dfail('rowner');
                await this.#dbService.updateSetting(conn.user.jid, { restrict: isEnable });
                break;
            case 'autolevelup':
            case 'autonivel':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { autolevelup: isEnable });
                break;
            case 'antibot':
            case 'antibots':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { antiBot: isEnable });
                break;
            case 'autoaceptar':
            case 'aceptarauto':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { autoAceptar: isEnable });
                break;
            case 'autorechazar':
            case 'rechazarauto':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { autoRechazar: isEnable });
                break;
            case 'antisubbots':
            case 'antisub':
            case 'antisubot':
            case 'antibot2':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { antiBot2: isEnable });
                break;
            case 'antifake':
            case 'antifakes':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { antifake: isEnable });
                break;
            case 'autoresponder':
            case 'autorespond':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { autoresponder: isEnable });
                break;
            case 'modoadmin':
            case 'soloadmin':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { modoadmin: isEnable });
                break;
            case 'autoread':
            case 'autoleer':
            case 'autover':
                isAll = true;
                if (!isROwner)
                    return dfail('rowner');
                global.opts['autoread'] = isEnable;
                break;
            case 'antiver':
            case 'antiocultar':
            case 'antiviewonce':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { antiver: isEnable });
                break;
            case 'reaction':
            case 'reaccion':
            case 'emojis':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { reaction: isEnable });
                break;
            case 'audios':
            case 'audiosbot':
            case 'botaudios':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { audios: isEnable });
                break;
            case 'antispam':
            case 'antispamosos':
                isAll = true;
                if (!isOwner)
                    return dfail('rowner');
                await this.#dbService.updateSetting(conn.user.jid, { antiSpam: isEnable });
                break;
            case 'antidelete':
            case 'antieliminar':
            case 'delete':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { delete: isEnable });
                break;
            case 'autobio':
            case 'status':
            case 'bio':
                isAll = true;
                if (!isOwner)
                    return dfail('rowner');
                await this.#dbService.updateSetting(conn.user.jid, { autobio: isEnable });
                break;
            case 'jadibotmd':
            case 'serbot':
            case 'subbots':
                isAll = true;
                if (!isOwner)
                    return dfail('rowner');
                await this.#dbService.updateSetting(conn.user.jid, { jadibotmd: isEnable });
                break;
            case 'detect':
            case 'configuraciones':
            case 'avisodegp':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { detect: isEnable });
                break;
            case 'simi':
            case 'autosimi':
            case 'simsimi':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { simi: isEnable });
                break;
            case 'document':
            case 'documento':
                isUser = true;
                await this.#dbService.updateUser(m.sender, { useDocument: isEnable });
                break;
            case 'antilink':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { antiLink: isEnable });
                break;
            case 'nsfw':
            case 'modohorny':
                if (!m.isGroup)
                    return dfail('group');
                if (!(isAdmin || isOwner))
                    return dfail('admin');
                await this.#dbService.updateChat(m.chat, { modohorny: isEnable });
                break;
            default:
                await conn.reply(m.chat, `
*☁️ Funciones solo para owner*

${usedPrefix + command} antispam
${usedPrefix + command} antiprivado
${usedPrefix + command} status
${usedPrefix + command} autoread
${usedPrefix + command} restrict

*☁️ Funciones de grupos*

${usedPrefix + command} welcome 
${usedPrefix + command} autoaceptar
${usedPrefix + command} autorechazar
${usedPrefix + command} autoresponder
${usedPrefix + command} autolevelup
${usedPrefix + command} antibot
${usedPrefix + command} subbots
${usedPrefix + command} reaccion
${usedPrefix + command} simi
${usedPrefix + command} audios
${usedPrefix + command} antiver
${usedPrefix + command} detect 
${usedPrefix + command} delete
${usedPrefix + command} nsfw 
${usedPrefix + command} modoadmin 
${usedPrefix + command} antifake
${usedPrefix + command} antilink`, m);
                return;
        }
        await conn.sendMessage(m.chat, {
            text: `` +
                `*» OPCION |* ${type.toUpperCase()}
` +
                `*» ESTADO |* ${isEnable ? 'ON' : 'OFF'}
` +
                `*» PARA |* ${isAll ? 'ESTE BOT' : isUser ? 'TU USUARIO' : 'ESTE CHAT'}`,
            footer: global.dev,
            buttons: [
                {
                    buttonId: isEnable ? `.off ${type}` : `.on ${type}`,
                    buttonText: { displayText: isEnable ? 'OFF ☁️' : 'ON ☁️' }
                },
                {
                    buttonId: ".menu",
                    buttonText: { displayText: 'MENU ☁️' }
                }
            ],
            viewOnce: true,
            headerType: 1
        }, { quoted: m });
    }
}
export default ConfigCommand;
//# sourceMappingURL=ConfigCommand.js.map