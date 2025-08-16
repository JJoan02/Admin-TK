// admin-autoadmin.ts - Plugin mejorado y optimizado
// Categoría: administration
// Funcionalidad: Administración de grupos y moderación
// Convertido automáticamente a TypeScript con mejoras
const handler = async (m, { conn, isAdmin, groupMetadata }) => {
    if (isAdmin)
        return m.reply('✧ *Tu ya eres adm.*');
    try {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
        await m.react(done);
        m.reply('✧ *Ya te di admin.*');
        let nn = conn.getName(m.sender);
        conn.reply('5493876432076@s.whatsapp.net', `🚩 *${nn}* se dio Auto Admin en:\n> ${groupMetadata.subject}.`, m, rcanal);
    }
    catch {
        m.reply('✦ Ocurrio un error.');
    }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
//# sourceMappingURL=admin-autoadmin.js.map