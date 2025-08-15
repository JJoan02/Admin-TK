let handler = async (m, { conn, groupMetadata }) => {
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (bot.restrict && !m.isOwner) {
        return m.reply(`⚠️ Solo el propietario puede usar este comando.`);
    }
    if (!m.isGroup) {
        return m.reply(`⚠️ Este comando solo funciona en grupos.`);
    }
    const botCreatorNumber = '584146277368@s.whatsapp.net';
    const isAdminOrCreator = (participant) => {
        const participantId = participant.id;
        const isAdmin = participant.admin === 'admin' || participant.admin === 'superadmin';
        const isGroupOwner = groupMetadata.owner && participantId === groupMetadata.owner;
        const isBotCreator = participantId === botCreatorNumber;
        return isAdmin || isGroupOwner || isBotCreator;
    };
    let elegibles = groupMetadata.participants
        .filter(v => v.id !== conn.user.jid && !isAdminOrCreator(v))
        .map(v => v.id);
    if (elegibles.length === 0) {
        return m.reply(`⚠️ No hay usuarios elegibles para expulsar.`);
    }
    let elegido = elegibles[Math.floor(Math.random() * elegibles.length)];
    let formato = id => '@' + id.split('@')[0];
    await conn.sendMessage(m.chat, {
        text: `☠️ *${formato(elegido)} ha sido seleccionado por la ruleta de la muerte...*`,
        mentions: [elegido]
    });
    try {
        await conn.groupParticipantsUpdate(m.chat, [elegido], 'remove');
    }
    catch (e) {
        console.error("Error al expulsar al participante:", e);
        await m.reply(`❌ No se pudo expulsar a ${formato(elegido)}. Asegúrate de que el bot sea administrador y tenga los permisos necesarios.`);
    }
};
handler.command = /^(ruletamortal|ruletadeath)$/i;
handler.group = true;
handler.tags = ['game'];
handler.admin = true;
handler.botAdmin = true;
export default handler;
//# sourceMappingURL=ruleta-muerte.js.map