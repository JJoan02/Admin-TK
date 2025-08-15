import { Command } from '../../core/Command.js';
import { groupListMessages } from '../../lib/informacion-content.js';
class GroupListCommand extends Command {
    #logger;
    constructor(logger) {
        super('groups', 'Lista todos los grupos del bot.');
        this.#logger = logger;
        this.commands = ['groups', 'grouplist', 'listadegrupo', 'gruposlista', 'listagrupos', 'listadegrupos', 'grupolista', 'listagrupo'];
    }
    async execute(context) {
        const { m, conn } = context;
        let txt = '';
        const fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };
        try {
            const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
            const totalGroups = groups.length;
            for (let i = 0; i < groups.length; i++) {
                const [jid, chat] = groups[i];
                const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
                const participants = groupMetadata.participants || [];
                const bot = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid) || {};
                const isBotAdmin = bot?.admin || false;
                const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
                const participantStatus = isParticipant ? '✅ *ESTOY AQUÍ | YES*' : '❌ *NO ESTA AQUÍ | NO*';
                const totalParticipants = participants.length;
                let inviteLink = 'NO SOY ADMINISTRADOR';
                if (isBotAdmin) {
                    try {
                        inviteLink = `https://chat.whatsapp.com/${await conn.groupInviteCode(jid)}`;
                    }
                    catch (e) {
                        this.#logger.error(`Error getting invite link for group ${jid}: ${e.message}`);
                        inviteLink = 'Error';
                    }
                }
                txt += groupListMessages.item(i, global.lenguajeGB.smsLisC(), await conn.getName(jid), participantStatus, global.lenguajeGB.smsLisD(), jid, global.lenguajeGB.smsLisF(), isBotAdmin, global.lenguajeGB.smsLisE(), totalParticipants, global.lenguajeGB.smsLisG(), inviteLink);
            }
            await m.reply(groupListMessages.header(global.packname, global.lenguajeGB.smsLisA(), totalGroups) + txt.trim());
        }
        catch (e) {
            this.#logger.error(`Error in GroupListCommand: ${e.message}`);
            const groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats);
            const totalGroups = groups.length;
            let fallbackTxt = '';
            for (let i = 0; i < groups.length; i++) {
                const [jid, chat] = groups[i];
                const groupMetadata = ((conn.chats[jid] || {}).metadata || (await conn.groupMetadata(jid).catch((_) => null))) || {};
                const participants = groupMetadata.participants || [];
                const isBotAdmin = participants.find((u) => conn.decodeJid(u.id) === conn.user.jid)?.admin || false;
                const isParticipant = participants.some((u) => conn.decodeJid(u.id) === conn.user.jid);
                const participantStatus = isParticipant ? '✅ *ESTOY AQUÍ | YES*' : '❌ *NO ESTA AQUÍ | NO*';
                const totalParticipants = participants.length;
                fallbackTxt += groupListMessages.item(i, global.lenguajeGB.smsLisC(), await conn.getName(jid), participantStatus, global.lenguajeGB.smsLisD(), jid, global.lenguajeGB.smsLisF(), isBotAdmin, global.lenguajeGB.smsLisE(), totalParticipants, global.lenguajeGB.smsLisG(), isBotAdmin ? 'Error' : 'NO SOY ADMINISTRADOR');
            }
            await m.reply(groupListMessages.header(global.packname, global.lenguajeGB.smsLisA(), totalGroups) + fallbackTxt.trim());
        }
    }
}
export default GroupListCommand;
//# sourceMappingURL=GroupListCommand.js.map