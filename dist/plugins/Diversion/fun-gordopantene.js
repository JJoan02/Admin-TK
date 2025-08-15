let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .gordopantene @usuario" }, { quoted: m });
    }
    let userMentioned = m.mentionedJid[0];
    let porcentaje = Math.floor(Math.random() * 100) + 1;
    const mensaje = `😂 ¡${conn.getName(userMentioned)} tiene mucha panza y poco pene! (Probabilidad: ${porcentaje}%)`;
    await conn.sendMessage(m.chat, { text: mensaje }, { quoted: m });
};
handler.help = ['gordopantene @usuario'];
handler.tags = ['diversión'];
handler.command = ['gordopantene'];
export default handler;
//# sourceMappingURL=fun-gordopantene.js.map