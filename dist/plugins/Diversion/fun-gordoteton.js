let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .gordoteton @usuario" }, { quoted: m });
    }
    let userMentioned = m.mentionedJid[0];
    let porcentaje = Math.floor(Math.random() * 100) + 1;
    const mensaje = `🤣 ¡${conn.getName(userMentioned)} tiene un ${porcentaje}% de ser gordoteton! ¡No te lo tomes a mal!`;
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};
handler.help = ['gordoteton @usuario'];
handler.tags = ['diversión'];
handler.command = ['gordoteton'];
export default handler;
//# sourceMappingURL=fun-gordoteton.js.map