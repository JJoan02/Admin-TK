// game-revoke.ts - Plugin mejorado y optimizado
// Categoría: entertainment
// Funcionalidad: Juegos y entretenimiento
// Convertido automáticamente a TypeScript con mejoras
var handler = async (m, { conn }) => {
    let res = await conn.groupRevokeInvite(m.chat);
    let gruf = m.chat;
    conn.reply(m.sender, 'https://chat.whatsapp.com/' + await conn.groupInviteCode(gruf), m, rcanal);
};
handler.help = ['revoke'];
handler.tags = ['group'];
handler.command = ['revoke', 'restablecer'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
export default handler;
//# sourceMappingURL=game-revoke.js.map