let handler = async (m, { conn, args }) => {
    if (!args[0]) {
        return conn.sendMessage(m.chat, { text: "⚠️ Debes mencionar a un usuario. Usa el formato: .sintetas @usuario" }, { quoted: m });
    }
    let userMentioned = m.mentionedJid[0];
    let porcentaje = Math.floor(Math.random() * 100) + 1;
    const mensaje = `_*@${userMentioned.split('@')[0]}* *ES/IS* *${porcentaje}%* *SINTETAS,* *NO TIENE NI TETAS Y SE CREE TETONA? 😂 *_`;
    await conn.sendMessage(m.chat, { text: mensaje.replace('@', '') }, { quoted: m });
};
handler.help = ['sintetas @usuario'];
handler.tags = ['diversión'];
handler.command = ['sintetas'];
export default handler;
//# sourceMappingURL=fun-sintetas.js.map