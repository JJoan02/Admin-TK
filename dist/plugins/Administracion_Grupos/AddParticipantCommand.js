import { ADD_PARTICIPANT_NO_TARGET, ADD_PARTICIPANT_NO_PLUS, ADD_PARTICIPANT_INVALID_NUMBER, ADD_PARTICIPANT_RESTRICT, ADD_PARTICIPANT_INVITE_MESSAGE, ADD_PARTICIPANT_INVITE_SENT, ADD_PARTICIPANT_ADDED, ADD_PARTICIPANT_ADD_ERROR, ADD_PARTICIPANT_ERROR } from '../../content/administracion_grupos/add-participant-responses';
class AddParticipantPlugin {
    name = "AddParticipantPlugin";
    commands = [
        {
            name: "add_participant",
            alias: ["add", "agregar", "invitar", "invite", "añadir"],
            desc: "Añade un miembro a un grupo o envía un enlace de invitación.",
            category: "Administración/Grupos",
            react: "➕",
            execute: async (Yaka, m, { conn, args, text, mentionedJid, isGroup, isAdmin, isBotAdmin }) => {
                if (!isGroup) {
                    return m.reply("Este comando solo puede ser usado en grupos.");
                }
                if (!isAdmin) {
                    return m.reply("Necesitas ser administrador del grupo para usar este comando.");
                }
                if (!isBotAdmin) {
                    return m.reply("El bot necesita ser administrador del grupo para usar este comando.");
                }
                let targetNumber = null;
                if (mentionedJid && mentionedJid[0]) {
                    targetNumber = mentionedJid[0].split('@')[0];
                }
                else if (text) {
                    targetNumber = text.replace(/[^0-9]/g, '');
                }
                if (!targetNumber) {
                    return conn.reply(m.chat, ADD_PARTICIPANT_NO_TARGET, m);
                }
                if (targetNumber.includes('+')) {
                    return conn.reply(m.chat, ADD_PARTICIPANT_NO_PLUS, m);
                }
                if (isNaN(Number(targetNumber)) || targetNumber.length < 8 || targetNumber.length > 15) {
                    return conn.reply(m.chat, ADD_PARTICIPANT_INVALID_NUMBER, m);
                }
                const targetJid = targetNumber + '@s.whatsapp.net';
                try {
                    const botSettings = global.db.data.settings[conn.user.jid] || {};
                    if (botSettings.restrict === false) {
                        return conn.reply(m.chat, ADD_PARTICIPANT_RESTRICT(global.lenguajeTK.smsAvisoAG(), global.lenguajeTK.smsSoloOwner()), m);
                    }
                    const response = await conn.groupParticipantsUpdate(m.chat, [targetJid], 'add');
                    if (response[0].status === '408') {
                        const groupInviteCode = await conn.groupInviteCode(m.chat);
                        const groupLink = 'https://chat.whatsapp.com/' + groupInviteCode;
                        await conn.reply(targetJid, ADD_PARTICIPANT_INVITE_MESSAGE(groupLink, global.mid.smsAdd), m, { mentions: [m.sender] });
                        await conn.reply(m.chat, ADD_PARTICIPANT_INVITE_SENT(targetNumber), m);
                    }
                    else if (response[0].status === '200') {
                        await conn.reply(m.chat, ADD_PARTICIPANT_ADDED(targetNumber, global.mid.smsAdd2), m, { mentions: [targetJid] });
                    }
                    else {
                        await conn.reply(m.chat, ADD_PARTICIPANT_ADD_ERROR(targetNumber, response[0].status), m);
                    }
                    await m.react('✅');
                }
                catch (e) {
                    console.error(`Error al agregar participante: ${e.message}`);
                    await conn.reply(m.chat, ADD_PARTICIPANT_ERROR, m);
                    await m.react('✖️');
                }
            }
        }
    ];
}
export default AddParticipantPlugin;
//# sourceMappingURL=AddParticipantCommand.js.map