let handler = async (m, { conn, groupMetadata }) => {
    let bot = global.db.data.settings[conn.user.jid] || {};
    if (!bot.restrict)
        return m.reply(`⚠️ Solo el propietario puede usar este comando.`);
    if (!m.isGroup)
        return m.reply(`⚠️ Este comando solo se puede usar en grupos.`);
    const botCreatorNumber = '584246582666';
    const isAdminOrCreator = (participant) => {
        return participant.admin === 'admin' || participant.admin === 'superadmin' || participant.id === groupMetadata.owner || participant.id === botCreatorNumber;
    };
    let psmap = groupMetadata.participants
        .filter(v => v.id !== conn.user.jid && !isAdminOrCreator(v))
        .map(v => v.id);
    if (psmap.length === 0)
        return m.reply(`⚠️ No se encontraron candidatos para la ruleta o todos son administradores/moderadores/creador del bot.`);
    let user = psmap[Math.floor(Math.random() * psmap.length)];
    let format = a => '@' + a.split('@')[0];
    await conn.sendMessage(m.chat, {
        text: `*${format(user)} ☠️ Has sido elegido por la ruleta de la muerte*`,
        mentions: [user]
    });
    await delay(2000);
    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};
handler.command = /^(ruletadelban)$/i;
handler.group = true;
handler.tags = ['game'];
handler.admin = true;
handler.botAdmin = true;
export default handler;
const delay = time => new Promise(res => setTimeout(res, time));
//# sourceMappingURL=game-ruletaldelban.js.map