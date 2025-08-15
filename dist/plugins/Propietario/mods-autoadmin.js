const handler = async (m, { conn, isAdmin, groupMetadata }) => {
    if (isAdmin)
        return m.reply('💣 *Ya eres adm*.', m, rcanal);
    try {
        await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    }
    catch {
        m.reply('🚩 Ocurrio un error.');
    }
};
handler.tags = ['mods'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.botAdmin = true;
export default handler;
//# sourceMappingURL=mods-autoadmin.js.map